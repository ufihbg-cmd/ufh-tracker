from pl import *
P=Patcher('r1/app.js'); H=Patcher('r1/index.html')

# ================= STAGE 4: Settings editors =================
H.rep('<div class="panel" style="max-width:860px;margin-top:16px"><h2>Price history</h2>','''<div class="panel" style="max-width:860px;margin-top:16px"><h2>Offers</h2>
<p class="hint" style="margin:0 0 12px">Each offer gives a percentage off play time only (never socks or the card price). At check-in staff choose the offer; it applies by itself when the day, time, time length and play area match, and the form says why when it does not. You can add, change or switch off offers at any time. Offers do not change entries already saved.</p>
<div id="offerEditor"></div>
<div class="acts" style="margin-top:10px"><button class="btn ghost" id="offerAdd" type="button">+ Add offer</button><button class="btn primary" id="offerSave" type="button">Save offers</button></div></div>
<div class="panel" style="max-width:860px;margin-top:16px"><h2>Quick-entry shortcuts</h2>
<p class="hint" style="margin:0 0 12px">One-tap buttons on the dashboard. Staff tap a shortcut, then enter only the name and payment type.</p>
<div id="draftEditor"></div>
<div class="acts" style="margin-top:10px"><button class="btn ghost" id="draftAdd" type="button">+ Add shortcut</button><button class="btn primary" id="draftSave" type="button">Save shortcuts</button></div></div>
<div class="panel" style="max-width:860px;margin-top:16px"><h2>Business details and WhatsApp message</h2>
<p class="hint" style="margin:0 0 12px">Shown on invoices. The WhatsApp message is prefilled when staff send a reminder. Use {name}, {mins} and {time} in the message.</p>
<label class="field"><span>Address</span><input id="sAddr" maxlength="120"></label>
<div class="two"><label class="field"><span>Phone number</span><input id="sPhone" maxlength="30" inputmode="tel"></label><label class="field"><span>GST number (optional)</span><input id="sGst" maxlength="30"></label></div>
<label class="field"><span>WhatsApp reminder message</span><textarea id="sWaText" rows="3" maxlength="300"></textarea></label>
<div class="acts"><button class="btn primary" id="bizSave" type="button">Save business details</button></div></div>
<div class="panel" style="max-width:860px;margin-top:16px"><h2>Price history</h2>''')
H.rep("</style>",""".offercard{border:1.5px solid var(--line);border-radius:16px;padding:14px;margin:0 0 12px;background:var(--bg)}
.offercard .oc-h{display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:space-between;margin-bottom:10px}
.draftrow{display:grid;grid-template-columns:repeat(5,1fr) auto;gap:8px;align-items:end;margin:0 0 10px}
@media(max-width:760px){.draftrow{grid-template-columns:1fr 1fr}}
</style>""")
P.rep("savePricingVersion:async(o,opt)=>","""saveOffers:async list=>{await ok(client.from('app_pricing').upsert({id:'offers',data:{offers:list}},{onConflict:'id'}))},
saveDrafts:async list=>{await ok(client.from('app_pricing').upsert({id:'drafts',data:{drafts:list}},{onConflict:'id'}))},
savePricingVersion:async(o,opt)=>""")
P.rep("$('#sEffective').value=toLocalInput(Date.now());\nrenderPriceHistory();","""$('#sEffective').value=toLocalInput(Date.now());
$('#sAddr').value=settings.bizAddress;$('#sPhone').value=settings.bizPhone;$('#sGst').value=settings.bizGst;$('#sWaText').value=settings.waText;
offerEdit=JSON.parse(JSON.stringify(getOffers()));draftEdit=JSON.parse(JSON.stringify(getDrafts()));
renderOfferEditor();renderDraftEditor();
renderPriceHistory();""")
P.rep("const n=mergeSettings(null);\nn.name=$('#sName').value.trim()||DEFAULTS.name;","const n=mergeSettings(null);\n['bizAddress','bizPhone','bizGst','waText'].forEach(k=>{n[k]=settings[k]});\nn.name=$('#sName').value.trim()||DEFAULTS.name;")
P.rep("pub={name:n.name,currency:n.currency,remindEvery:n.remindEvery,warnMin:n.warnMin};","pub={name:n.name,currency:n.currency,remindEvery:n.remindEvery,warnMin:n.warnMin,bizAddress:n.bizAddress,bizPhone:n.bizPhone,bizGst:n.bizGst,waText:n.waText};")
# price history: keep the previous prices as the "original" version, captured before settings are replaced
P.rep("const changed=JSON.stringify(pr)!==JSON.stringify({sockPrices:settings.sockPrices,cardPrices:settings.cardPrices,play:settings.play});",
      "const prevPr={sockPrices:settings.sockPrices,cardPrices:settings.cardPrices,play:settings.play};\nconst changed=JSON.stringify(pr)!==JSON.stringify(prevPr);")
P.rep("{effectiveFrom:0,by:'original prices',sockPrices:settings.sockPrices,cardPrices:settings.cardPrices,play:settings.play},{skipMain:true}","Object.assign({effectiveFrom:0,by:'original prices'},prevPr),{skipMain:true}")

# ================= STAGE 5: selection, invoices, wristband slips =================
H.rep("<thead><tr><th>Ticket</th>",'<thead><tr><th class="stf"><input type="checkbox" id="selAll" aria-label="Select all"></th><th>Ticket</th>')
H.rep('<button class="btn ghost sp" id="csvBtn">Export CSV</button></div>','<button class="btn ghost sp" id="csvBtn">Export CSV</button></div>\n<div class="selbar stf" id="selBar" hidden><span id="selCount"></span><button class="btn ghost" id="slipBtn" type="button">Print wristband slips</button><button class="btn primary adm" id="invBtn" type="button">Create invoice</button><button class="btn ghost" id="selClear" type="button">Clear selection</button></div>')
H.rep("</style>",""".selbar{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin:0 0 12px;padding:10px 14px;border:1.5px solid var(--cyan);border-radius:14px;background:var(--surface)}
.selbar span{font-weight:700}
#printArea{display:none}
@media print{
body.printing>*:not(#printArea){display:none!important}
body.printing{background:#fff!important}
body.printing #printArea{display:block!important;color:#111;font-family:Arial,Helvetica,sans-serif}
.inv{page-break-after:always;padding:6mm 4mm}
.inv:last-child{page-break-after:auto}
.inv .ih{display:flex;justify-content:space-between;gap:16px;border-bottom:2px solid #111;padding-bottom:10px;margin-bottom:14px}
.inv .ih img{width:64px;height:64px;border-radius:12px;object-fit:cover;float:left;margin-right:12px}
.inv h1{font-size:22px;margin:0 0 4px}
.inv p{margin:2px 0;font-size:13px}
.inv table{width:100%;border-collapse:collapse;margin-top:14px}
.inv th,.inv td{border-bottom:1px solid #ccc;padding:8px 6px;text-align:left;font-size:14px}
.inv td.n,.inv th.n{text-align:right}
.inv tr.t td{font-weight:700;border-top:2px solid #111}
.inv .stamp{display:inline-block;border:2px solid #111;padding:2px 10px;font-weight:700;border-radius:6px;margin-top:10px}
.inv .ft{margin-top:22px;font-size:12px;color:#444}
.slip{width:72mm;border:1px dashed #333;padding:4mm;margin:0 0 4mm;page-break-inside:avoid;font-size:13px}
.slip .sl-h{font-weight:700;font-size:12px;letter-spacing:.04em;text-transform:uppercase}
.slip .sl-n{font-size:20px;font-weight:700;margin:4px 0}
}
</style>""")
H.rep("</body>",'<div id="printArea" aria-hidden="true"></div>\n</body>')
P.rep("cols=adm?17:me?14:12;","cols=adm?18:me?15:12;")
P.rep("return `<tr><td>${esc(ticketStr(s.ticket))}","return `<tr>${me?`<td class=\"stf\"><input type=\"checkbox\" class=\"selrow\" data-sid=\"${i}\"${selIds.has(s.id)?' checked':''} aria-label=\"Select ${esc(s.name)}\"></td>`:''}<td>${esc(ticketStr(s.ticket))}")
P.rep("function renderRecords(){","function renderRecords(){\nsetTimeout(updateSelBar,0);")
P.rep('<button class="btn ghost" data-act="pay" data-write>Payment</button>','<button class="btn ghost" data-act="pay" data-write>Payment</button><button class="btn ghost" data-act="slip" data-write>Slip</button>',1)
P.rep("if(a==='pause')doPause(id);","if(a==='slip'){const s0=getS(id);if(s0)printSlips([s0]);return}\nif(a==='pause')doPause(id);")
P.rep("function renderPriceHistory(){","""let offerEdit=[],draftEdit=[];
function renderOfferEditor(){
const el=$('#offerEditor');if(!el)return;
el.innerHTML=offerEdit.length?offerEdit.map((o,i)=>`<div class="offercard" data-i="${i}">
<div class="oc-h"><b>${esc(o.name||'New offer')}</b><label class="check"><input type="checkbox" data-of="active"${o.active!==false?' checked':''}><span>Active</span></label><button class="mini bad" data-ofdel="${i}" type="button">Remove</button></div>
<div class="two"><label class="field"><span>Offer name</span><input data-of="name" maxlength="40" value="${esc(o.name)}"></label><label class="field"><span>Discount on play time (%)</span><input data-of="pct" type="number" min="0" max="100" step="1" value="${esc(o.pct)}"></label></div>
<div class="lbl">Days</div><div class="chips">${[1,2,3,4,5,6,0].map(d=>`<button type="button" class="chip" data-ofday="${d}" aria-pressed="${(o.days||[]).includes(d)}">${DAYN[d]}</button>`).join('')}</div>
<div class="two"><label class="field"><span>From</span><input data-of="from" type="time" value="${esc(o.from)}"></label><label class="field"><span>To</span><input data-of="to" type="time" value="${esc(o.to)}"></label></div>
<div class="lbl">Time lengths it applies to</div><div class="chips">${[30,60,120].map(m=>`<button type="button" class="chip" data-ofdur="${m}" aria-pressed="${(o.durations||[]).includes(m)}">${fmtMin(m)}</button>`).join('')}</div>
<div class="lbl">Play areas</div><div class="chips">${AREA_KEYS.map(a=>`<button type="button" class="chip" data-ofarea="${a}" aria-pressed="${(o.areas||[]).includes(a)}">${esc(AREAS[a].label)}</button>`).join('')}</div>
<label class="check"><input type="checkbox" data-of="needId"${o.needId?' checked':''}><span>ID card must be shown (staff tick it at check-in)</span></label>
<p class="hint" data-ofhint style="margin:8px 0 0">${esc(offerText(o))}</p></div>`).join(''):'<p class="hint" style="margin:0">No offers yet. Press + Add offer.</p>';
}
function offerFromEl(t){const c=t.closest('.offercard');return c?{c,i:Number(c.dataset.i),o:offerEdit[Number(c.dataset.i)]}:null}
$('#offerEditor').addEventListener('input',e=>{
const r=offerFromEl(e.target),f=e.target.dataset&&e.target.dataset.of;if(!r||!f||!r.o)return;
if(e.target.type==='checkbox')return;
r.o[f]=f==='pct'?num(e.target.value):e.target.value;
$('[data-ofhint]',r.c).textContent=offerText(r.o);
if(f==='name')$('.oc-h b',r.c).textContent=r.o.name||'New offer';
});
$('#offerEditor').addEventListener('change',e=>{
const r=offerFromEl(e.target),f=e.target.dataset&&e.target.dataset.of;if(!r||!f||!r.o||e.target.type!=='checkbox')return;
r.o[f]=e.target.checked;$('[data-ofhint]',r.c).textContent=offerText(r.o);
});
$('#offerEditor').addEventListener('click',e=>{
const del=e.target.closest('[data-ofdel]');
if(del){offerEdit.splice(Number(del.dataset.ofdel),1);renderOfferEditor();return}
const r=offerFromEl(e.target);if(!r||!r.o)return;
const tog=(arr,v)=>{const a=(arr||[]).slice(),k=a.indexOf(v);if(k>=0)a.splice(k,1);else a.push(v);return a};
const d=e.target.closest('[data-ofday]'),m=e.target.closest('[data-ofdur]'),a=e.target.closest('[data-ofarea]');
if(d)r.o.days=tog(r.o.days,Number(d.dataset.ofday));else if(m)r.o.durations=tog(r.o.durations,Number(m.dataset.ofdur));else if(a)r.o.areas=tog(r.o.areas,a.dataset.ofarea);else return;
const sc=window.scrollY;renderOfferEditor();window.scrollTo(0,sc);
});
$('#offerAdd').addEventListener('click',()=>{offerEdit.push({id:'o'+Date.now(),name:'New offer',pct:10,days:[1,2,3,4,5],from:'10:00',to:'18:00',durations:[60,120],areas:AREA_KEYS.slice(),needId:false,active:true});renderOfferEditor()});
$('#offerSave').addEventListener('click',()=>{
if(!isAdmin())return;
for(const o of offerEdit){
if(!String(o.name||'').trim()){toast('Give every offer a name.',true);return}
if(!(Number(o.pct)>=0&&Number(o.pct)<=100)){toast('The discount for "'+o.name+'" must be between 0 and 100.',true);return}
if(!(o.days||[]).length){toast('Choose at least one day for "'+o.name+'".',true);return}
if(!o.from||!o.to||o.from>=o.to){toast('"'+o.name+'": the From time must be earlier than the To time.',true);return}
if(!(o.durations||[]).length){toast('Choose at least one time length for "'+o.name+'".',true);return}
if(!(o.areas||[]).length){toast('Choose at least one play area for "'+o.name+'".',true);return}
}
const list=offerEdit.map(o=>({id:o.id,name:String(o.name).trim(),pct:Math.round(Number(o.pct)*100)/100,days:o.days.slice().sort((x,y)=>x-y),from:o.from,to:o.to,durations:o.durations.slice().sort((x,y)=>x-y),areas:o.areas.slice(),needId:!!o.needId,active:o.active!==false}));
B.saveOffers(list).then(()=>toast('Offers saved.')).catch(writeErr);
});
function renderDraftEditor(){
const el=$('#draftEditor');if(!el)return;
const sel=(f,list,cur,fmt)=>`<select data-df="${f}">${list.map(v=>`<option value="${esc(v)}"${String(cur)===String(v)?' selected':''}>${esc(fmt?fmt(v):v)}</option>`).join('')}</select>`;
el.innerHTML=draftEdit.length?draftEdit.map((d,i)=>`<div class="draftrow" data-i="${i}">
<label class="field"><span>Play area</span>${sel('area',AREA_KEYS,d.area,v=>AREAS[v].label)}</label>
<label class="field"><span>Time</span>${sel('min',[30,60,120],d.min,v=>fmtMin(Number(v)))}</label>
<label class="field"><span>Socks</span>${sel('socks',SOCKS,d.socks)}</label>
<label class="field"><span>Card</span>${sel('card',CARDS,d.card)}</label>
<label class="field"><span>Customer</span>${sel('ctype',['new','existing'],d.ctype,v=>v==='new'?'New':'Existing')}</label>
<button class="mini bad" data-dfdel="${i}" type="button">Remove</button></div>`).join(''):'<p class="hint" style="margin:0">No shortcuts yet. Press + Add shortcut.</p>';
}
$('#draftEditor').addEventListener('change',e=>{
const row=e.target.closest('.draftrow'),f=e.target.dataset&&e.target.dataset.df;if(!row||!f)return;
const d=draftEdit[Number(row.dataset.i)];d[f]=f==='min'?Number(e.target.value):e.target.value;
});
$('#draftEditor').addEventListener('click',e=>{const x=e.target.closest('[data-dfdel]');if(x){draftEdit.splice(Number(x.dataset.dfdel),1);renderDraftEditor()}});
$('#draftAdd').addEventListener('click',()=>{if(draftEdit.length>=8){toast('Up to 8 shortcuts.',true);return}draftEdit.push({area:AREA_KEYS[0],min:60,socks:'M',card:'Basic',ctype:'new'});renderDraftEditor()});
$('#draftSave').addEventListener('click',()=>{if(!isAdmin())return;B.saveDrafts(draftEdit.map(d=>({area:d.area,min:Number(d.min),socks:d.socks,card:d.card,ctype:d.ctype}))).then(()=>toast('Shortcuts saved.')).catch(writeErr)});
$('#bizSave').addEventListener('click',()=>{
if(!isAdmin())return;
const pub={name:settings.name,currency:settings.currency,remindEvery:settings.remindEvery,warnMin:settings.warnMin,bizAddress:$('#sAddr').value.trim()||DEFAULTS.bizAddress,bizPhone:$('#sPhone').value.trim(),bizGst:$('#sGst').value.trim(),waText:$('#sWaText').value.trim()||DEFAULTS.waText};
Object.assign(settings,{bizAddress:pub.bizAddress,bizPhone:pub.bizPhone,bizGst:pub.bizGst,waText:pub.waText});
B.saveSettings(pub).then(()=>toast('Business details saved.')).catch(writeErr);
});
const selIds=new Set();
function updateSelBar(){
[...selIds].forEach(id=>{if(!getS(id))selIds.delete(id)});
const bar=$('#selBar');if(!bar)return;
bar.hidden=!(me&&selIds.size>0);
$('#selCount').textContent=selIds.size+' selected';
const all=$('#selAll'),boxes=$$('#rBody .selrow');
if(all){all.checked=boxes.length>0&&boxes.every(b=>b.checked);all.indeterminate=boxes.some(b=>b.checked)&&!all.checked}
}
$('#rBody').addEventListener('change',e=>{
const c=e.target.closest('.selrow');if(!c)return;
if(c.checked)selIds.add(c.dataset.sid);else selIds.delete(c.dataset.sid);
updateSelBar();
});
$('#selAll').addEventListener('change',e=>{
$$('#rBody .selrow').forEach(b=>{b.checked=e.target.checked;if(b.checked)selIds.add(b.dataset.sid);else selIds.delete(b.dataset.sid)});
updateSelBar();
});
$('#selClear').addEventListener('click',()=>{selIds.clear();$$('#rBody .selrow').forEach(b=>{b.checked=false});updateSelBar()});
const selSessions=()=>[...selIds].map(getS).filter(Boolean).sort((a,b)=>a.startAt-b.startAt||(a.ticket||0)-(b.ticket||0));
function printHtml(html,title){
const pa=$('#printArea'),old=document.title;
pa.innerHTML=html;document.body.classList.add('printing');
if(title)document.title=title;
const done=()=>{document.body.classList.remove('printing');document.title=old;pa.innerHTML='';window.removeEventListener('afterprint',done)};
window.addEventListener('afterprint',done);
setTimeout(()=>window.print(),60);
}
const ymd=ts=>{const d=new Date(ts);return d.getFullYear()+String(d.getMonth()+1).padStart(2,'0')+String(d.getDate()).padStart(2,'0')};
const invNo=s=>'INV-'+ymd(s.startAt)+'-'+String(s.ticket||0).padStart(3,'0');
function invoiceHTML(s){
const b=bl(s),st=settings,play=b.play||0,ext=b.extTotal||0,adj=b.adjust||0,disc=b.discount||0;
const total=dueOf(s),paid=paidOf(s),due=Math.max(0,total-paid);
const lines=[['Play time \\u2014 '+AREAS[s.area].label+', '+fmtMin(s.baseMin||s.durationMin)+(s.players>1?' ('+s.players+' players)':''),money(play)]];
if(ext)lines.push(['Extra time',money(ext)]);
if(b.socks)lines.push(['Socks (size '+s.socks+')',money(b.socks)]);
if(b.card)lines.push([s.card+' card (new customer)',money(b.card)]);
if(disc)lines.push(['Discount on play time'+(b.offer?' \\u2014 '+b.offer:(b.discType==='pct'?' ('+b.discVal+'%)':'')),'\\u2212'+money(disc)]);
if(adj)lines.push(['Adjustment',money(adj)]);
const method=paid>0?(upiOf(s)>0&&cashOf(s)>0?'Cash + UPI':upiOf(s)>0?'UPI':'Cash'):'';
return `<section class="inv"><div class="ih"><div><img src="${LOGO}" alt=""><h1>${esc(st.name)}</h1><p>${esc(st.bizAddress)}</p><p>${st.bizPhone?'Phone: '+esc(st.bizPhone):''}${st.bizPhone&&st.bizGst?' \\u00B7 ':''}${st.bizGst?'GST: '+esc(st.bizGst):''}</p></div>
<div style="text-align:right"><b style="font-size:20px">INVOICE</b><p>No: ${esc(invNo(s))}</p><p>Date: ${esc(new Date(s.startAt).toLocaleDateString([], {day:'numeric',month:'short',year:'numeric'}))}</p><p>Time in: ${esc(clockStr(s.startAt))}</p></div></div>
<p>Billed to</p><p><b style="font-size:16px">${esc(s.name)}</b></p>${contacts[s.id]?'<p>Phone: '+esc(contacts[s.id])+'</p>':''}
<table><thead><tr><th>Description</th><th class="n">Amount</th></tr></thead><tbody>${lines.map(l=>`<tr><td>${esc(l[0])}</td><td class="n">${esc(l[1])}</td></tr>`).join('')}
<tr class="t"><td>Total</td><td class="n">${esc(money(total))}</td></tr>
<tr><td>Received${method?' ('+method+')':''}</td><td class="n">${esc(money(paid))}</td></tr>
<tr class="t"><td>Amount due</td><td class="n">${esc(money(due))}</td></tr></tbody></table>
<div class="stamp">${due<=0?'PAID':'PAYMENT PENDING'}</div>
<p class="ft">Thank you for visiting ${esc(st.name)}.</p></section>`;
}
function slipHTML(s){
const out=s.status==='completed'&&s.endedAt?s.endedAt:endOf(s);
return `<section class="slip"><div class="sl-h">${esc(settings.name)}</div><div class="sl-n">${esc(s.name)}</div><div>Ticket ${esc(ticketStr(s.ticket))} \\u00B7 ${esc(AREAS[s.area].label)}</div><div>${esc(fmtMin(s.durationMin))}${s.socks&&s.socks!=='No socks'?' \\u00B7 Socks '+esc(s.socks):''}</div><div>In ${esc(clockStr(s.startAt))} \\u00B7 Out ${esc(clockStr(out))}</div></section>`;
}
function printSlips(list){if(!list.length)return;printHtml(list.map(slipHTML).join(''),'Wristband slips')}
$('#slipBtn').addEventListener('click',()=>{const l=selSessions();if(!l.length){toast('Tick the participants first.',true);return}printSlips(l)});
$('#invBtn').addEventListener('click',()=>{
if(!isAdmin())return;
const l=selSessions().filter(s=>s.status!=='cancelled'&&billing[s.id]);
if(!l.length){toast('Tick at least one participant who is not cancelled.',true);return}
if(l.length<selSessions().length)toast('Cancelled entries are skipped.');
printHtml(l.map(invoiceHTML).join(''),'Invoices');
});
function renderPriceHistory(){""")
P.save();H.save();print('part3 ok')
