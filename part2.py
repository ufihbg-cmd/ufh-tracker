from pl import *
P=Patcher('r1/app.js'); H=Patcher('r1/index.html')

# ================= STAGE 3: WhatsApp consent + bar, bulk offers =================
P.rep("let sessions=[],billing={},contacts={},staffList=[],pstat={};","let sessions=[],billing={},contacts={},contactMeta={},staffList=[],pstat={};")
P.rep("loaded=false;sessions=[];billing={};contacts={};pstat={};","loaded=false;sessions=[];billing={};contacts={};contactMeta={};pstat={};",2)
P.rep("""subContacts:(since,cb,err)=>live('contacts','id',()=>fetchAll(()=>client.from('contacts').select('id,phone').gte('start_at',since||0).order('id')),
r=>[r.id,r.phone||''],st=>cb(Object.fromEntries(st)),err),""","""subContacts:(since,cb,err)=>live('contacts','id',()=>fetchAll(()=>client.from('contacts').select('id,phone,wa,wa_sent_at').gte('start_at',since||0).order('id')),
r=>[r.id,{phone:r.phone||'',wa:!!r.wa,sent:r.wa_sent_at?Number(r.wa_sent_at):null}],st=>{const a=Array.from(st.entries());cb(Object.fromEntries(a.map(e=>[e[0],e[1].phone])),Object.fromEntries(a.map(e=>[e[0],{wa:e[1].wa,sent:e[1].sent}])))},err),""")
P.rep("if(me)unsubC=B.subContacts(sinceMs(),m=>{contacts=m;renderAll()},subErr);","if(me)unsubC=B.subContacts(sinceMs(),(m,meta)=>{contacts=m;contactMeta=meta||{};renderAll()},subErr);")
P.rep("if(o.startAt!==undefined)row.start_at=o.startAt;\nawait ok(client.from('contacts')","if(o.startAt!==undefined)row.start_at=o.startAt;\nif(o.wa!==undefined)row.wa=o.wa;\nif(o.waSent!==undefined)row.wa_sent_at=o.waSent;\nawait ok(client.from('contacts')")
P.rep("if(g.phone)B.saveContact(id,{phone:g.phone,startAt:now}).catch(()=>{});","if(g.phone)B.saveContact(id,{phone:g.phone,startAt:now,wa:!!g.wa}).catch(()=>{});")
P.rx(r"const fromBill=r=>\(\{","const fromBill=r=>({offer:r.offer||null,")
P.rep("function pricingVersions(){","""let waSig='';
const waDigits=p=>{let d=String(p||'').replace(/\\D/g,'');if(d.length===11&&d[0]==='0')d=d.slice(1);if(d.length===10)d='91'+d;return d};
function renderWa(){
const el=$('#waBar');if(!el)return;
const now=Date.now();
const list=me?sessions.filter(s=>s.status==='active'&&!s.pausedAt&&now>=s.startAt&&contactMeta[s.id]&&contactMeta[s.id].wa&&!contactMeta[s.id].sent&&waDigits(contacts[s.id]).length>=11&&(endOf(s)-now)<=settings.warnMin*60000):[];
const sig=list.map(s=>s.id+':'+Math.max(0,Math.ceil((endOf(s)-now)/60000))).join('|');
if(sig===waSig)return;
waSig=sig;el.hidden=!list.length;
el.innerHTML=list.map(s=>{const m=Math.ceil((endOf(s)-now)/60000);return `<div class="wa-item" data-id="${esc(s.id)}"><span>WhatsApp reminder for <b>${esc(s.name)}</b> \\u00B7 ${m>0?m+' min left':'time is up'}</span><span class="wa-btns"><button class="btn primary" data-wa="send">Send on WhatsApp</button><button class="btn ghost" data-wa="skip">Skip</button></span></div>`}).join('');
}
function pricingVersions(){""")
P.rep("function renderAll(){\nif(!appReady)return;\nrenderQuick();","function renderAll(){\nif(!appReady)return;\nrenderQuick();\nrenderWa();")
P.rep("if(currentPriceKey()!==lastPriceKey)rebuildSettings();","if(currentPriceKey()!==lastPriceKey)rebuildSettings();\nrenderWa();")
P.rep("$('#quickBar').addEventListener('click',","""$('#waBar').addEventListener('click',e=>{
const b=e.target.closest('[data-wa]'),it=e.target.closest('.wa-item');if(!b||!it||!canWrite())return;
const id=it.dataset.id,s=getS(id);if(!s)return;
if(b.dataset.wa==='send'){
const m=Math.max(1,Math.ceil((endOf(s)-Date.now())/60000));
const msg=String(settings.waText||'').split('{name}').join(s.name).split('{mins}').join(String(m)).split('{time}').join(clockStr(endOf(s)));
window.open('https://wa.me/'+waDigits(contacts[id])+'?text='+encodeURIComponent(msg),'_blank','noopener');
}
B.saveContact(id,{waSent:Date.now()}).catch(writeErr);
});
$('#quickBar').addEventListener('click',""")
H.rep('<div class="alerts" id="alerts" aria-live="assertive"></div>','<div class="alerts" id="alerts" aria-live="assertive"></div>\n<div class="wabar" id="waBar" hidden></div>')
H.rep("</style>",""".wabar{display:flex;flex-direction:column;gap:8px;margin:0 0 14px}
.wabar .wa-item{display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:space-between;background:#E8FBF1;border:1.5px solid var(--ok);border-radius:14px;padding:10px 14px}
.wabar .wa-item b{color:#0A6B47}
.wabar .wa-btns{display:flex;gap:8px}
.hintline{font-size:13px;margin:0 0 10px;min-height:0}
</style>""")
P.rep("""<label class="field"><span>Phone (optional)</span><input id="ePhone" type="tel" autocomplete="off" maxlength="20" inputmode="tel"></label></div>""",
      """<label class="field"><span>Phone (optional)</span><input id="ePhone" type="tel" autocomplete="off" maxlength="20" inputmode="tel"></label></div>
<label class="check" id="waWrap"><input type="checkbox" id="eWa"><span>Send a WhatsApp reminder when time is nearly up (default: No)</span></label>""")
P.rep("""<div class="two"><label class="field"><span>Phone</span><input id="eePhone\"""","""<label class="field"><span>WhatsApp reminder (needs the phone number)</span><select id="eeWa"><option value="no"${contactMeta[s.id]&&contactMeta[s.id].wa?'':' selected'}>No</option><option value="yes"${contactMeta[s.id]&&contactMeta[s.id].wa?' selected':''}>Yes</option></select></label>
<div class="two"><label class="field"><span>Phone</span><input id="eePhone\"""")
P.rep("B.saveContact(id,{phone:$('#eePhone').value.trim(),startAt:sIn}).catch(()=>{});","B.saveContact(id,{phone:$('#eePhone').value.trim(),startAt:sIn,wa:$('#eeWa').value==='yes'&&!!$('#eePhone').value.trim()}).catch(()=>{});")
P.rep("paidAmount:paidAmt,cash,upi,cardAmt:card,paidAt:Date.now(),paidBy:me.name})","paidAmount:paidAmt,cash,upi,cardAmt:card,offer:(d.t===(b.discType||'none')&&d.v===(b.discVal||0))?(b.offer||null):null,paidAt:Date.now(),paidBy:me.name})")
# bulk
P.rep("remark:'',disc:'none',dcVal:0,dcType:'pct',start:''});","remark:'',disc:'none',dcVal:0,dcType:'pct',start:'',offer:'none',wa:'no'});")
P.rx(r"function rowCalc\(r\)\{.*?\n\}\n","""function rowCalc(r){
const min=r.min==='custom'?(parseInt(r.custom,10)||0):Number(r.min);
const st=r.start?(new Date(r.start).getTime()||Date.now()):(bulkStartTouched?(new Date($('#bStart').value).getTime()||Date.now()):Date.now());
const off=r.offer&&r.offer!=='none'?getOffers().find(x=>x.id===r.offer):null;
let dc,orr=null;
if(off){orr=offerOk(off,st,r.area,min);dc=orr.ok?{t:'pct',v:Number(off.pct)||0}:{t:'none',v:0}}
else dc=r.disc==='none'?{t:'none',v:0}:r.disc==='custom'?{t:r.dcType==='amt'?'amt':'pct',v:num(r.dcVal)}:{t:'pct',v:Number(r.disc)};
const b=calcBill({area:r.area,card:r.card,ctype:r.ctype,socks:r.socks,bday:r.card==='Premium'&&r.bday==='yes',players:1},min,dc,pricesAt(st));
return {min,dc,b,off,orr,st};
}
function bulkOfferFields(r,sel){
const os=activeOffers();
return (os.length?`<label class="field"><span>Offer</span>${sel('offer',['none'].concat(os.map(o=>o.id)),v=>v==='none'?'No offer':(os.find(o=>o.id===v)||{}).name||v)}</label><p class="hintline" data-offnote style="grid-column:1/-1;margin:0"></p>`:'')+
`<label class="field"><span>WhatsApp reminder</span>${sel('wa',['no','yes'],v=>v==='yes'?'Yes':'No')}</label>`;
}
""")
P.rep('<div class="bpay"><div class="bgrid">','<div class="bpay"><div class="bgrid">${bulkOfferFields(r,sel)}')
P.rep("const due=$('[data-due]',el);if(due)due.textContent=money(c.b.total);","""const due=$('[data-due]',el);if(due)due.textContent=money(c.b.total);
const nt=$('[data-offnote]',el);
if(nt){const o=c.off;nt.textContent=!o?'':(c.orr.ok?o.name+': '+o.pct+'% off play time applied.':'Not valid for this check-in: '+c.orr.why);nt.style.color=o&&c.orr.ok?'var(--ok)':'var(--over)'}""")
P.rep("syncBulkPay();\n$('#bPartWrap').hidden=bulkPay!=='part';","""syncBulkPay();
const iw=$('#bIdWrap');if(iw)iw.hidden=!cs.some(c=>c.off&&c.orr.ok&&c.off.needId);
$('#bPartWrap').hidden=bulkPay!=='part';""")
P.rep("""<div class="lbl" style="color:var(--yellow-ink)">Payment received for the whole group (one choice for everyone)</div>""","""<label class="check" id="bIdWrap" hidden><input type="checkbox" id="bIdSeen"><span>I have checked the ID cards of everyone using an offer</span></label>
<div class="lbl" style="color:var(--yellow-ink)">Payment received for the whole group (one choice for everyone)</div>""")
P.rep("Object.assign({},l,{name:'',phone:'',remark:''})","Object.assign({},l,{name:'',phone:'',remark:'',wa:'no'})")
P.rep("const totals=rows.map(x=>rowCalc(x.r).b.total),allTotal=","""for(const x of rows){
const c=rowCalc(x.r);
if(c.off&&!c.orr.ok){toast('Participant '+(x.i+1)+': '+c.off.name+' is not valid for this check-in: '+c.orr.why,true);return}
if(x.r.wa==='yes'&&!x.r.phone.trim()){toast('Participant '+(x.i+1)+': enter the phone number for the WhatsApp reminder.',true);return}
}
for(const x of rows){
const c=rowCalc(x.r);
if(c.off&&c.off.needId&&!$('#bIdSeen').checked){toast('Tick "I have checked the ID cards" to give the '+c.off.name+'.',true);return}
}
const totals=rows.map(x=>rowCalc(x.r).b.total),allTotal=""")
P.rep("min:c.min,discType:c.dc.t,discVal:c.dc.v,paid:bulkPay===","min:c.min,discType:c.dc.t,discVal:c.dc.v,offer:c.off?c.off.name:undefined,wa:r.wa==='yes',paid:bulkPay===")
P.save();H.save();print('part2 (stage 3) ok')
