from pl import *
P=Patcher('r1/app.js'); H=Patcher('r1/index.html')

# ================= STAGE 1: business settings fields + pause =================
P.rep(r"const DEFAULTS={name:'Unlimited Fun Is Here',currency:'\u20B9',remindEvery:2,warnMin:5,",
      r"const DEFAULTS={name:'Unlimited Fun Is Here',currency:'\u20B9',remindEvery:2,warnMin:5,bizAddress:'Kovvada, Annavaram, Bhimavaram',bizPhone:'',bizGst:'',waText:'Hello {name}, your play time at UFH ends in {mins} minutes. Thank you for visiting Unlimited Fun Is Here!',")
P.rep("['name','currency'].forEach(k=>{if(typeof d[k]==='string'&&d[k])s[k]=d[k]});",
      "['name','currency','bizAddress','waText'].forEach(k=>{if(typeof d[k]==='string'&&d[k])s[k]=d[k]});\n['bizPhone','bizGst'].forEach(k=>{if(typeof d[k]==='string')s[k]=d[k]});")
P.rep("const endOf=s=>s.startAt+s.durationMin*60000;","const endOf=s=>s.startAt+s.durationMin*60000+(s.pausedMs||0)+(s.pausedAt?Math.max(0,Date.now()-s.pausedAt):0);")
P.rep("editedBy:'edited_by',editedAt:'edited_at'};","editedBy:'edited_by',editedAt:'edited_at',pausedAt:'paused_at',pausedMs:'paused_ms'};")
P.rep("['ticket','players','baseMin','durationMin','startAt','endedAt','cancelledAt','editedAt'].forEach(k=>{if(o[k]!=null)o[k]=Number(o[k])});",
      "['ticket','players','baseMin','durationMin','startAt','endedAt','cancelledAt','editedAt','pausedAt','pausedMs'].forEach(k=>{if(o[k]!=null)o[k]=Number(o[k])});")
P.rep("s.bday=!!s.bday;s.extensions=s.extensions||[];","s.bday=!!s.bday;s.extensions=s.extensions||[];s.pausedMs=s.pausedMs||0;s.pausedAt=s.pausedAt||null;")
P.rep('data-start="${s.startAt}" data-end="${endOf(s)}" data-state="ok">',
      'data-start="${s.startAt}" data-end="${endOf(s)}" data-dur="${s.durationMin}" data-frozen="${s.pausedAt?Math.round((s.startAt+s.durationMin*60000+(s.pausedMs||0)-s.pausedAt)/1000):\'\'}" data-state="ok">')
P.rep('<div class="g-actions"><button class="btn ghost" data-act="extend" data-write>Add time</button>',
      '<div class="g-actions">${s.pausedAt?\'<button class="btn ghost" data-act="resume" data-write>Resume</button>\':(isOver(s)||s.startAt>Date.now()?\'\':\'<button class="btn ghost" data-act="pause" data-write>Pause</button>\')}<button class="btn ghost" data-act="extend" data-write>Add time</button>')
P.rep("if(a==='extend')openExtend(id);else if(a==='cancel')","if(a==='pause')doPause(id);else if(a==='resume')doResume(id);else if(a==='extend')openExtend(id);else if(a==='cancel')")
P.rep("function cardClick(e){","""function doPause(id){
const s=getS(id);if(!s||!canWrite()||s.pausedAt)return;
B.patchGuest(id,{pausedAt:Date.now()}).catch(writeErr);toast(s.name+' paused. The timer is stopped.');
}
function doResume(id){
const s=getS(id);if(!s||!canWrite()||!s.pausedAt)return;const now=Date.now();
B.patchGuest(id,{pausedAt:null,pausedMs:(s.pausedMs||0)+(now-s.pausedAt)}).catch(writeErr);toast(s.name+' resumed. The timer is running.');
}
function cardClick(e){""")
P.rep("const st=+el.dataset.start,en=+el.dataset.end,waiting=now<st;","""const fz=el.dataset.frozen;
if(fz!==''&&fz!==undefined){
const frem=+fz,fdur=(+el.dataset.dur)*60;
if(el.dataset.state!=='ok')el.dataset.state='ok';
$('.badge',el).textContent='Paused';$('.timer',el).textContent=fmtHMS(frem);
$('.track span',el).style.width=Math.min(100,Math.max(0,(fdur-frem)/fdur*100))+'%';
return;
}
const st=+el.dataset.start,en=+el.dataset.end,waiting=now<st;""")
P.rep("$('#oOk').onclick=()=>{B.patchGuest(id,{status:'completed',endedAt:Date.now(),outBy:me.name}).catch(writeErr);closeDlg();toast(s.name+' marked out.')};",
      "$('#oOk').onclick=()=>{const t=Date.now();B.patchGuest(id,Object.assign({status:'completed',endedAt:t,outBy:me.name},s.pausedAt?{pausedAt:null,pausedMs:(s.pausedMs||0)+(t-s.pausedAt)}:{})).catch(writeErr);closeDlg();toast(s.name+' marked out.')};")
P.rx(r"tag=`<span class=\"tag \$\{o\?'up':'play'\}\">\$\{o\?'Time\\u2019s up':'Playing'\}</span>`",
     r"""tag=`<span class="tag ${o?'up':s.pausedAt?'nw':'play'}">${o?'Time\u2019s up':s.pausedAt?'Paused':'Playing'}</span>`""")

# ================= STAGE 2: quick entry + offers in the check-in form =================
P.rep("function pricingVersions(){", r"""const DAYN=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const getOffers=()=>{const r=priceRows.find(x=>x.id==='offers');return r&&r.data&&Array.isArray(r.data.offers)?r.data.offers:[]};
const activeOffers=()=>getOffers().filter(o=>o&&o.active!==false);
const getDrafts=()=>{const r=priceRows.find(x=>x.id==='drafts');return r&&r.data&&Array.isArray(r.data.drafts)?r.data.drafts:[]};
const t12=hm=>{const a=String(hm||'0:0').split(':').map(Number),h=a[0]||0,m=a[1]||0;return ((h%12)||12)+(m?':'+String(m).padStart(2,'0'):'')+' '+(h>=12?'PM':'AM')};
function offerText(o){
const d=(o.days||[]).slice().sort((a,b)=>a-b);
let days='every day';
if(d.length&&d.length<7)days=d.join()==='1,2,3,4,5'?'Mon\u2013Fri':d.map(x=>DAYN[x]).join(', ');
const durs=(o.durations||[]).length?o.durations.map(fmtMin).join(' and '):'any time length';
const ar=(o.areas||[]).length&&o.areas.length<AREA_KEYS.length?o.areas.map(a=>AREAS[a].label).join(' and '):'both play areas';
return days+', '+t12(o.from)+' to '+t12(o.to)+', '+durs+', '+ar;
}
function offerOk(o,ts,area,min){
if(!o||o.active===false)return {ok:false,why:'this offer is switched off.'};
const dt=new Date(ts),hm=dt.getHours()*60+dt.getMinutes();
const f=String(o.from||'00:00').split(':').map(Number),t=String(o.to||'23:59').split(':').map(Number);
const okDay=!(o.days||[]).length||o.days.includes(dt.getDay());
const okTime=hm>=f[0]*60+(f[1]||0)&&hm<t[0]*60+(t[1]||0);
const okDur=!(o.durations||[]).length||o.durations.includes(min);
const okArea=!(o.areas||[]).length||o.areas.includes(area);
if(okDay&&okTime&&okDur&&okArea)return {ok:true,why:''};
return {ok:false,why:'it applies '+offerText(o)+'.'};
}
const draftLabel=d=>AREAS[d.area].label+' \u00B7 '+fmtMin(d.min)+' \u00B7 '+(d.socks==='No socks'?'No socks':'Socks '+d.socks)+' \u00B7 '+(d.ctype==='new'?'New':'Existing');
function renderQuick(){
const el=$('#quickBar');if(!el)return;
const ds=me?getDrafts().filter(d=>d&&AREAS[d.area]):[];
el.hidden=!ds.length;
el.innerHTML=ds.length?'<span class="qlbl">Quick entry:</span>'+ds.map((d,i)=>`<button type="button" data-q="${i}">${esc(draftLabel(d))}</button>`).join(''):'';
}
function pricingVersions(){""")
P.rep("function renderAll(){\nif(!appReady)return;","function renderAll(){\nif(!appReady)return;\nrenderQuick();")
P.rep("$('#tabs').addEventListener('click',e=>{const b=e.target.closest('[data-tab]');if(b)switchTab(b.dataset.tab)});",
      "$('#tabs').addEventListener('click',e=>{const b=e.target.closest('[data-tab]');if(b)switchTab(b.dataset.tab)});\n$('#quickBar').addEventListener('click',e=>{const b=e.target.closest('[data-q]');if(!b||!canWrite())return;openEntry(getDrafts().filter(d=>d&&AREAS[d.area])[+b.dataset.q])});")
H.rep('<div id="dashFilters"></div>','<div class="quickbar" id="quickBar" hidden></div>\n<div id="dashFilters"></div>')
H.rep("</style>",""".quickbar{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:0 0 14px}
.quickbar .qlbl{font-size:13px;color:var(--muted);font-weight:600}
.quickbar button{background:var(--surface);border:1.5px solid var(--cyan);color:var(--ink);border-radius:999px;padding:9px 14px;font:600 14px var(--body);cursor:pointer}
.quickbar button:hover{background:var(--surface-2)}
</style>""")
P.rep("function openEntry(){\nif(!canWrite())return;\nentry={area:lastArea,ctype:'new',min:60,card:'Basic',bday:false,socks:'No socks',disc:'none',pay:'pending',players:1,startTouched:false};",
      "function openEntry(preset){\nif(!canWrite())return;\nentry={area:lastArea,ctype:'new',min:60,card:'Basic',bday:false,socks:'No socks',disc:'none',pay:'pending',players:1,startTouched:false,offer:'none'};\nif(preset&&preset.area)Object.assign(entry,{area:preset.area,min:preset.min||60,socks:preset.socks||'No socks',card:preset.card||'Basic',ctype:preset.ctype||'new'});")
P.rep("""<div><div class="lbl">Discount (on play time only)</div>${chipRow('disc'""","""${offerBlock()}<div><div class="lbl">Discount (on play time only)</div>${chipRow('disc'""")
P.rep("const chipRow=(key,items,fmt)=>","""function offerBlock(){
const os=activeOffers();if(!os.length)return '';
return `<div class="lbl">Offer</div>${chipRow('offer',['none'].concat(os.map(o=>o.id)),v=>v==='none'?'No offer':(os.find(o=>o.id===v)||{}).name||v)}<p class="hintline" id="offerNote"></p><label class="check" id="idWrap" hidden><input type="checkbox" id="eIdSeen"><span>ID card seen and checked</span></label>`;
}
const chipRow=(key,items,fmt)=>""")
P.rep("function entryDisc(){\nif(entry.disc==='none')return {t:'none',v:0};","""const entryStart=()=>entry&&entry.startTouched?(new Date($('#eStart').value).getTime()||Date.now()):Date.now();
const curOffer=()=>entry.offer&&entry.offer!=='none'?getOffers().find(x=>x.id===entry.offer):null;
function entryDisc(){
const o=curOffer();
if(o){const r=offerOk(o,entryStart(),entry.area,entryMin());return r.ok?{t:'pct',v:Number(o.pct)||0}:{t:'none',v:0}}
if(entry.disc==='none')return {t:'none',v:0};""")
P.rep("b.setAttribute('aria-pressed',String(String(cur)===b.dataset.v));\n});","""b.setAttribute('aria-pressed',String(String(cur)===b.dataset.v));
});
const on=$('#offerNote');
if(on){
const o=curOffer();
if(!o){on.textContent='';$('#idWrap').hidden=true}
else{const r=offerOk(o,entryStart(),entry.area,entryMin());on.textContent=r.ok?o.name+': '+o.pct+'% off play time applied.':'Not valid for this check-in: '+r.why;on.style.color=r.ok?'var(--ok)':'var(--over)';$('#idWrap').hidden=!(r.ok&&o.needId)}
}""")
P.rep("else if(key==='disc')entry.disc=(v==='none'||v==='custom')?v:Number(v);","else if(key==='disc'){entry.disc=(v==='none'||v==='custom')?v:Number(v);if(entry.disc!=='none')entry.offer='none'}\nelse if(key==='offer'){entry.offer=v;if(v!=='none')entry.disc='none'}")
P.rep("const part=entry.pay==='part';let pc=0,pu=0;","""const wantWa=!!($('#eWa')&&$('#eWa').checked);
if(wantWa&&!$('#ePhone').value.trim()){toast('Enter the phone number to send a WhatsApp reminder.',true);return}
const off=curOffer();
if(off){
const orr=offerOk(off,startAt,entry.area,min);
if(!orr.ok){toast(off.name+' is not valid for this check-in: '+orr.why,true);return}
if(off.needId&&!$('#eIdSeen').checked){toast('Tick "ID card seen and checked" to give the '+off.name+'.',true);return}
}
const part=entry.pay==='part';let pc=0,pu=0;""")
P.rep("min,discType:dc.t,discVal:dc.v,\npaid:entry.pay==='cash'","min,discType:dc.t,discVal:dc.v,offer:off?off.name:undefined,wa:wantWa,\npaid:entry.pay==='cash'")
P.rep("paid:!!g.paid,payMethod:g.payMethod||'cash',cashAmt:g.cashAmt,upiAmt:g.upiAmt,paidBy:me.name}).catch(writeErr);","paid:!!g.paid,payMethod:g.payMethod||'cash',cashAmt:g.cashAmt,upiAmt:g.upiAmt,offer:g.offer,paidBy:me.name}).catch(writeErr);")
P.rep("cash_amt:o.cashAmt,upi_amt:o.upiAmt,paid_by:o.paidBy}}))","cash_amt:o.cashAmt,upi_amt:o.upiAmt,offer:o.offer,paid_by:o.paidBy}}))")
# check-in time changes refresh the offer note and the bill
P.rep("if(id==='eStart'){entry.startTouched=true;return}","if(id==='eStart'){entry.startTouched=true;syncEntry();return}")
P.rep("$('#eStart').value=toLocalInput(Date.now()+n*60000);entry.startTouched=n>0;return}","$('#eStart').value=toLocalInput(Date.now()+n*60000);entry.startTouched=n>0;syncEntry();return}")
P.rep("if(entry&&!entry.startTouched&&edlg.open&&$('#eStart'))$('#eStart').value=toLocalInput(Date.now())},15000);","if(entry&&!entry.startTouched&&edlg.open&&$('#eStart')){$('#eStart').value=toLocalInput(Date.now());syncEntry()}},15000);")
P.save();H.save();print('part1 ok')
