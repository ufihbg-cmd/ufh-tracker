const {open}=require('./harness.js');
const DIR=process.argv[2];
const TUE=new Date(2026,10,3,11,0,0).getTime(); // Tuesday 3 Nov 2026, 11:00
let bad=0,total=0;
const ok=(name,cond,extra)=>{total++;console.log((cond?'PASS ':'FAIL ')+name+(extra!==undefined&&!cond?'  -> '+extra:''));if(!cond)bad++};
const localIn=(m)=>`(()=>{const d=new Date(Date.now()+(${m})*60000),z=n=>String(n).padStart(2,'0');return d.getFullYear()+'-'+z(d.getMonth()+1)+'-'+z(d.getDate())+'T'+z(d.getHours())+':'+z(d.getMinutes())})()`;
async function section(name,fn,time){console.log('\n== '+name);const h=await open(DIR,{time:time||TUE});try{await fn(h,h.p)}catch(e){ok(name+' ran without crashing',false,String(e).slice(0,200))}ok(name+': no page errors',h.errs.length===0,JSON.stringify(h.errs));await h.done()}

(async()=>{
await section('Pause button',async(h,p)=>{
  await h.login('staff@test.com'); await p.click('#newBtn'); await p.fill('#eName','Pause Kid'); await p.click('#eGo'); await p.waitForTimeout(700);
  const timer=()=>h.txt('#guests .guest:first-child .timer');
  await p.click('#guests [data-act=pause]'); await p.waitForTimeout(500); const f1=await timer();
  ok('badge says Paused', (await h.txt('#guests .guest:first-child .badge'))==='Paused');
  await p.waitForTimeout(3300); ok('timer frozen for 3 seconds', f1===await timer(), f1+' vs '+await timer());
  await p.click('[data-tab=history]'); await p.waitForTimeout(250); ok('history shows Paused tag', (await p.locator('#rBody tr:first-child .tag').allTextContents()).includes('Paused'));
  await p.click('[data-tab=dash]'); await p.waitForTimeout(250); await p.click('#guests [data-act=resume]'); await p.waitForTimeout(1500);
  ok('resumes and counts down', (await h.txt('#guests .guest:first-child .badge'))==='Playing' && await timer()!==f1);
  const g=await p.evaluate(()=>window.__db.guests[0]); ok('paused time recorded (>=3.3s)', g.paused_at===null&&g.paused_ms>=3300, JSON.stringify([g.paused_at,g.paused_ms]));
  await p.click('#guests [data-act=pause]'); await p.waitForTimeout(300); await p.click('#guests [data-act=out]'); await p.click('#oOk'); await p.waitForTimeout(500);
  const g2=await p.evaluate(()=>window.__db.guests[0]); ok('mark out while paused completes and clears the pause', g2.status==='completed'&&g2.paused_at===null);
});

await section('Quick entry + student offer',async(h,p)=>{
  await h.login('staff@test.com');
  ok('four quick-entry buttons', (await p.locator('#quickBar [data-q]').count())===4);
  await p.click('#quickBar [data-q="0"]'); await p.waitForTimeout(250);
  const sel=await p.evaluate(()=>[...document.querySelectorAll('#entryBody [aria-pressed=true]')].map(b=>b.textContent.trim()).join('|'));
  ok('shortcut 1 prefills Trampoline / 1 hour / M / Basic / New', /Trampoline/.test(sel)&&/1 hour/.test(sel)&&/\bM\b/.test(sel)&&/Basic/.test(sel)&&/New/.test(sel), sel);
  await p.fill('#eName','Student One'); await p.click('[data-k=offer][data-v=student]');
  ok('offer note says applied, ID box shown', /20% off play time applied/.test(await h.txt('#offerNote'))&&await h.vis('#idWrap'));
  ok('bill is 430 (play 250-50 + socks 30 + card 200)', /Bill amount\s*₹430/.test(await h.txt('#eBill')), await h.txt('#eBill'));
  await p.click('[data-k=pay][data-v=cash]'); await p.click('#eGo'); await p.waitForTimeout(250);
  ok('cannot start without the ID tick', /ID card seen/.test(await h.toast()));
  await p.check('#eIdSeen'); await p.click('#eGo'); await p.waitForTimeout(600);
  const b=await p.evaluate(()=>window.__db.billing[0]); ok('saved: 20% discount, offer name, total 430', b.discount===50&&b.disc_val===20&&b.offer==='Student offer'&&b.total===430, JSON.stringify(b));
  await p.click('#newBtn'); await p.fill('#eName','S2'); await p.click('[data-k=min][data-v="30"]'); await p.click('[data-k=offer][data-v=student]');
  ok('30 minutes is not valid for the student offer', /Not valid/.test(await h.txt('#offerNote')));
  await p.click('#eGo'); await p.waitForTimeout(250); ok('start is blocked', /not valid/i.test(await h.toast()));
  await p.click('[data-k=min][data-v="60"]'); await p.click('[data-k=offer][data-v=student]'); await p.click('[data-k=disc][data-v="10"]');
  ok('choosing a manual discount clears the offer', (await h.txt('#offerNote'))===''&&await p.getAttribute('[data-k=offer][data-v=none]','aria-pressed')==='true');
  await p.click('[data-k=disc][data-v=none]'); await p.click('[data-k=offer][data-v=student]');
  for(const [t,exp,label] of [['2026-11-03T18:30',false,'6:30 PM Tuesday'],['2026-11-07T11:00',false,'Saturday 11 AM'],['2026-11-06T17:59',true,'Friday 5:59 PM'],['2026-11-02T10:00',true,'Monday 10:00 AM'],['2026-11-02T09:59',false,'Monday 9:59 AM']]){
    await p.fill('#eStart',t); await p.dispatchEvent('#eStart','input'); ok('offer window: '+label+' -> '+(exp?'valid':'not valid'), /applied/.test(await h.txt('#offerNote'))===exp, await h.txt('#offerNote'));
  }
});

await section('WhatsApp reminders',async(h,p)=>{
  await h.login('staff@test.com');
  await p.evaluate(()=>{window.__opened=[];window.open=u=>{window.__opened.push(u);return null}});
  await p.click('#newBtn'); ok('WhatsApp box is unchecked by default', !(await p.isChecked('#eWa')));
  await p.fill('#eName','NoPhone'); await p.check('#eWa'); await p.click('#eGo'); await p.waitForTimeout(250); ok('Yes without a phone number is refused', /phone number/.test(await h.toast())); await p.click('[data-close]');
  const mk=async(name,phone,wa,ago)=>{await p.click('#newBtn');await p.fill('#eName',name);await p.fill('#ePhone',phone);await p.click('[data-k=min][data-v="30"]');
    await p.fill('#eStart',await p.evaluate(localIn(-ago)));await p.dispatchEvent('#eStart','input');if(wa)await p.check('#eWa');await p.click('#eGo');await p.waitForTimeout(500)};
  await mk('Asha K','98480 12345',true,27); await mk('Bhanu','98480 99999',false,27); await mk('Chitra','98480 77777',true,5);
  await p.waitForTimeout(1300);
  ok('bar shows only Asha (said Yes, 3 min left)', /Asha K/.test(await h.txt('#waBar'))&&!/Bhanu|Chitra/.test(await h.txt('#waBar')), await h.txt('#waBar'));
  await p.click('#waBar [data-wa=send]'); await p.waitForTimeout(400);
  const u=decodeURIComponent(await p.evaluate(()=>window.__opened[0]||''));
  ok('opens WhatsApp with the number and message', u.startsWith('https://wa.me/919848012345?text=Hello Asha K')&&/ends in 3 minutes/.test(u), u);
  ok('bar disappears after sending and is remembered', !(await h.vis('#waBar'))&&(await p.evaluate(()=>window.__db.contacts.filter(c=>c.wa&&c.wa_sent_at).length))===1);
});

await section('Bulk offers',async(h,p)=>{
  await h.login('staff@test.com'); await p.click('#bulkBtn'); await p.waitForTimeout(200);
  await p.fill('.brow[data-i="0"] [data-f=name]','Stu A'); await p.fill('.brow[data-i="1"] [data-f=name]','Stu B');
  await p.selectOption('.brow[data-i="0"] [data-f=offer]','student'); await p.selectOption('.brow[data-i="1"] [data-f=offer]','student'); await p.selectOption('.brow[data-i="1"] [data-f=min]','30');
  ok('row note flags the invalid 30-minute row', /Not valid/.test(await h.txt('.brow[data-i="1"] [data-offnote]')));
  await p.click('#bulkGo'); await p.waitForTimeout(250); ok('start blocked with a clear message', /Participant 2/.test(await h.toast()), await h.toast());
  await p.selectOption('.brow[data-i="1"] [data-f=min]','60');
  ok('each row bill 400 and ID box shown', (await h.txt('.brow[data-i="0"] [data-due]'))==='₹400'&&await h.vis('#bIdWrap'));
  await p.click('#bulkGo'); await p.waitForTimeout(250); ok('needs the ID tick', /ID cards/.test(await h.toast()));
  await p.check('#bIdSeen'); await p.click('#bulkGo'); await p.waitForTimeout(600);
  ok('both bills saved with the offer', (await p.evaluate(()=>window.__db.billing.filter(b=>b.offer==='Student offer'&&b.discount===50).length))===2);
});

await section('Settings editors',async(h,p)=>{
  await h.login('ufih.bg@gmail.com'); await p.click('[data-tab=settings]'); await p.waitForTimeout(400);
  ok('student offer and 4 shortcuts are listed', (await p.locator('#offerEditor .offercard').count())===1&&(await p.locator('#draftEditor .draftrow').count())===4);
  await p.click('#offerAdd'); const n=await p.locator('#offerEditor .offercard').count(); let c=p.locator('#offerEditor .offercard').nth(n-1);
  await c.locator('[data-of=name]').fill('Weekend family'); await c.locator('[data-of=pct]').fill('15');
  for(const d of [1,2,3,4,5]){await p.locator('#offerEditor .offercard').nth(n-1).locator('[data-ofday="'+d+'"]').click()}
  for(const d of [6,0]){await p.locator('#offerEditor .offercard').nth(n-1).locator('[data-ofday="'+d+'"]').click()}
  await p.click('#offerSave'); await p.waitForTimeout(400);
  const saved=await p.evaluate(()=>window.__db.app_pricing.find(r=>r.id==='offers').data.offers); ok('new weekend offer saved (Sat, Sun, 15%)', saved.length===2&&saved[1].pct===15&&saved[1].days.join()==='0,6', JSON.stringify(saved[1]));
  await p.locator('#offerEditor .offercard').nth(n-1).locator('[data-of=name]').fill(''); await p.click('#offerSave'); await p.waitForTimeout(200); ok('empty offer name is refused', /name/.test(await h.toast()));
  await p.locator('#offerEditor .offercard').nth(n-1).locator('[data-of=name]').fill('Weekend family');
  await p.locator('#offerEditor .offercard').nth(0).locator('[data-of=active]').uncheck(); await p.click('#offerSave'); await p.waitForTimeout(300);
  await p.locator('#draftEditor .draftrow').nth(0).locator('[data-df=socks]').selectOption('L'); await p.locator('#draftEditor .draftrow').nth(3).locator('[data-dfdel]').click(); await p.click('#draftSave'); await p.waitForTimeout(300);
  await p.fill('#sPhone','98480 11111'); await p.fill('#sGst','37ABCDE1234F1Z5'); await p.click('#bizSave'); await p.waitForTimeout(300);
  await p.fill('#sName','Unlimited Fun Is Here'); await p.click('#saveSet'); await p.waitForTimeout(400);
  const st=await p.evaluate(()=>window.__db.app_settings.find(r=>r.id==='main').data); ok('main Save keeps the business details', st.bizPhone==='98480 11111'&&st.bizGst==='37ABCDE1234F1Z5'&&!!st.bizAddress&&!!st.waText);
  await h.logout(); await h.login('staff@test.com');
  ok('staff sees 3 shortcuts with socks L', (await p.locator('#quickBar [data-q]').count())===3&&/Socks L/.test(await h.txt('#quickBar')));
  await p.click('#newBtn'); ok('staff offer list: student switched off, weekend on', (await p.locator('[data-k=offer]').allTextContents()).join('/')==='No offer/Weekend family');
});

await section('Invoices and wristband slips',async(h,p)=>{
  await h.login('staff@test.com');
  await p.evaluate(()=>{window.__prints=[];window.print=()=>{window.__prints.push(document.getElementById('printArea').innerHTML)}});
  const mk=async(name,socks,pay,offer)=>{await p.click('#newBtn');await p.fill('#eName',name);await p.click('[data-k=socks][data-v="'+socks+'"]');if(pay)await p.click('[data-k=pay][data-v='+pay+']');if(offer){await p.click('[data-k=offer][data-v=student]');await p.check('#eIdSeen')}await p.click('#eGo');await p.waitForTimeout(450)};
  await mk('Ravi Kumar','M','cash',false); await mk('Sneha Reddy','L','upi',true); await mk('Tarun','No socks','pending',false);
  await p.click('#guests .guest:first-child [data-act=slip]'); await p.waitForTimeout(300);
  ok('Slip button on a card prints one wristband slip', (await p.evaluate(()=>window.__prints.length))===1&&/class="slip"/.test(await p.evaluate(()=>window.__prints[0]))&&/(Ravi Kumar|Sneha Reddy|Tarun)/.test(await p.evaluate(()=>window.__prints[0])));
  await p.click('[data-tab=history]'); await p.waitForTimeout(300);
  ok('staff can tick participants but has no invoice button', (await p.locator('#rBody .selrow').count())===3&&!(await h.vis('#invBtn')));
  await p.locator('#rBody .selrow').nth(0).check(); await p.locator('#rBody .selrow').nth(1).check(); ok('selection bar counts 2', /2 selected/.test(await h.txt('#selBar')));
  await p.click('#slipBtn'); await p.waitForTimeout(250); ok('staff prints 2 slips', ((await p.evaluate(()=>window.__prints[1])).match(/class="slip"/g)||[]).length===2);
  await h.logout(); await h.login('ufih.bg@gmail.com'); await p.click('[data-tab=history]'); await p.waitForTimeout(300);
  await p.click('#selAll'); await p.locator('#rBody .selrow').nth(2).uncheck(); ok('admin select all then untick one -> 2 selected', /2 selected/.test(await h.txt('#selCount')));
  await p.click('#invBtn'); await p.waitForTimeout(300);
  const inv=await p.evaluate(()=>window.__prints[window.__prints.length-1]),t=inv.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
  ok('exactly the 2 ticked participants get an invoice', (inv.match(/class="inv"/g)||[]).length===2);
  ok('invoice has business name, address and the lines', /Unlimited Fun Is Here/.test(t)&&/Kovvada/.test(t)&&/Play time/.test(t)&&/Socks/.test(t)&&/Student offer/.test(t)&&/Total/.test(t)&&/PAID/.test(t), t.slice(0,300));
  ok('invoice numbers follow date and ticket', /INV-20261103-00\d/.test(t));
});

await section('Regression of earlier features',async(h,p)=>{
  const fact=n=>h.txt('#guests .guest:has-text("'+n+'") .fact[class*=pay-]');
  await h.login('staff@test.com');
  await p.click('#newBtn'); await p.fill('#eName','PartSingle'); await p.click('[data-k=pay][data-v=part]'); await p.fill('#ePartCash','300'); await p.fill('#ePartUpi','100'); await p.dispatchEvent('#ePartUpi','input'); await p.click('#eGo'); await p.waitForTimeout(500);
  ok('single part payment 300+100 on 450 leaves 50', (await fact('PartSingle')).includes('Due ₹50'), await fact('PartSingle'));
  await p.click('#newBtn'); await p.fill('#eName','Disc10'); await p.click('[data-k=disc][data-v="10"]'); await p.click('[data-k=pay][data-v=cash]'); await p.click('#eGo'); await p.waitForTimeout(500);
  ok('staff 10% discount at check-in', (await p.evaluate(()=>window.__db.billing.find(b=>b.disc_val===10&&b.discount===25&&b.total===425)))!=null);
  await p.click('#bulkBtn'); await p.waitForTimeout(200); for(const [i,n] of [[0,'B1'],[1,'B2'],[2,'B3']]) await p.fill('.brow[data-i="'+i+'"] [data-f=name]',n);
  await p.click('[data-bpay=part]'); await p.fill('#bpCash','700'); await p.fill('#bpUpi','500'); await p.dispatchEvent('#bpUpi','input'); await p.click('#bulkGo'); await p.waitForTimeout(700);
  ok('bulk part payment: B1, B2 paid; B3 owes 150', (await fact('B1'))==='Paid'&&(await fact('B2'))==='Paid'&&(await fact('B3')).includes('Due ₹150'));
  await p.click('#guests .guest:has-text("B3") [data-act=pay]'); await p.click('[data-pp=part]'); await p.fill('#pPartUpi','150'); await p.dispatchEvent('#pPartUpi','input'); await p.click('#pOk'); await p.waitForTimeout(500);
  ok('Payment screen part payment settles B3', (await fact('B3'))==='Paid');
  await p.click('#guests .guest:has-text("PartSingle") [data-act=pay]'); await p.click('[data-pd="20"]'); await p.click('#pOk'); await p.waitForTimeout(500);
  ok('staff changes a discount later (server recalculates to 400)', (await p.evaluate(()=>window.__db.billing.find(b=>b.disc_val===20&&b.total===400)))!=null);
  await h.logout(); await h.login('ufih.bg@gmail.com'); await p.click('[data-tab=settings]'); await p.waitForTimeout(300);
  await p.fill('input[data-a="trampoline"][data-c="Basic"][data-m="60"]','300'); await p.click('#saveSet'); await p.waitForTimeout(600);
  ok('price history has the original and the new version', (await p.locator('#priceHistory .line').count())===2);
  const v0=await p.evaluate(()=>window.__db.app_pricing.find(r=>r.id==='v_0').data.play.trampoline.Basic[60]); ok('original prices version kept the OLD price (250)', v0===250, String(v0));
  await p.click('[data-tab=dash]'); await p.waitForTimeout(300);
  await p.click('#guests .guest:has-text("Disc10") [data-act=extend]'); await p.waitForTimeout(200); ok('extra time on an old entry uses the old rate (125)', (await p.inputValue('#xPrice'))==='125', await p.inputValue('#xPrice')); await p.click('#xOk'); await p.waitForTimeout(400);
  await p.click('#newBtn'); await p.fill('#eName','NewPrice'); await p.click('#eGo'); await p.waitForTimeout(500);
  ok('new entry uses the new price', (await p.evaluate(()=>window.__db.billing.some(b=>b.play===300)))&&(await p.evaluate(()=>window.__db.billing.filter(b=>b.play===250).length))>=3);
  await p.click('#guests .guest:has-text("B1") [data-act=out]'); await p.click('#oOk'); await p.waitForTimeout(400); await p.click('[data-tab=completed]'); await p.waitForTimeout(300);
  await p.locator('#rBody tr:has-text("B1") [data-r=edit]').click(); await p.selectOption('#eeSock','M'); await p.click('#eeOk'); await p.waitForTimeout(500);
  const row=(await p.locator('#rBody tr:has-text("B1")').innerText()).replace(/\s+/g,' '); ok('editing socks after completion adds the old sock price and leaves it pending', /480/.test(row)&&/Pending/.test(row), row.slice(0,120));
  for(const tab of ['history','customers','stats','team','settings','dash','over','completed','cancelled']){await p.click('[data-tab='+tab+']');await p.waitForTimeout(150)}
  ok('every tab opens', true);
});

console.log('\n'+(bad?bad+' of '+total+' CHECKS FAILED':'ALL '+total+' CHECKS PASSED'));
process.exit(bad?1:0);
})();
