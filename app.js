const CONFIG = {
ownerEmail: 'ufih.bg@gmail.com',
supabaseUrl: 'https://fpauxupyuoqexmneermg.supabase.co',
supabaseKey: 'sb_publishable_Vd1yGuHcbdWXSQ7JgGohQg_DDD2VOA-'
};
let demoExtra=()=>'';let demoWire=()=>{};let demoBanner=()=>{};
const LOGO='data:image/webp;base64,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';
const $=(s,el)=>(el||document).querySelector(s);
const $$=(s,el)=>Array.prototype.slice.call((el||document).querySelectorAll(s));
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const clean=o=>JSON.parse(JSON.stringify(o));
const lsGet=k=>{try{return localStorage.getItem(k)}catch(e){return null}};
const lsSet=(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}};
const lsDel=k=>{try{localStorage.removeItem(k)}catch(e){}};
const AREAS={trampoline:{label:'Trampoline'},softplay:{label:'Soft play'}};
const AREA_KEYS=['trampoline','softplay'];
const DURS=[{min:30,label:'30 min'},{min:60,label:'1 hour'},{min:120,label:'2 hours'}];
const CARDS=['Basic','Premium'];
const SOCKS=['S','M','L','No socks'];
const SOCK_SIZES=['S','M','L'];
const REASONS=['Customer left early','Entered by mistake','Payment issue','Duplicate entry','Other'];
const ADMIN_TABS=['customers','stats','team','settings'];
const REC_TABS={completed:'completed',cancelled:'cancelled',history:null};
const TITLES={completed:'Completed customers',cancelled:'Cancelled customers',history:'History: all check-ins'};
const DEFAULTS={name:'Unlimited Fun Is Here',currency:'\u20B9',remindEvery:2,warnMin:5,
sockPrices:{S:30,M:30,L:30},cardPrices:{Basic:200,Premium:500},
play:{trampoline:{same:true,Basic:{30:150,60:250,120:450},Premium:{30:150,60:250,120:450}},
softplay:{same:false,Basic:{30:100,60:180,120:320},Premium:{30:80,60:150,120:280}}}};
let B=null;                       // backend
let me=null;                      // {email,name,role} or null = public viewer
let appReady=false;
let sPub=null,sPrice=null;
let settings=mergeSettings(null);
let sessions=[],billing={},contacts={},staffList=[],pstat={};
let recovering=false;
let loaded=false,tab='dash',entry=null,lastArea='trampoline',bulk=[];
let remindAt={},muted={},lastAlertKey='',lastOverSig='';
let soundOn=true,audio=null;
let unsubs=[],unsubG=null,unsubB=null,unsubC=null,unsubP=null;
let loadDays=30;
const banners={};
const freshF=()=>({q:'',range:'today',from:'',to:'',area:'all',ctype:'all',card:'all',socks:'all',bday:'all',pay:'all',pstat:'all',status:'all'});
const FS={dash:freshF(),completed:freshF(),cancelled:freshF(),history:freshF(),stats:freshF()};
const isAdmin=()=>!!me&&me.role==='admin';
const isStaffUp=()=>!!me;
function mergeSettings(d){
const s=JSON.parse(JSON.stringify(DEFAULTS));if(!d)return s;
['name','currency'].forEach(k=>{if(typeof d[k]==='string'&&d[k])s[k]=d[k]});
['remindEvery','warnMin'].forEach(k=>{if(typeof d[k]==='number')s[k]=d[k]});
SOCK_SIZES.forEach(k=>{if(d.sockPrices&&typeof d.sockPrices[k]==='number')s.sockPrices[k]=d.sockPrices[k]});
CARDS.forEach(k=>{if(d.cardPrices&&typeof d.cardPrices[k]==='number')s.cardPrices[k]=d.cardPrices[k]});
AREA_KEYS.forEach(a=>{
const src=d.play&&d.play[a];if(!src)return;
if(typeof src.same==='boolean')s.play[a].same=src.same;
CARDS.forEach(c=>DURS.forEach(du=>{const v=src[c]&&src[c][du.min];if(typeof v==='number')s.play[a][c][du.min]=v}));
});
return s;
}
function norm(s){
s.players=s.players||1;s.socks=s.socks||'No socks';s.card=s.card||'Basic';s.ctype=s.ctype||'existing';
s.bday=!!s.bday;s.extensions=s.extensions||[];
s.area=AREAS[s.area]?s.area:'trampoline';s.name=s.name||'Guest';return s;
}
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6);
const endOf=s=>s.startAt+s.durationMin*60000;
const money=n=>settings.currency+Number(n||0).toLocaleString('en-IN',{maximumFractionDigits:2});
const clockStr=ms=>new Date(ms).toLocaleTimeString([], {hour:'numeric',minute:'2-digit'});
const dateStr=ms=>new Date(ms).toLocaleDateString([], {day:'numeric',month:'short'});
const startOfDay=ms=>{const d=new Date(ms);d.setHours(0,0,0,0);return d.getTime()};
const ticketStr=n=>'#'+String(n||0).padStart(3,'0');
const getS=id=>sessions.find(x=>x.id===id);
const sum=(a,f)=>a.reduce((n,s)=>n+f(s),0);
const num=v=>Math.max(0,Number(v)||0);
function fmtHMS(sec){sec=Math.abs(sec);const h=Math.floor(sec/3600),m=Math.floor(sec%3600/60),s=sec%60;const mm=String(m).padStart(2,'0'),ss=String(s).padStart(2,'0');return h?h+':'+mm+':'+ss:mm+':'+ss}
function fmtMin(min){min=Math.round(min);if(min<60)return min+' min';const h=Math.floor(min/60),m=min%60;return m?h+'h '+m+'m':h+(h===1?' hour':' hours')}
function toast(msg,bad){const t=document.createElement('div');t.className='toast'+(bad?' bad':'');t.textContent=msg;$('#toasts').appendChild(t);setTimeout(()=>t.remove(),bad?6000:3200)}
const isOver=(s,now)=>s.status==='active'&&endOf(s)<=(now||Date.now());
const bl=s=>billing[s.id]||{};
const dueOf=s=>{const b=bl(s);return (b.total||0)+(b.extTotal||0)+(b.adjust||0)};
const paidOf=s=>Math.min(dueOf(s),bl(s).paidAmount||0);          // amount received so far
const owedOf=s=>Math.max(0,dueOf(s)-paidOf(s));
const cashOf=s=>bl(s).cash||0, upiOf=s=>bl(s).upi||0, cardOf=s=>bl(s).cardAmt||0;
const methodOf=s=>{const p=[];if(cashOf(s)>0)p.push('Cash');if(upiOf(s)>0)p.push('UPI');if(cardOf(s)>0)p.push('Card');if(!p.length&&paidOf(s)>0)p.push('Not recorded');return p.join(' + ')};
const PAYCHIP={pending:'Pending',cash:'Paid by Cash',upi:'Paid by UPI'};                  // amount still due
const discOf=s=>bl(s).discount||0;
const statusOf=(bill,rec)=>bill<=0?'paid':rec>=bill?'paid':rec<=0?'pending':'partial';
const STATUS_LABEL={pending:'Pending',partial:'Pending',paid:'Paid'};
function payInfo(s){
if(isAdmin()){if(!billing[s.id])return null;const bill=dueOf(s),rec=paidOf(s);return {bill,rec,due:Math.max(0,bill-rec),status:statusOf(bill,rec)}}
if(me){const p=pstat[s.id];return p?{bill:p.due,rec:null,due:Math.max(0,p.balance),status:p.status}:null}
return null;
}
const phoneOf=s=>contacts[s.id]||'';
const sinceMs=()=>loadDays>0?startOfDay(Date.now())-(loadDays-1)*86400000:0;
function toLocalInput(ms){const d=new Date(ms),p=n=>String(n).padStart(2,'0');return d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate())+'T'+p(d.getHours())+':'+p(d.getMinutes())}
function setBanner(k,msg){banners[k]=msg||'';const m=Object.keys(banners).map(x=>banners[x]).filter(Boolean)[0];const b=$('#banner');b.textContent=m||'';b.hidden=!m}
function writeErr(e){
const c=e&&e.code||'';
toast(c==='permission-denied'?'You do not have permission to do that.':'Could not save'+(c?' ('+c+')':'')+'. Check the connection.',true);
}
const isOwnerEmail=e=>e===String(CONFIG.ownerEmail||'').toLowerCase()||(typeof demoOwner==='string'&&e===demoOwner);
function playFee(area,card,min){
const p=settings.play[area],t=(p.same||card==='Basic')?p.Basic:p.Premium;
if(t[min]!=null)return t[min];
return Math.round((t[60]||0)/60*min/5)*5;
}
function calcBill(e,min,dc){
const n=e.players,fee=playFee(e.area,e.card,min);
const freeN=(e.card==='Premium'&&e.bday)?1:0;
const play=fee*Math.max(0,n-freeN);
const sockUnit=e.socks!=='No socks'?(settings.sockPrices[e.socks]||0):0,sock=sockUnit*n;
const cardFee=e.ctype==='new'?(settings.cardPrices[e.card]||0):0;
let disc=0;   // discounts apply to play time only (never to socks or the card price)
if(dc.t==='pct')disc=Math.round(play*Math.min(100,Math.max(0,dc.v))/100);
else if(dc.t==='amt')disc=Math.min(play,Math.max(0,Math.round(dc.v)));
return {n,fee,freeN,play,sockUnit,sock,card:cardFee,discount:disc,total:play-disc+sock+cardFee};
}
const extPrice=(s,min)=>Math.round((playFee(s.area,s.card,60)||0)/60*min/5)*5*(s.players||1);
async function makeSupabaseBackend(cfg,hooks,modOverride){
const mod=modOverride||await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
const client=mod.createClient(cfg.url,cfg.key,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
const ok=async p=>{
const r=await p;
if(r.error){const e=new Error(r.error.message);const c=String(r.error.code||'');
e.code=(c==='42501'||/permission denied|row-level security/i.test(r.error.message))?'permission-denied':(c||r.error.message);throw e}
return r.data;
};
const PAGE=1000;
async function fetchAll(make){
let all=[],from=0;
for(;;){const rows=await ok(make().range(from,from+PAGE-1));all=all.concat(rows||[]);if(!rows||rows.length<PAGE)break;from+=PAGE}
return all;
}
const GMAP={baseMin:'base_min',durationMin:'duration_min',startAt:'start_at',endedAt:'ended_at',cancelledAt:'cancelled_at',cancelReason:'cancel_reason',by:'by_name',outBy:'out_by',editedBy:'edited_by',editedAt:'edited_at'};
const GREV={};Object.keys(GMAP).forEach(k=>{GREV[GMAP[k]]=k});
const toRowG=o=>{const r={};Object.keys(o).forEach(k=>{if(o[k]!==undefined)r[GMAP[k]||k]=o[k]});return r};
const fromRowG=r=>{
const o={};Object.keys(r).forEach(k=>{o[GREV[k]||k]=r[k]});
['ticket','players','baseMin','durationMin','startAt','endedAt','cancelledAt','editedAt'].forEach(k=>{if(o[k]!=null)o[k]=Number(o[k])});
return o;
};
const BMAP={startAt:'start_at',discType:'disc_type',discVal:'disc_val',paidAmount:'paid_amount',cardAmt:'card_amt',paidAt:'paid_at',paidBy:'paid_by',extTotal:'ext_total',extList:'ext_list'};
const toBill=o=>{const r={};Object.keys(o).forEach(k=>{if(o[k]!==undefined)r[BMAP[k]||k]=o[k]});return r};
const fromBill=r=>({startAt:Number(r.start_at),play:Number(r.play),socks:Number(r.socks),card:Number(r.card),discount:Number(r.discount),discType:r.disc_type,discVal:Number(r.disc_val),
total:Number(r.total),extTotal:Number(r.ext_total),adjust:Number(r.adjust),paidAmount:Number(r.paid_amount),cash:Number(r.cash),upi:Number(r.upi),cardAmt:Number(r.card_amt),paidAt:r.paid_at,paidBy:r.paid_by,extList:r.ext_list||[]});
const fromStaff=r=>({name:r.name,email:r.email,role:r.role,active:r.active,createdAt:Number(r.created_at)});
function live(table,pk,loadRows,toKV,emit,err){
const store=new Map();let alive=true,pend=null,first=true,hiddenAt=0;
const flush=()=>{pend=null;if(alive)emit(store)};
const sched=()=>{if(!pend)pend=setTimeout(flush,60)};
const reload=async()=>{
try{const rows=await loadRows();if(!alive)return;store.clear();rows.forEach(r=>{const kv=toKV(r);store.set(kv[0],kv[1])});flush()}
catch(e){if(err)err(e)}
};
const ch=client.channel('rt_'+table+'_'+Math.random().toString(36).slice(2))
.on('postgres_changes',{event:'*',schema:'public',table},p=>{
if(p.eventType==='DELETE'){const id=p.old&&p.old[pk];if(id!=null)store.delete(id)}
else if(p.new){const kv=toKV(p.new);store.set(kv[0],kv[1])}
sched();
})
.subscribe(status=>{if(status==='SUBSCRIBED'){if(first)first=false;else reload()}});
reload();
const slow=setInterval(reload,10*60*1000);
const vis=()=>{if(document.visibilityState==='hidden')hiddenAt=Date.now();else if(hiddenAt&&Date.now()-hiddenAt>120000){hiddenAt=0;reload()}};
const onl=()=>reload();
document.addEventListener('visibilitychange',vis);window.addEventListener('online',onl);
return()=>{alive=false;clearInterval(slow);clearTimeout(pend);document.removeEventListener('visibilitychange',vis);window.removeEventListener('online',onl);try{client.removeChannel(ch)}catch(e){}};
}
const liveOne=(table,cb,err)=>live(table,'id',async()=>await ok(client.from(table).select('id,data').eq('id','main')),r=>[r.id,r.data],st=>cb(st.get('main')||null),err);
let lastKey='__init__';
const userObj=u=>u&&u.email?{email:u.email.toLowerCase(),uid:u.id}:null;
return {
kind:'supabase',
onAuth(cb){
const fire=u=>{const k=u?u.uid:'';if(k===lastKey)return;lastKey=k;cb(u)};
client.auth.getSession().then(r=>fire(userObj(r.data&&r.data.session&&r.data.session.user)));
const r=client.auth.onAuthStateChange((evt,session)=>{
if(evt==='PASSWORD_RECOVERY'){if(hooks&&hooks.recovery)hooks.recovery();return}
if(evt==='INITIAL_SESSION'||evt==='TOKEN_REFRESHED'||evt==='USER_UPDATED')return;
fire(userObj(session&&session.user));
});
return()=>{try{r.data.subscription.unsubscribe()}catch(e){}};
},
async signIn(email,password){
const r=await client.auth.signInWithPassword({email,password});
if(r.error){const e=new Error(r.error.message);e.code=r.error.code||r.error.message;throw e}
},
async signOut(){await client.auth.signOut()},
async resetPassword(email){
const r=await client.auth.resetPasswordForEmail(email,{redirectTo:location.origin+location.pathname});
if(r.error){const e=new Error(r.error.message);e.code=r.error.code||r.error.message;throw e}
},
async signUpOwner(email,password){
const r=await client.auth.signUp({email,password});
if(r.error){const e=new Error(r.error.message);e.code=r.error.code||r.error.message;throw e}
return {needsConfirm:!(r.data&&r.data.session)};
},
async updatePassword(pw){
const r=await client.auth.updateUser({password:pw});
if(r.error){const e=new Error(r.error.message);e.code=r.error.code||r.error.message;throw e}
},
async getStaffDoc(email){
const r=await ok(client.from('staff').select('*').eq('email',email).maybeSingle());
return r?fromStaff(r):null;
},
async saveStaff(email,obj){
const row={email};
if(obj.name!==undefined)row.name=obj.name;
if(obj.role!==undefined)row.role=obj.role;
if(obj.active!==undefined)row.active=obj.active;
if(obj.createdAt!==undefined)row.created_at=obj.createdAt;
await ok(client.from('staff').upsert(row,{onConflict:'email'}));
},
async createAuthUser(email,password){
const c=mod.createClient(cfg.url,cfg.key,{auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false,storageKey:'ufh-secondary'}});
const r=await c.auth.signUp({email,password});
if(r.error){
const e=new Error(r.error.message);
e.code=(r.error.code==='user_already_exists'||/already registered/i.test(r.error.message))?'auth/email-already-in-use':(r.error.code==='weak_password'?'auth/weak-password':(r.error.code||r.error.message));
throw e;
}
if(r.data&&r.data.user&&Array.isArray(r.data.user.identities)&&r.data.user.identities.length===0){const e=new Error('exists');e.code='auth/email-already-in-use';throw e}
return {needsConfirm:!(r.data&&r.data.session)};
},
subSettings:(cb,err)=>liveOne('app_settings',cb,err),
subPricing:(cb,err)=>liveOne('app_pricing',cb,err),
subStaff:(cb,err)=>live('staff','email',()=>fetchAll(()=>client.from('staff').select('*').order('email')),r=>[r.email,fromStaff(r)],st=>cb(Array.from(st.values())),err),
subGuests:(since,cb,err)=>live('guests','id',()=>fetchAll(()=>client.from('guests').select('*').gte('start_at',since||0).order('start_at',{ascending:false}).order('id')),
r=>[r.id,fromRowG(r)],st=>cb(Array.from(st.values())),err),
subContacts:(since,cb,err)=>live('contacts','id',()=>fetchAll(()=>client.from('contacts').select('id,phone').gte('start_at',since||0).order('id')),
r=>[r.id,r.phone||''],st=>cb(Object.fromEntries(st)),err),
subPayStatus:(since,cb,err)=>live('payment_status','id',()=>fetchAll(()=>client.from('payment_status').select('*').gte('start_at',since||0).order('id')),
r=>[r.id,{due:Number(r.due),balance:Number(r.balance),status:r.status}],st=>cb(Object.fromEntries(st)),err),
setPaid:async(id,paid,by,method)=>{await ok(client.rpc('billing_set_paid',{p_id:id,p_paid:!!paid,p_by:by||'',p_method:method||'cash'}))},
subBilling:(since,cb,err)=>live('billing','id',()=>fetchAll(()=>client.from('billing').select('*').gte('start_at',since||0).order('id')),
r=>[r.id,fromBill(r)],st=>cb(Object.fromEntries(st)),err),
createGuest:async s=>{await ok(client.from('guests').insert(toRowG(s)))},
async patchGuest(id,fields,ops){
if(ops&&ops.inc&&ops.inc.durationMin){
const x=(ops.union&&ops.union.extensions)||{};
await ok(client.rpc('guest_add_time',{p_id:id,p_min:ops.inc.durationMin,p_by:x.by||'',p_at:x.at||Date.now()}));
return;
}
const row=toRowG(fields||{});
if(Object.keys(row).length)await ok(client.from('guests').update(row).eq('id',id));
},
deleteGuest:async id=>{await ok(client.from('guests').delete().eq('id',id))},
saveSettings:async o=>{await ok(client.from('app_settings').upsert({id:'main',data:o},{onConflict:'id'}))},
savePricing:async o=>{await ok(client.from('app_pricing').upsert({id:'main',data:o},{onConflict:'id'}))},
async saveContact(id,o){
const row={id};
if(o.phone!==undefined)row.phone=o.phone;
if(o.startAt!==undefined)row.start_at=o.startAt;
await ok(client.from('contacts').upsert(row,{onConflict:'id'}));
},
createBilling:async(id,o)=>{
await ok(client.rpc('billing_create',{p:{id,start_at:o.startAt,play:o.play,socks:o.socks,card:o.card,discount:o.discount,disc_type:o.discType,disc_val:o.discVal,total:o.total,paid:!!o.paid,pay_method:o.payMethod||'cash',paid_by:o.paidBy}}));
},
setBilling:async(id,o)=>{await ok(client.from('billing').upsert(Object.assign({id},toBill(o)),{onConflict:'id'}))},
addExtBilling:async(id,price,min)=>{await ok(client.rpc('billing_add_ext',{p_id:id,p_price:price,p_min:min}))},
deleteBilling:async id=>{await ok(client.from('billing').delete().eq('id',id))},
deleteContact:async id=>{await ok(client.from('contacts').delete().eq('id',id))}
};
}
const configured=()=>!!(CONFIG.supabaseUrl&&CONFIG.supabaseKey&&CONFIG.ownerEmail);
function showGate(html){$('#app').hidden=true;$('#gate').hidden=false;$('#gateBody').innerHTML=html}
function hideGate(){$('#gate').hidden=true;$('#app').hidden=false}
function gateSetup(){
showGate(`<p>Setup needed</p><ol><li>Open <code>index.html</code> and fill in the <b>CONFIG</b> block at the top of the script with your Supabase address and public key.</li><li>Upload the file again to GitHub. Vercel updates the site by itself.</li></ol>`);
}
function gateOwner(){
showGate(`<p>Create the owner account for ${esc(CONFIG.ownerEmail)}</p>
<form id="owForm" class="stack"><label class="field"><span>Choose a password (at least 6 characters)</span><input id="owPass" type="password" minlength="6" autocomplete="new-password" required></label>
<p class="gate-err" id="owErr"></p><button class="btn primary big block" id="owGo">Create account</button></form>
<div style="text-align:center;margin-top:8px"><button class="linkbtn" id="owBack">Back to sign in</button></div>`);
$('#owBack').onclick=()=>gateLogin();
$('#owForm').addEventListener('submit',async e=>{
e.preventDefault();$('#owGo').disabled=true;$('#owErr').style.color='var(--over)';
try{
const r=await B.signUpOwner(CONFIG.ownerEmail,$('#owPass').value);
if(r&&r.needsConfirm){$('#owErr').style.color='var(--ok)';$('#owErr').textContent='Almost done. Open the email sent to '+CONFIG.ownerEmail+', click the confirmation link, then come back and sign in. (If you already created this account, just sign in.)'}
}catch(er){$('#owErr').textContent='Could not create the account ('+((er&&er.code)||'error')+').';$('#owGo').disabled=false}
});
}
function gateRecovery(){
showGate(`<p>Choose a new password</p><form id="rcForm" class="stack"><label class="field"><span>New password (at least 6 characters)</span><input id="rcPass" type="password" autocomplete="new-password" minlength="6" required></label><p class="gate-err" id="rcErr"></p><button class="btn primary big block" id="rcGo">Save password</button></form>`);
$('#rcForm').addEventListener('submit',async e=>{
e.preventDefault();$('#rcGo').disabled=true;
try{await B.updatePassword($('#rcPass').value);toast('Password saved. Please sign in.');setTimeout(()=>{history.replaceState(null,'',location.pathname);location.reload()},900)}
catch(er){$('#rcErr').textContent='Could not save the password ('+((er&&er.code)||'error')+'). Try the reset email again.';$('#rcGo').disabled=false}
});
}
function gateLogin(note){
showGate(`<p>${esc(note||'Staff sign in')}</p>
<form id="lgForm" autocomplete="on" class="stack">
<label class="field"><span>Email</span><input id="lgEmail" type="email" autocomplete="username" required></label>
<label class="field"><span>Password</span><input id="lgPass" type="password" autocomplete="current-password" required></label>
<p class="gate-err" id="lgErr"></p>
<button class="btn primary big block" id="lgGo">Sign in</button>
</form>
<div style="text-align:center;margin-top:8px"><button class="linkbtn" id="lgForgot">Forgot password?</button> <button class="linkbtn" id="lgBack">Back to public view</button></div>
<div style="text-align:center"><button class="linkbtn" id="lgOwner" style="font-size:13px;color:var(--muted)">First time? Create the owner account</button></div>
${demoExtra()}`);
const go=async(email,pw)=>{
$('#lgErr').textContent='';$('#lgGo').disabled=true;
try{await B.signIn(email.trim().toLowerCase(),pw)}
catch(e){
const c=e&&e.code||'';
$('#lgErr').textContent=/invalid|wrong-password|user-not-found/.test(c)?'Wrong email or password.':c==='email_not_confirmed'?'This email is not confirmed yet. Check your inbox for the confirmation email.':/too-many|rate_limit/.test(c)?'Too many tries. Wait a few minutes and try again.':/network|fetch/i.test(c+(e&&e.message))?'No internet connection.':'Could not sign in ('+(c||'error')+').';
$('#lgGo').disabled=false;
}
};
$('#lgForm').addEventListener('submit',e=>{e.preventDefault();go($('#lgEmail').value,$('#lgPass').value)});
$('#lgBack').onclick=hideGate;
$('#lgOwner').onclick=gateOwner;
$('#lgForgot').onclick=async()=>{
const em=$('#lgEmail').value.trim().toLowerCase();
if(!em){$('#lgErr').textContent='Type your email above first.';return}
try{await B.resetPassword(em);$('#lgErr').style.color='var(--ok)';$('#lgErr').textContent='If this email is registered, a reset link is on its way.'}
catch(e){$('#lgErr').textContent='Could not send the reset email.'}
};
demoWire(go);
}
function gateBlocked(msg){
showGate(`<p>${esc(msg)}</p><button class="btn ghost block" id="gbOut">Sign out</button>`);
$('#gbOut').onclick=()=>B.signOut();
}
async function onAuthChange(u){
if(recovering)return;
stopSubs();me=null;
if(!u){enterApp();return}
showGate('<p>Checking your access...</p>');
try{
let doc=await B.getStaffDoc(u.email);
if(!doc&&isOwnerEmail(u.email)){
doc={name:'Owner',email:u.email,role:'admin',active:true,createdAt:Date.now()};
await B.saveStaff(u.email,doc);
}
if(!doc){gateBlocked('This account has not been added yet. Ask your admin to add your email under Staff & access.');return}
if(doc.active===false){gateBlocked('This account has been switched off. Please contact your admin.');return}
me={email:u.email,name:doc.name||u.email,role:doc.role==='admin'?'admin':'staff'};
}catch(e){
gateBlocked(e&&e.code==='permission-denied'?'The database refused access. The database setup may not have been applied to this project.':'Could not check your access. Check the internet connection and reload.');
return;
}
enterApp();
}
function enterApp(){
hideGate();appReady=true;
document.body.classList.toggle('admin',isAdmin());
document.body.classList.toggle('public',!me);
$('#userChip').hidden=!me;$('#loginBtn').hidden=!!me;
if(me){$('#userName').textContent=me.name;$('#userRole').textContent=isAdmin()?'ADMIN':'STAFF'}
Object.assign(FS,{dash:freshF(),completed:freshF(),cancelled:freshF(),history:freshF(),stats:freshF()});
loadDays=Number(lsGet(me?'ufh4_win':'ufh4_win_pub')||0)||(me?30:7);
if(B.kind==='demo')demoBanner();
loaded=false;sessions=[];billing={};contacts={};pstat={};
startSubs();switchTab(ADMIN_TABS.includes(tab)?'dash':tab);
}
$('#signOutBtn').addEventListener('click',()=>B.signOut());
$('#pwBtn').addEventListener('click',()=>{
openDlg(`<h2>Change my password</h2><label class="field"><span>New password (at least 6 characters)</span><input id="npw" type="password" autocomplete="new-password" minlength="6"></label>
<div class="dlg-actions"><button class="btn ghost" id="npNo">Cancel</button><button class="btn primary" id="npOk">Save password</button></div>`);
$('#npNo').onclick=closeDlg;
$('#npOk').onclick=async()=>{
const p=$('#npw').value;if(p.length<6){toast('Use at least 6 characters.',true);return}
try{await B.updatePassword(p);closeDlg();toast('Password changed.')}catch(e){toast('Could not change the password ('+((e&&e.code)||'error')+').',true)}
};
});
$('#loginBtn').addEventListener('click',()=>gateLogin());
function subErr(e){
const c=e&&e.code||'';
if(c==='permission-denied'){setBanner('perm','The database refused a request. Make sure the latest database setup (SQL) has been applied.');return}
toast('Live connection problem'+(c?' ('+c+')':'')+'.',true);
}
function stopSubs(){
unsubs.forEach(f=>{try{f()}catch(e){}});unsubs=[];
[unsubG,unsubB,unsubC,unsubP].forEach(f=>{if(f){try{f()}catch(e){}}});unsubG=unsubB=unsubC=unsubP=null;
}
function rebuildSettings(){settings=mergeSettings(Object.assign({},sPub||{},sPrice||{}));applySettings();if(tab!=='settings')renderAll()}
function startGuestSubs(){
[unsubG,unsubB,unsubC,unsubP].forEach(f=>{if(f){try{f()}catch(e){}}});unsubG=unsubB=unsubC=unsubP=null;
unsubG=B.subGuests(sinceMs(),list=>{sessions=list.map(norm);loaded=true;setBanner('perm','');renderAll()},subErr);
if(me)unsubC=B.subContacts(sinceMs(),m=>{contacts=m;renderAll()},subErr);
if(isAdmin())unsubB=B.subBilling(sinceMs(),b=>{billing=b;renderAll()},subErr);
if(me&&!isAdmin())unsubP=B.subPayStatus(sinceMs(),m=>{pstat=m;renderAll()},subErr);
}
function startSubs(){
unsubs.push(B.subSettings(s=>{sPub=s;rebuildSettings()},subErr));
if(me)unsubs.push(B.subPricing(p=>{sPrice=p;rebuildSettings()},subErr));
if(isAdmin())unsubs.push(B.subStaff(l=>{staffList=l;if(tab==='team')renderTeam()},subErr));
startGuestSubs();
}
function setWindow(days){loadDays=days;lsSet(me?'ufh4_win':'ufh4_win_pub',String(days));loaded=false;sessions=[];billing={};contacts={};pstat={};startGuestSubs();renderAll()}
window.addEventListener('offline',()=>setBanner('net','You are offline. New entries are kept on this device and will sync when the internet returns.'));
window.addEventListener('online',()=>setBanner('net',''));
document.addEventListener('pointerdown',()=>{
if(!audio){try{audio=new (window.AudioContext||window.webkitAudioContext)()}catch(e){}}
if(audio&&audio.state==='suspended')audio.resume();
},{passive:true});
function beep(){
if(!soundOn||!audio||!me)return;
try{[0,0.3,0.6,1.0,1.3,1.6].forEach((d,i)=>{
const o=audio.createOscillator(),g=audio.createGain();o.type='square';o.frequency.value=i%2?660:880;
g.gain.setValueAtTime(0.0001,audio.currentTime+d);
g.gain.exponentialRampToValueAtTime(0.18,audio.currentTime+d+0.02);
g.gain.exponentialRampToValueAtTime(0.0001,audio.currentTime+d+0.22);
o.connect(g);g.connect(audio.destination);o.start(audio.currentTime+d);o.stop(audio.currentTime+d+0.24);
})}catch(e){}
}
function syncSound(){const b=$('#soundBtn');b.setAttribute('aria-pressed',String(soundOn));b.textContent=soundOn?'Sound on':'Sound off'}
$('#soundBtn').addEventListener('click',()=>{soundOn=!soundOn;lsSet('ufh4_sound',soundOn?'1':'0');syncSound();if(soundOn)beep()});
function syncNotifBtn(){$('#notifBtn').hidden=!(window.Notification&&Notification.permission==='default')}
$('#notifBtn').addEventListener('click',()=>{
try{Notification.requestPermission().then(p=>{syncNotifBtn();toast(p==='granted'?'Pop-up alerts enabled.':'Pop-up alerts were not allowed.',p!=='granted')})}catch(e){syncNotifBtn()}
});
function popup(s){
if(!me)return;
try{if(window.Notification&&Notification.permission==='granted')new Notification("Time's up: "+s.name,{body:AREAS[s.area].label+' \u00B7 '+s.players+' player'+(s.players>1?'s':'')+'. Mark out or add time.',tag:s.id})}catch(e){}
try{if(navigator.vibrate)navigator.vibrate([300,120,300,120,300])}catch(e){}
}
const overdueList=now=>sessions.filter(s=>isOver(s,now)).sort((a,b)=>endOf(a)-endOf(b));
function runReminders(now){
const list=overdueList(now);let fire=false,key='';
list.forEach(s=>{
const k=s.id+':'+endOf(s);key+=k+(muted[k]?'m':'')+'|';
if(!muted[k]&&(!remindAt[k]||now-remindAt[k]>=settings.remindEvery*60000)){remindAt[k]=now;fire=true;popup(s)}
});
if(fire)beep();
if(key!==lastAlertKey){lastAlertKey=key;
$('#alerts').innerHTML=list.map(s=>{
const k=s.id+':'+endOf(s);
return `<div class="alert" data-id="${esc(s.id)}"><div class="t"><b>Time\u2019s up: ${esc(s.name)}</b><span>${esc(AREAS[s.area].label)} \u00B7 ${s.players} player${s.players>1?'s':''} \u00B7 <i class="overtxt" data-end="${endOf(s)}"></i></span></div>
<div class="a-actions stf"><button class="btn primary" data-a="out" data-write>Mark out</button><button class="btn ghost" data-a="more" data-write>Add time</button>
<button class="btn ghost" data-a="mute"${muted[k]?' disabled':''}>${muted[k]?'Silenced':'Silence'}</button></div></div>`;
}).join('');
}
$$('#alerts .overtxt').forEach(el=>{const m=Math.floor((now-Number(el.dataset.end))/60000);el.textContent=m<1?'just now':'over by '+fmtMin(m)});
const base=$('#bizName').textContent+' \u00B7 Guest Tracker';
document.title=list.length&&Math.floor(now/1000)%2?'('+list.length+') Time\u2019s up!':base;
}
$('#alerts').addEventListener('click',e=>{
const b=e.target.closest('[data-a]');if(!b||!me)return;
const id=b.closest('.alert').dataset.id,s=getS(id);if(!s)return;
if(b.dataset.a==='out')openOut(id);else if(b.dataset.a==='more')openExtend(id);
else{muted[id+':'+endOf(s)]=1;lastAlertKey='';toast('Reminders silenced for '+s.name+'. They stay listed until marked out.')}
});
const FOPT={
range:['Date',[['today','Today'],['yesterday','Yesterday'],['7','Last 7 days'],['30','Last 30 days'],['month','This month'],['all','All loaded'],['custom','Custom dates']]],
area:['Play area',[['all','Both areas'],['trampoline','Trampoline'],['softplay','Soft play']]],
ctype:['Customer',[['all','New & existing'],['new','New'],['existing','Existing']]],
card:['Card',[['all','Any card'],['Basic','Basic'],['Premium','Premium']]],
socks:['Socks',[['all','Any socks'],['S','S'],['M','M'],['L','L'],['No socks','No socks']]],
bday:['Birthday free play',[['all','Any'],['yes','Yes'],['no','No']]],
pstat:['Payment',[['all','Any'],['pending','Pending'],['paid','Paid']]],
status:['Status',[['all','All'],['active','Playing'],['over','Time up'],['completed','Completed'],['cancelled','Cancelled']]]
};
const baseKeys=()=>['range','area','ctype','card','socks','bday'].concat(me?['pstat']:[]);
const WIN_ALL=[[1,'Today only'],[7,'Last 7 days'],[30,'Last 30 days'],[90,'Last 90 days'],[365,'Last year'],[0,'Everything']];
const winOpts=()=>me?WIN_ALL.filter(x=>x[0]>=7||x[0]===0):WIN_ALL.filter(x=>x[0]===7||x[0]===30);
function bounds(st){
const sod=startOfDay(Date.now()),D=86400000;
switch(st.range){
case 'today':return [sod,sod+D];
case 'yesterday':return [sod-D,sod];
case '7':return [sod-6*D,sod+D];
case '30':return [sod-29*D,sod+D];
case 'month':{const d=new Date();d.setDate(1);d.setHours(0,0,0,0);return [d.getTime(),sod+D]}
case 'custom':return [st.from?new Date(st.from+'T00:00:00').getTime():0,st.to?new Date(st.to+'T23:59:59.999').getTime()+1:Infinity];
default:return [0,Infinity];
}
}
function match(s,st,o){
o=o||{};
if(!o.skipDate){const b=bounds(st);if(s.startAt<b[0]||s.startAt>=b[1])return false}
if(st.area!=='all'&&s.area!==st.area)return false;
if(st.ctype!=='all'&&s.ctype!==st.ctype)return false;
if(st.card!=='all'&&s.card!==st.card)return false;
if(st.socks!=='all'&&s.socks!==st.socks)return false;
if(st.bday==='yes'&&!s.bday)return false;
if(st.bday==='no'&&s.bday)return false;
if(st.pstat!=='all'&&me){const pi=payInfo(s);if(!pi)return false;if((pi.status==='paid'?'paid':'pending')!==st.pstat)return false}
if(!o.skipStatus&&st.status!=='all'){
if(st.status==='over'){if(!isOver(s))return false}
else if(st.status==='active'){if(s.status!=='active'||isOver(s))return false}
else if(s.status!==st.status)return false;
}
const q=st.q.trim().toLowerCase();
if(q&&[s.name,phoneOf(s),s.remark,ticketStr(s.ticket),String(s.ticket)].join(' ').toLowerCase().indexOf(q)<0)return false;
return true;
}
function applyBar(el){Object.assign(el._st,el._draft);el._cb()}
function buildBar(sel,st,keys,cb,withSearch,withWin){
const el=$(sel);el._st=st;el._cb=cb;el._draft=Object.assign({},st);
const d=el._draft;let h='';
if(withSearch)h+=`<label class="f"><span>Search by name</span><input type="search" data-f="q" placeholder="Name${me?', phone':''}, ticket, remark" value="${esc(d.q)}"></label>`;
keys.forEach(k=>{
const o=FOPT[k];
h+=`<label class="f"><span>${o[0]}</span><select data-f="${k}">${o[1].map(x=>`<option value="${esc(x[0])}"${d[k]===x[0]?' selected':''}>${esc(x[1])}</option>`).join('')}</select></label>`;
if(k==='range')h+=`<div class="f cust"${d.range==='custom'?'':' hidden'}><label><span>From</span><input type="date" data-f="from" value="${esc(d.from)}"></label><label><span>To</span><input type="date" data-f="to" value="${esc(d.to)}"></label></div>`;
});
h+='<button class="btn primary" data-apply style="min-height:38px;padding:6px 20px">Search</button><button class="btn ghost" data-reset style="min-height:38px;padding:6px 14px">Reset</button>';
if(withWin)h+=`<label class="f" style="margin-left:auto"><span>Data loaded</span><select data-win>${winOpts().map(x=>`<option value="${x[0]}"${loadDays===x[0]?' selected':''}>${x[1]}</option>`).join('')}</select></label>`;
el.innerHTML='<div class="fbar">'+h+'</div>';
el._keys=keys;el._search=withSearch;el._win=withWin;
if(!el._bound){
el._bound=true;
el.addEventListener('input',e=>{
if(e.target.dataset&&e.target.dataset.win!==undefined){setWindow(Number(e.target.value));return}
const f=e.target.dataset&&e.target.dataset.f;if(!f)return;
el._draft[f]=e.target.value;
if(f==='range'){const c=$('.cust',el);if(c)c.hidden=el._draft.range!=='custom'}
});
el.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.dataset&&e.target.dataset.f){e.preventDefault();applyBar(el)}});
el.addEventListener('click',e=>{
if(e.target.closest('[data-apply]')){applyBar(el);return}
if(e.target.closest('[data-reset]')){Object.assign(el._st,freshF());buildBar(sel,el._st,el._keys,el._cb,el._search,el._win);el._cb()}
});
}
}
const custKey=s=>String(s.name||'').trim().toLowerCase();
function customers(){
const m={};
sessions.filter(s=>s.status!=='cancelled').sort((a,b)=>a.startAt-b.startAt).forEach(s=>{
const k=custKey(s);if(!k)return;
const c=m[k]||(m[k]={name:s.name,phone:'',card:s.card,visits:0,players:0,bdays:0,first:s.startAt,last:s.startAt,spent:0,socks:s.socks});
c.name=s.name;if(phoneOf(s))c.phone=phoneOf(s);c.card=s.card;c.socks=s.socks;c.visits++;c.players+=s.players;if(s.bday)c.bdays++;c.last=s.startAt;c.spent+=paidOf(s);
});
return m;
}
const findCustomer=name=>{const k=String(name||'').trim().toLowerCase();return k?customers()[k]||null:null};
function cardHTML(s){
const facts=[`<span class="fact">${esc(ticketStr(s.ticket))}</span>`,`<span class="fact">${s.players} player${s.players>1?'s':''}</span>`,
`<span class="fact ${s.ctype==='new'?'nw':''}">${s.ctype==='new'?'New customer':'Existing'}</span>`,`<span class="fact">${esc(s.card)} card</span>`,
`<span class="fact">Socks: ${esc(s.socks)}</span>`];
if(s.bday)facts.push('<span class="fact hl">Birthday free play</span>');
const pi=payInfo(s);
if(pi)facts.push(`<span class="fact pay-${pi.status}">${STATUS_LABEL[pi.status]}${pi.status!=='paid'?' \u00B7 Due '+esc(money(pi.due)):(isAdmin()&&methodOf(s)?' \u00B7 '+esc(methodOf(s)):'')}</span>`);
const ph=phoneOf(s);
return `<article class="guest" data-id="${esc(s.id)}" data-area="${esc(s.area)}" data-start="${s.startAt}" data-end="${endOf(s)}" data-state="ok">
<div class="g-top"><div><span class="areatag">${esc(AREAS[s.area].label)}</span><h3>${esc(s.name)}</h3>
<p class="meta">In at ${esc(clockStr(s.startAt))} \u00B7 ${esc(fmtMin(s.durationMin))} booked${ph?' \u00B7 '+esc(ph):''}</p></div><span class="badge">Playing</span></div>
<div class="timer">--:--</div><div class="track"><span></span></div>
<div class="facts">${facts.join('')}</div>
${s.remark?`<p class="remark">\u201C${esc(s.remark)}\u201D</p>`:''}
<div class="g-actions"><button class="btn ghost" data-act="extend" data-write>Add time</button><button class="btn ghost" data-act="edit" data-write>Edit</button><button class="btn ghost" data-act="pay" data-write>Payment</button><button class="btn ghost" data-act="cancel" data-write>Cancel</button><button class="btn primary" data-act="out" data-write>Mark out</button></div></article>`;
}
const cp=(title,rows)=>`<div class="cp"><h3>${esc(title)}</h3>${rows.map(r=>`<div class="row"><span>${esc(r[0])}</span><span><b>${r[1]}</b>${r[2]?`<i>${esc(r[2])}</i>`:''}</span></div>`).join('')}</div>`;
function renderDash(){
const st=FS.dash,now=Date.now();
const live=sessions.filter(s=>s.status==='active'&&match(s,st,{skipDate:true,skipStatus:true}));
const running=live.filter(s=>!isOver(s,now)),over=live.filter(s=>isOver(s,now));
const rows=sessions.filter(s=>match(s,st,{skipStatus:true}));
const nc=rows.filter(s=>s.status!=='cancelled');
const compl=rows.filter(s=>s.status==='completed').length,canc=rows.filter(s=>s.status==='cancelled').length;
$('#dashNote').textContent='Playing and Overtime are live. Every other count follows the date and filters above (press Search to apply) and leaves out cancelled entries.';
$('#statusTiles').innerHTML=
`<div class="tile" style="--tc:var(--cyan)"><span>Playing now</span><b>${running.length}</b><small>${sum(running,s=>s.players)} players</small></div>`+
`<div class="tile" style="--tc:var(--over)"><span>Overtime</span><b>${over.length}</b><small>waiting to be marked out</small></div>`+
`<div class="tile" style="--tc:var(--ok)"><span>Completed</span><b>${compl}</b><small>in this date range</small></div>`+
`<div class="tile" style="--tc:var(--muted)"><span>Cancelled</span><b>${canc}</b><small>in this date range</small></div>`+
`<div class="tile" style="--tc:var(--yellow-ink)"><span>Total check-ins</span><b>${nc.length}</b><small>${sum(nc,s=>s.players)} players</small></div>`;
const cnt=(arr,f)=>arr.filter(f).length,pl=(arr,f)=>sum(arr.filter(f),s=>s.players);
const tb=s=>s.baseMin||s.durationMin;
$('#countGrid').innerHTML=
cp('Customers',[['New customers',cnt(nc,s=>s.ctype==='new')],['Existing customers',cnt(nc,s=>s.ctype==='existing')],['Total players',sum(nc,s=>s.players)]])+
cp('Play area',AREA_KEYS.map(a=>[AREAS[a].label,cnt(nc,s=>s.area===a),pl(nc,s=>s.area===a)+' players']))+
cp('Socks size (players)',SOCKS.map(k=>[k==='No socks'?'No socks':'Size '+k,pl(nc,s=>s.socks===k)]))+
cp('Card type',CARDS.map(c=>[c+' card',cnt(nc,s=>s.card===c)]))+
cp('Birthday free play',[['Yes',cnt(nc,s=>s.bday)],['No (Premium card)',cnt(nc,s=>s.card==='Premium'&&!s.bday)],['No (Basic card)',cnt(nc,s=>s.card==='Basic')]])+
(me?cp('Payment',[['Pending',cnt(nc,s=>{const p=payInfo(s);return !!p&&p.status!=='paid'})],['Paid',cnt(nc,s=>{const p=payInfo(s);return !!p&&p.status==='paid'})]]):'')+
cp('Time booked',[['30 min',cnt(nc,s=>tb(s)===30)],['1 hour',cnt(nc,s=>tb(s)===60)],['2 hours',cnt(nc,s=>tb(s)===120)],['Custom',cnt(nc,s=>[30,60,120].indexOf(tb(s))<0)]]);
$('#runLabel').textContent=running.length+' running';
const box=$('#guests');
if(!loaded){box.innerHTML='<div class="empty"><strong>Loading guests...</strong></div>';return}
if(!running.length){box.innerHTML=`<div class="empty"><strong>Nobody is playing right now</strong>${me?'Tap \u201C+ New customer\u201D to check in a guest. Their countdown will show up here.':'Guests who are playing will show up here with their countdown.'}</div>`;return}
box.innerHTML=running.sort((a,b)=>endOf(a)-endOf(b)).map(cardHTML).join('');
}
function renderOver(){
const list=overdueList(Date.now()),box=$('#overGuests');
box.innerHTML=list.length?list.map(cardHTML).join(''):'<div class="empty"><strong>No overtime guests</strong>When a timer reaches zero, the guest shows up here until they are marked out.</div>';
}
function cardClick(e){
const b=e.target.closest('[data-act]');if(!b||!me)return;
const id=b.closest('.guest').dataset.id,a=b.dataset.act;
if(a==='extend')openExtend(id);else if(a==='cancel')openCancel(id);else if(a==='edit')openEdit(id);else if(a==='pay')openPayment(id);else openOut(id);
}
$('#guests').addEventListener('click',cardClick);
$('#overGuests').addEventListener('click',cardClick);
const LABEL={ok:'Playing',soon:'Ending soon',over:'Time\u2019s up'};
function tick(){
if(!appReady)return;
const now=Date.now();
$('#clock').textContent=new Date(now).toLocaleTimeString([], {hour:'numeric',minute:'2-digit',second:'2-digit'});
const sig=overdueList(now).map(s=>s.id+':'+endOf(s)).join('|');
if(sig!==lastOverSig){lastOverSig=sig;renderAll();return}
$$('.guest').forEach(el=>{
const st=+el.dataset.start,en=+el.dataset.end,rem=Math.round((en-now)/1000);
const state=rem<=0?'over':rem<=settings.warnMin*60?'soon':'ok';
if(el.dataset.state!==state)el.dataset.state=state;
$('.badge',el).textContent=state==='over'&&rem<=-60?'Over '+fmtMin(Math.floor(-rem/60)):LABEL[state];
$('.timer',el).textContent=(rem<0?'+':'')+fmtHMS(rem);
$('.track span',el).style.width=Math.min(100,Math.max(0,(now-st)/(en-st)*100))+'%';
});
runReminders(now);
}
setInterval(tick,1000);
const dlg=$('#dlg'),edlg=$('#entryDlg'),bdlg=$('#bulkDlg');
function openDlg(html){const b=$('#dlgBody');b.innerHTML=html;b.onkeydown=null;b.onclick=null;b.oninput=null;if(!dlg.open)dlg.showModal()}
function closeDlg(){if(dlg.open)dlg.close()}
dlg.addEventListener('click',e=>{if(e.target===dlg)closeDlg()});
edlg.addEventListener('click',e=>{if(e.target===edlg)edlg.close()});
const opts=(list,sel)=>list.map(o=>`<option${o===sel?' selected':''}>${esc(o)}</option>`).join('');
const canWrite=()=>!!me;
function openOut(id){
const s=getS(id);if(!s||!canWrite())return;
const now=Date.now(),rem=Math.round((endOf(s)-now)/1000);
const line=rem>=0?'They still have '+fmtHMS(rem)+' left.':'They are over time by '+fmtMin(Math.ceil(-rem/60))+'.';
openDlg(`<h2>Mark out ${esc(s.name)}?</h2><p class="sub-line">${esc(line)} Time used: ${esc(fmtMin((now-s.startAt)/60000))} of ${esc(fmtMin(s.durationMin))}. They will move to Completed.</p>
<div class="dlg-actions"><button class="btn ghost" id="oNo">Keep playing</button><button class="btn primary" id="oOk">Mark out</button></div>`);
$('#oNo').onclick=closeDlg;
$('#oOk').onclick=()=>{B.patchGuest(id,{status:'completed',endedAt:Date.now(),outBy:me.name}).catch(writeErr);closeDlg();toast(s.name+' marked out.')};
}
function openCancel(id){
const s=getS(id);if(!s||!canWrite())return;
openDlg(`<h2>Cancel ${esc(s.name)}?</h2><p class="sub-line">The entry moves to Cancelled and is never counted in any totals.</p>
<label class="field"><span>Reason</span><select id="cReason">${opts(REASONS)}</select></label>
<label class="field"><span>Note (optional)</span><input id="cNote" maxlength="120"></label>
<div class="dlg-actions"><button class="btn ghost" id="cNo">Back</button><button class="btn danger" id="cOk">Cancel entry</button></div>`);
$('#cNo').onclick=closeDlg;
$('#cOk').onclick=()=>{
const note=$('#cNote').value.trim();
B.patchGuest(id,{status:'cancelled',cancelledAt:Date.now(),outBy:me.name,cancelReason:$('#cReason').value+(note?' - '+note:'')}).catch(writeErr);
closeDlg();toast(s.name+' cancelled.');
};
}
function openExtend(id){
const s=getS(id);if(!s||!canWrite())return;const adm=isAdmin();
openDlg(`<h2>Add time for ${esc(s.name)}</h2><p class="sub-line">Now ends at ${esc(clockStr(endOf(s)))}.${adm?'':' The admin records any extra payment.'}</p>
<div class="chips" id="xChips">${[15,30,60].map(m=>`<button type="button" class="chip" data-m="${m}">+${m} min</button>`).join('')}</div>
<div class="two"><label class="field"><span>Minutes to add</span><input id="xMin" type="number" min="5" step="5" value="30"></label>
<label class="field adm"><span>Extra charge (${esc(settings.currency)})</span><input id="xPrice" type="number" min="0" step="1"></label></div>
<div class="dlg-actions"><button class="btn ghost" id="xNo">Cancel</button><button class="btn primary" id="xOk">Add time</button></div>`);
const min=$('#xMin'),price=$('#xPrice');let touched=false;
const calc=()=>{if(!touched)price.value=extPrice(s,Number(min.value)||0)};
const mark=()=>$$('#xChips .chip').forEach(c=>c.setAttribute('aria-pressed',String(Number(c.dataset.m)===Number(min.value))));
calc();mark();
$('#xChips').addEventListener('click',e=>{const c=e.target.closest('[data-m]');if(!c)return;min.value=c.dataset.m;touched=false;calc();mark()});
min.addEventListener('input',()=>{touched=false;calc();mark()});
price.addEventListener('input',()=>{touched=true});
$('#xNo').onclick=closeDlg;
$('#xOk').onclick=()=>{
const m=Math.round(Number(min.value));
if(!m||m<1){toast('Enter the minutes to add.',true);return}
const p=extPrice(s,m),paid=adm?num(price.value):p;
B.patchGuest(id,{},{inc:{durationMin:m},union:{extensions:{min:m,at:Date.now(),by:me.name}}}).catch(writeErr);
B.addExtBilling(id,paid,m).catch(()=>{});
closeDlg();toast(s.name+': added '+m+' min.');
};
}
function openEdit(id){
const s=getS(id);if(!s||!canWrite())return;
openDlg(`<h2>Edit ${esc(ticketStr(s.ticket))}</h2><p class="sub-line">Change any guest detail or the times. ${isAdmin()?'Use the Payment button to change money.':'Money is handled by the admin.'}</p>
<label class="field"><span>Customer name</span><input id="eeName" maxlength="60" value="${esc(s.name)}"></label>
<div class="two"><label class="field"><span>Phone</span><input id="eePhone" type="tel" maxlength="20" value="${esc(phoneOf(s))}"></label>
<label class="field"><span>Play area</span><select id="eeArea">${AREA_KEYS.map(a=>`<option value="${a}"${a===s.area?' selected':''}>${AREAS[a].label}</option>`).join('')}</select></label></div>
<div class="two"><label class="field"><span>Customer type</span><select id="eeType"><option value="new"${s.ctype==='new'?' selected':''}>New</option><option value="existing"${s.ctype==='existing'?' selected':''}>Existing</option></select></label>
<label class="field"><span>Players</span><input id="eePl" type="number" min="1" max="30" value="${s.players}"></label></div>
<div class="two"><label class="field"><span>Card</span><select id="eeCard">${opts(CARDS,s.card)}</select></label>
<label class="field"><span>Socks size</span><select id="eeSock">${opts(SOCKS,s.socks)}</select></label></div>
<label class="field"><span>Birthday free play</span><select id="eeBday"><option value="no"${s.bday?'':' selected'}>No</option><option value="yes"${s.bday?' selected':''}>Yes</option></select></label>
<div class="lbl" style="margin-top:4px;color:var(--yellow-ink)">Time</div>
<div class="two"><label class="field"><span>Check-in time</span><input id="eeIn" type="datetime-local" value="${toLocalInput(s.startAt)}"></label>
<label class="field"><span>Booked time (minutes)</span><input id="eeMin" type="number" min="5" step="5" value="${s.durationMin}"></label></div>
${s.status==='completed'?`<label class="field"><span>Check-out time</span><input id="eeOut" type="datetime-local" value="${toLocalInput(s.endedAt||s.startAt)}"></label>`:''}
<label class="field"><span>Remark</span><input id="eeRem" maxlength="160" value="${esc(s.remark)}"></label>
<div class="dlg-actions"><button class="btn ghost" id="eeNo">Cancel</button><button class="btn primary" id="eeOk">Save changes</button></div>`);
$('#eeNo').onclick=closeDlg;
$('#eeOk').onclick=()=>{
const n=$('#eeName').value.trim();if(!n){toast('Name cannot be empty.',true);return}
const sIn=new Date($('#eeIn').value).getTime(),mins=Math.round(Number($('#eeMin').value));
if(!sIn){toast('Enter a valid check-in time.',true);return}
if(!mins||mins<5){toast('Booked time must be at least 5 minutes.',true);return}
const card=$('#eeCard').value,f={name:n,area:$('#eeArea').value,ctype:$('#eeType').value,players:Math.max(1,parseInt($('#eePl').value,10)||1),card,
socks:$('#eeSock').value,bday:card==='Premium'&&$('#eeBday').value==='yes',remark:$('#eeRem').value.trim(),
startAt:sIn,durationMin:mins,editedBy:me.name,editedAt:Date.now()};
if(s.status==='completed'&&$('#eeOut')){const o=new Date($('#eeOut').value).getTime();if(o&&o<sIn){toast('Check-out must be after check-in.',true);return}if(o)f.endedAt=o}
B.patchGuest(id,f).catch(writeErr);
B.saveContact(id,{phone:$('#eePhone').value.trim(),startAt:sIn}).catch(()=>{});
closeDlg();toast('Saved.');
};
}
function openDelete(id){
const s=getS(id);if(!s||!isAdmin())return;
openDlg(`<h2>Delete this record?</h2><p class="sub-line">${esc(s.name)} (${esc(dateStr(s.startAt))}) will be removed from every page and report. This cannot be undone. Use Cancel instead if the guest simply did not play.</p>
<div class="dlg-actions"><button class="btn ghost" id="dNo">Keep it</button><button class="btn danger" id="dOk">Delete record</button></div>`);
$('#dNo').onclick=closeDlg;
$('#dOk').onclick=()=>{B.deleteGuest(id).catch(writeErr);B.deleteBilling(id).catch(()=>{});B.deleteContact(id).catch(()=>{});closeDlg();toast('Record deleted.')};
}
function openPayment(id){
const s=getS(id);if(!s||!me)return;
const pi=payInfo(s);
if(!pi){toast('Payment details are still loading. Try again in a moment.',true);return}
const adm=isAdmin(),b=adm?bl(s):{};
const base=b.play||0,other=(b.socks||0)+(b.card||0),ext=b.extTotal||0;
const P={disc:b.discType==='amt'?'custom':b.discType==='pct'?([5,10,15,20].indexOf(Number(b.discVal))>=0?String(Number(b.discVal)):'custom'):'none',
dcType:b.discType==='amt'?'amt':'pct',dcVal:b.discVal||0,pay:pi.status!=='paid'?'pending':((b.upi||0)>(b.cash||0)?'upi':'cash'),touched:false};
openDlg(`<h2>Payment: ${esc(s.name)}</h2><p class="sub-line">${esc(ticketStr(s.ticket))} \u00B7 ${s.players} player${s.players>1?'s':''} \u00B7 ${esc(AREAS[s.area].label)}</p>
<div class="bill" id="pBill"></div>
${adm?`<div class="lbl">Discount (play time only)</div>
<div class="chips">${['none','5','10','15','20','custom'].map(v=>`<button type="button" class="chip" data-pd="${v}">${v==='none'?'No discount':v==='custom'?'Custom':v+'%'}</button>`).join('')}</div>
<div class="two" id="pCustom" hidden><label class="field"><span>Custom discount</span><input id="pDcVal" type="number" min="0" step="1" value="${P.dcVal}"></label>
<label class="field"><span>Type</span><select id="pDcType"><option value="pct"${P.dcType==='pct'?' selected':''}>Percent (%)</option><option value="amt"${P.dcType==='amt'?' selected':''}>Amount (${esc(settings.currency)})</option></select></label></div>
<label class="field"><span>Adjustment (${esc(settings.currency)}, can be negative)</span><input id="pAdj" type="number" step="1" value="${b.adjust||0}"></label>`:''}
<div class="lbl" style="color:var(--yellow-ink)">Payment received</div>
<div class="chips"><button type="button" class="chip" data-pp="pending">Pending</button><button type="button" class="chip" data-pp="cash">Paid by Cash</button><button type="button" class="chip" data-pp="upi">Paid by UPI</button></div>
${pi.status==='partial'?`<p class="hint" style="margin:0 0 10px">Part of the bill was received earlier. Choose Paid by Cash or Paid by UPI when the rest has been received.</p>`:''}
<div class="dlg-actions"><button class="btn ghost" id="pNo">Cancel</button><button class="btn primary" id="pOk">Save</button></div>`);
const dcn=()=>P.disc==='none'?{t:'none',v:0}:P.disc==='custom'?{t:$('#pDcType').value==='amt'?'amt':'pct',v:num($('#pDcVal').value)}:{t:'pct',v:Number(P.disc)};
const discAmt=()=>{const d=dcn();return d.t==='pct'?Math.round(base*Math.min(100,d.v)/100):d.t==='amt'?Math.min(base,Math.round(d.v)):0};
const calc=()=>{
let bill=pi.bill,d=0,adj=0,total=0;
if(adm){d=discAmt();adj=Number($('#pAdj').value)||0;total=base-d+other;bill=total+ext+adj}
const already=adm?Math.min(bill,b.paidAmount||0):Math.min(pi.bill,pi.bill-pi.due);
const after=!P.touched?Math.max(0,bill-already):P.pay!=='pending'?0:bill;
$$('#dlgBody [data-pp]').forEach(c=>c.setAttribute('aria-pressed',String(c.dataset.pp===P.pay)));
if(adm){
$$('#dlgBody [data-pd]').forEach(c=>c.setAttribute('aria-pressed',String(c.dataset.pd===P.disc)));
$('#pCustom').hidden=P.disc!=='custom';
$('#pBill').innerHTML=`<div class="r"><span>Play fees</span><b>${money(b.play||0)}</b></div><div class="r"><span>Socks</span><b>${money(b.socks||0)}</b></div>`+
(b.card?`<div class="r"><span>Card (new customer)</span><b>${money(b.card)}</b></div>`:'')+(ext?`<div class="r"><span>Extra time</span><b>${money(ext)}</b></div>`:'')+
(d?`<div class="r"><span>Discount on play time</span><b>\u2212${money(d)}</b></div>`:'')+(adj?`<div class="r"><span>Adjustment</span><b>${money(adj)}</b></div>`:'')+
`<div class="r tot"><span>Bill amount</span><b>${money(bill)}</b></div><div class="r"><span>Amount due after saving</span><b>${money(after)}</b></div>`;
}else{
$('#pBill').innerHTML=`<div class="r"><span>Bill amount</span><b>${money(pi.bill)}</b></div><div class="r"><span>Payment now</span><b>${STATUS_LABEL[pi.status]}</b></div>`+
`<div class="r tot"><span>Amount to collect</span><b>${money(after)}</b></div>`;
}
return {d,adj,total,bill,already};
};
calc();
const body=$('#dlgBody');
body.oninput=calc;
body.onclick=e=>{
const pd=e.target.closest('[data-pd]');if(pd){P.disc=pd.dataset.pd;calc();return}
const pp=e.target.closest('[data-pp]');if(pp){P.pay=pp.dataset.pp;P.touched=true;calc()}
};
$('#pNo').onclick=closeDlg;
$('#pOk').onclick=()=>{
const r=calc();
if(adm){
const d=dcn();let paidAmt,cash=b.cash||0,upi=b.upi||0,card=b.cardAmt||0;
if(!P.touched){
paidAmt=r.already;let over=cash+upi+card-paidAmt;
if(over>0){const t1=Math.min(cash,over);cash-=t1;over-=t1;const t2=Math.min(upi,over);upi-=t2;over-=t2;card=Math.max(0,card-over)}
}else if(P.pay==='pending'){paidAmt=0;cash=0;upi=0;card=0}
else{paidAmt=r.bill;cash=P.pay==='cash'?r.bill:0;upi=P.pay==='upi'?r.bill:0;card=0}
B.setBilling(id,{startAt:s.startAt,discType:d.t,discVal:d.v,discount:r.d,total:r.total,adjust:r.adj,paidAmount:paidAmt,cash,upi,cardAmt:card,paidAt:Date.now(),paidBy:me.name}).catch(writeErr);
}else if(P.touched){
B.setPaid(id,P.pay!=='pending',me.name,P.pay==='upi'?'upi':'cash').catch(writeErr);
}
closeDlg();toast(P.touched||adm?'Payment saved.':'No change.');
};
}
function nextTicket(offset){
const f=startOfDay(Date.now());
return sessions.filter(s=>s.startAt>=f).reduce((m,s)=>Math.max(m,s.ticket||0),0)+1+(offset||0);
}
function commitGuest(g,ticket,now){
const id=uid(),adm=isAdmin();
const dc=adm?{t:g.discType,v:g.discVal}:{t:'none',v:0};
const b=calcBill(g,g.min,dc);
const guest=norm({id,ticket,area:g.area,name:g.name,players:g.players,ctype:g.ctype,card:g.card,bday:g.card==='Premium'&&g.bday,
socks:g.socks,remark:g.remark,baseMin:g.min,durationMin:g.min,startAt:now,extensions:[],status:'active',by:me.name});
B.createGuest(guest).then(()=>{
if(g.phone)B.saveContact(id,{phone:g.phone,startAt:now}).catch(()=>{});
B.createBilling(id,{startAt:now,play:b.play,socks:b.sock,card:b.card,discount:b.discount,discType:dc.t,discVal:dc.v,total:b.total,
paid:!!g.paid,payMethod:g.payMethod||'cash',paidBy:me.name}).catch(writeErr);
}).catch(writeErr);
return guest;
}
const chipRow=(key,items,fmt)=>`<div class="chips">${items.map(v=>`<button type="button" class="chip" data-k="${key}" data-v="${esc(v)}">${esc(fmt?fmt(v):v)}</button>`).join('')}</div>`;
function openEntry(){
if(!canWrite())return;
entry={area:lastArea,ctype:'new',min:60,card:'Basic',bday:false,socks:'No socks',disc:'none',pay:'pending',players:1};
$('#entryBody').innerHTML=`
<div class="dlg-head"><h2>New check-in</h2><button class="xbtn" data-close aria-label="Close">\u2715</button></div>
<div class="lbl">Play area</div><div class="atiles">
<button type="button" class="atile" data-k="area" data-v="trampoline"><b>Trampoline</b><span>Jump zone</span></button>
<button type="button" class="atile soft" data-k="area" data-v="softplay"><b>Soft play</b><span>Little ones</span></button></div>
<div class="lbl">Customer</div>${chipRow('ctype',['new','existing'],v=>v==='new'?'New customer':'Existing customer')}
<div class="two"><label class="field"><span>Customer name</span><input id="eName" list="nameList" autocomplete="off" maxlength="60" placeholder="Type the name"></label>
<label class="field"><span>Phone (optional)</span><input id="ePhone" type="tel" autocomplete="off" maxlength="20" inputmode="tel"></label></div>
<p class="hintline" id="eHint"></p>
<div class="lbl">Time</div>${chipRow('min',[30,60,120],v=>v===30?'30 min':v===60?'1 hour':'2 hours')}
<div class="lbl" id="cardLbl">Card type</div>${chipRow('card',CARDS)}
<div id="bdayWrap" hidden><div class="lbl">Birthday free play (one player plays free)</div>${chipRow('bday',['no','yes'],v=>v==='yes'?'Yes':'No')}</div>
<div class="lbl">Socks size</div>${chipRow('socks',SOCKS)}
<div class="adm"><div class="lbl">Discount</div>${chipRow('disc',['none',5,10,15,20,'custom'],v=>v==='none'?'No discount':v==='custom'?'Custom':v+'%')}
<div class="two" id="dcWrap" hidden><label class="field"><span>Custom discount</span><input id="dcVal" type="number" min="0" step="1" value="0" inputmode="decimal"></label>
<label class="field"><span>Type</span><select id="dcType"><option value="pct">Percent (%)</option><option value="amt">Amount (${esc(settings.currency)})</option></select></label></div></div>
<label class="field"><span>Remark (optional)</span><textarea id="eRem" maxlength="160" placeholder="Wristband number, party, allergies..."></textarea></label>
<div class="bill" id="eBill"></div>
<div class="lbl" style="color:var(--yellow-ink)">Payment received</div>${chipRow('pay',['pending','cash','upi'],v=>PAYCHIP[v])}
<div class="dlg-actions"><button class="btn ghost" data-close>Cancel</button><button class="btn primary big" id="eGo">Start timer</button></div>`;
const nm=customers();
$('#nameList').innerHTML=Object.keys(nm).slice(0,400).map(k=>`<option value="${esc(nm[k].name)}"></option>`).join('');
edlg.showModal();syncEntry();
setTimeout(()=>{try{$('#eName').focus()}catch(e){}},50);
}
const entryMin=()=>entry.min;
function entryDisc(){
if(!isAdmin()||entry.disc==='none')return {t:'none',v:0};
if(entry.disc==='custom')return {t:$('#dcType').value==='amt'?'amt':'pct',v:num($('#dcVal').value)};
return {t:'pct',v:Number(entry.disc)};
}
function syncEntry(){
if(entry.card!=='Premium')entry.bday=false;
$$('#entryBody [data-k]').forEach(b=>{
let cur=entry[b.dataset.k];if(b.dataset.k==='bday')cur=cur?'yes':'no';
b.setAttribute('aria-pressed',String(String(cur)===b.dataset.v));
});
$('#bdayWrap').hidden=entry.card!=='Premium';
$('#dcWrap').hidden=entry.disc!=='custom';
$('#cardLbl').textContent=entry.ctype==='new'?'Card type (new card)':'Card type (their existing card)';
const min=entryMin(),b=calcBill(entry,min,entryDisc()),m=money;
const rows=[`<div class="r"><span>${esc(AREAS[entry.area].label)} \u00B7 ${esc(min?fmtMin(min):'-')}</span><b>${b.freeN?'Free (birthday)':m(b.fee)}</b></div>`];
if(b.sock)rows.push(`<div class="r"><span>Socks (${esc(entry.socks)})</span><b>${m(b.sockUnit)}</b></div>`);
if(b.discount)rows.push(`<div class="r"><span>Discount on play time</span><b>\u2212${m(b.discount)}</b></div>`);
if(b.card)rows.push(`<div class="r"><span>${esc(entry.card)} card (new customer)</span><b>${m(b.card)}</b></div>`);
rows.push(`<div class="r tot"><span>Bill amount</span><b>${m(b.total)}</b></div>`);
rows.push(`<div class="r"><span>Amount due after payment</span><b>${entry.pay!=='pending'?m(0):m(b.total)}</b></div>`);
$('#eBill').innerHTML=rows.join('');
}
edlg.addEventListener('click',e=>{
if(e.target.closest('[data-close]')){edlg.close();return}
const k=e.target.closest('[data-k]');
if(k){const key=k.dataset.k,v=k.dataset.v;
if(key==='min')entry.min=Number(v);
else if(key==='disc')entry.disc=(v==='none'||v==='custom')?v:Number(v);
else if(key==='bday')entry.bday=v==='yes';
else entry[key]=v;
if(key==='area')lastArea=v;
if(key==='ctype'||key==='card')nameHint();
syncEntry();return}
if(e.target.id==='eGo')startGuest();
});
edlg.addEventListener('input',e=>{
const id=e.target.id;
if(id==='eName'){nameHint(true)}
else syncEntry();
});
edlg.addEventListener('keydown',e=>{if(e.key==='Enter'&&(e.target.id==='eName'||e.target.id==='ePhone')){e.preventDefault();startGuest()}});
function nameHint(fill){
const n=$('#eName').value.trim(),h=$('#eHint');
if(!n){h.textContent='';return}
const c=findCustomer(n);
if(entry.ctype==='existing'){
if(c){
h.textContent=`Found: ${c.visits} earlier visit${c.visits>1?'s':''}, last on ${dateStr(c.last)}, ${c.card} card.`;
if(fill){if(!$('#ePhone').value&&c.phone)$('#ePhone').value=c.phone;entry.card=c.card;if(entry.socks==='No socks'&&c.socks)entry.socks=c.socks;syncEntry()}
}else h.textContent='No earlier visit found with this name. You can still continue.';
}else h.textContent=c?`This name already exists (${c.visits} visit${c.visits>1?'s':''}). Switch to "Existing customer" if it is the same person.`:'';
}
function startGuest(){
if(!canWrite()||!entry)return;
const name=$('#eName').value.trim();
if(!name){toast('Enter the customer name first.',true);$('#eName').focus();return}
const min=entryMin();
if(!min||min<5){toast('Enter at least 5 minutes.',true);return}
const dc=entryDisc(),adm=isAdmin();
const g=commitGuest({area:entry.area,name,phone:$('#ePhone').value.trim(),players:entry.players,ctype:entry.ctype,card:entry.card,bday:entry.bday,
socks:entry.socks,remark:$('#eRem').value.trim(),min,discType:dc.t,discVal:dc.v,
paid:entry.pay!=='pending',payMethod:entry.pay},nextTicket(0),Date.now());
edlg.close();
toast(`${name} checked in: ${AREAS[g.area].label}, ${fmtMin(min)}.`);
if(tab!=='dash'&&tab!=='over')switchTab('dash');
}
$('#newBtn').addEventListener('click',openEntry);
const newRow=prev=>({name:'',phone:'',players:1,area:prev?prev.area:lastArea,min:prev?prev.min:'60',custom:prev?prev.custom:45,ctype:prev?prev.ctype:'new',card:prev?prev.card:'Basic',
bday:'no',socks:prev?prev.socks:'No socks',remark:'',disc:'none',dcVal:0,dcType:'pct'});
let bulkPay='pending';
function rowCalc(r){
const min=Number(r.min);
const dc=!isAdmin()||r.disc==='none'?{t:'none',v:0}:r.disc==='custom'?{t:r.dcType==='amt'?'amt':'pct',v:num(r.dcVal)}:{t:'pct',v:Number(r.disc)};
const b=calcBill({area:r.area,card:r.card,ctype:r.ctype,socks:r.socks,bday:r.card==='Premium'&&r.bday==='yes',players:1},min,dc);
return {min,dc,b};
}
function rowHTML(r,i){
const sel=(f,list,fmt)=>`<select data-f="${f}">${list.map(v=>`<option value="${esc(v)}"${String(r[f])===String(v)?' selected':''}>${esc(fmt?fmt(v):v)}</option>`).join('')}</select>`;
return `<div class="brow" data-i="${i}">
<div class="brow-h"><b>Participant ${i+1}</b><button class="mini bad" data-bdel="${i}">Remove</button></div>
<div class="bgrid">
<label class="field"><span>Name</span><input data-f="name" maxlength="60" value="${esc(r.name)}" placeholder="Participant name"></label>
<label class="field"><span>Phone</span><input data-f="phone" type="tel" maxlength="20" value="${esc(r.phone)}"></label>
<label class="field"><span>Play area</span>${sel('area',AREA_KEYS,v=>AREAS[v].label)}</label>
<label class="field"><span>Time</span>${sel('min',['30','60','120'],v=>v==='30'?'30 min':v==='60'?'1 hour':'2 hours')}</label>
<label class="field"><span>Customer</span>${sel('ctype',['new','existing'],v=>v==='new'?'New':'Existing')}</label>
<label class="field"><span>Card</span>${sel('card',CARDS)}</label>
<label class="field" data-bw${r.card==='Premium'?'':' hidden'}><span>Birthday free play</span>${sel('bday',['no','yes'],v=>v==='yes'?'Yes':'No')}</label>
<label class="field"><span>Socks</span>${sel('socks',SOCKS)}</label>
<label class="field" style="grid-column:1/-1"><span>Remark</span><input data-f="remark" maxlength="160" value="${esc(r.remark)}"></label>
</div>
<div class="bpay"><div class="bgrid">
<label class="field adm"><span>Discount (play time only)</span>${sel('disc',['none','5','10','15','20','custom'],v=>v==='none'?'None':v==='custom'?'Custom':v+'%')}</label>
<div class="field adm" data-dw${r.disc==='custom'?'':' hidden'}><span>Custom discount</span><div class="two" style="gap:6px"><input data-f="dcVal" type="number" min="0" step="1" value="${esc(r.dcVal)}">${sel('dcType',['pct','amt'],v=>v==='pct'?'%':'\u20B9')}</div></div>
<div class="field"><span>Bill amount</span><div class="bval" data-due>-</div></div>
</div></div></div>`;
}
function renderBulk(){
$('#bulkRows').innerHTML=bulk.map(rowHTML).join('');
bulk.forEach((r,i)=>updateRow(i));updateBulkTotals();
}
function updateRow(i){
const r=bulk[i],el=$(`.brow[data-i="${i}"]`);if(!el)return;
const c=rowCalc(r);
$('[data-bw]',el).hidden=r.card!=='Premium';
const dw=$('[data-dw]',el);if(dw)dw.hidden=r.disc!=='custom';
const due=$('[data-due]',el);if(due)due.textContent=money(c.b.total);
}
function syncBulkPay(){$$('#bulkBody [data-bpay]').forEach(c=>c.setAttribute('aria-pressed',String(c.dataset.bpay===bulkPay)))}
function updateBulkTotals(){
const rows=bulk.filter(r=>r.name.trim()),cs=rows.map(rowCalc),total=sum(cs,c=>c.b.total);
syncBulkPay();
$('#bulkTot').innerHTML=`<div class="r"><span>Participants</span><b>${rows.length}</b></div>`+
`<div class="r"><span>Total bill amount</span><b>${money(total)}</b></div>`+
`<div class="r tot"><span>Amount due after payment</span><b>${bulkPay!=='pending'?money(0):money(total)}</b></div>`;
}
function openBulk(){
if(!canWrite())return;
bulk=[newRow(),newRow(),newRow()];bulkPay='pending';
$('#bulkBody').innerHTML=`<div class="dlg-head"><h2>Bulk entry</h2><button class="xbtn" data-bclose aria-label="Close">\u2715</button></div>
<p class="sub-line">Add every participant with their own details. All timers start when you press the button. Rows with no name are skipped.</p>
<div id="bulkRows"></div>
<div class="acts" style="margin:6px 0 14px"><button class="btn ghost" data-badd="1">+ Add row</button><button class="btn ghost" data-badd="5">+ Add 5 rows</button><button class="btn ghost" data-bcopy="1">Copy last row</button></div>
<div class="lbl" style="color:var(--yellow-ink)">Payment received for the whole group (one choice for everyone)</div>
<div class="chips"><button type="button" class="chip" data-bpay="pending">Pending</button><button type="button" class="chip" data-bpay="cash">Paid by Cash</button><button type="button" class="chip" data-bpay="upi">Paid by UPI</button></div>
<div class="bill" id="bulkTot"></div>
<div class="dlg-actions"><button class="btn ghost" data-bclose>Cancel</button><button class="btn primary big" id="bulkGo">Start all timers</button></div>`;
bdlg.showModal();renderBulk();
}
bdlg.addEventListener('click',e=>{
if(e.target===bdlg||e.target.closest('[data-bclose]')){bdlg.close();return}
const del=e.target.closest('[data-bdel]');
if(del){bulk.splice(Number(del.dataset.bdel),1);if(!bulk.length)bulk.push(newRow());renderBulk();return}
const add=e.target.closest('[data-badd]');
if(add){for(let k=0;k<Number(add.dataset.badd);k++)bulk.push(newRow(bulk[bulk.length-1]));renderBulk();return}
if(e.target.closest('[data-bcopy]')){const l=bulk[bulk.length-1];bulk.push(Object.assign({},l,{name:'',phone:'',remark:''}));renderBulk();return}
const bp=e.target.closest('[data-bpay]');
if(bp){bulkPay=bp.dataset.bpay;updateBulkTotals();return}
if(e.target.id==='bulkGo')submitBulk();
});
bdlg.addEventListener('input',e=>{
const row=e.target.closest('.brow'),f=e.target.dataset&&e.target.dataset.f;if(!row||!f)return;
const i=Number(row.dataset.i);bulk[i][f]=e.target.value;
updateRow(i);updateBulkTotals();
});
function submitBulk(){
const rows=bulk.map((r,i)=>({r,i})).filter(x=>x.r.name.trim());
if(!rows.length){toast('Enter at least one participant name.',true);return}
for(const x of rows){const c=rowCalc(x.r);if(!c.min||c.min<5){toast('Participant '+(x.i+1)+': enter at least 5 minutes.',true);return}}
const now=Date.now(),t0=nextTicket(0);
rows.forEach((x,n)=>{
const c=rowCalc(x.r),r=x.r;
commitGuest({area:r.area,name:r.name.trim(),phone:r.phone.trim(),players:1,ctype:r.ctype,card:r.card,bday:r.bday==='yes',
socks:r.socks,remark:r.remark.trim(),min:c.min,discType:c.dc.t,discVal:c.dc.v,paid:bulkPay!=='pending',payMethod:bulkPay},t0+n,now);
});
bdlg.close();toast(rows.length+' participant'+(rows.length>1?'s':'')+' checked in.');
if(tab!=='dash'&&tab!=='over')switchTab('dash');
}
$('#bulkBtn').addEventListener('click',openBulk);
function records(){
const st=FS[tab],need=REC_TABS[tab];
return sessions.filter(s=>{
if(need&&s.status!==need)return false;
return match(s,st,{skipStatus:!!need});
}).sort((a,b)=>b.startAt-a.startAt);
}
function renderRecords(){
$('#recTitle').textContent=TITLES[tab]||'Customers';
const rows=records(),now=Date.now(),adm=isAdmin(),cols=adm?17:me?14:12;
$('#rBody').innerHTML=rows.length?rows.map(s=>{
const extra=sum(s.extensions,x=>x.min);let tag,out;
if(s.status==='active'){const o=endOf(s)<=now;tag=`<span class="tag ${o?'up':'play'}">${o?'Time\u2019s up':'Playing'}</span>`;out='Playing'}
else if(s.status==='completed'){tag='<span class="tag done">Completed</span>';out=clockStr(s.endedAt||s.startAt)}
else{tag='<span class="tag cancel">Cancelled</span>';out=clockStr(s.cancelledAt||s.startAt)}
const i=esc(s.id),canc=s.status==='cancelled';
const acts=s.status==='active'?
`<button class="mini go" data-r="out" data-id="${i}" data-write>Mark out</button><button class="mini" data-r="more" data-id="${i}" data-write>Add time</button><button class="mini" data-r="edit" data-id="${i}" data-write>Edit</button><button class="mini" data-r="pay" data-id="${i}" data-write>Payment</button><button class="mini bad" data-r="cancel" data-id="${i}" data-write>Cancel</button>`:
`<button class="mini" data-r="edit" data-id="${i}" data-write>Edit</button>${canc?'':`<button class="mini" data-r="pay" data-id="${i}" data-write>Payment</button>`}<button class="mini bad adm" data-r="del" data-id="${i}" data-write>Delete</button>`;
const sub=[];if(phoneOf(s))sub.push(esc(phoneOf(s)));if(s.remark)sub.push('\u201C'+esc(s.remark)+'\u201D');if(s.cancelReason)sub.push('Reason: '+esc(s.cancelReason));
const cls=canc?'strike':'',pi=payInfo(s);
return `<tr><td>${esc(ticketStr(s.ticket))}<span class="sub">${esc(dateStr(s.startAt))}</span></td>
<td class="name"><b>${esc(s.name)}</b>${sub.map(x=>`<span class="sub">${x}</span>`).join('')}</td>
<td><span class="dot${s.area==='softplay'?' soft':''}"></span>${esc(AREAS[s.area].label)}</td>
<td class="num">${s.players}</td>
<td><span class="tag ${s.ctype==='new'?'nw':'ex'}">${s.ctype==='new'?'New':'Existing'}</span></td>
<td>${esc(s.card)}</td><td>${esc(s.socks)}</td><td>${s.bday?'<span class="tag bd">Free play</span>':'No'}</td>
<td class="num">${esc(fmtMin(s.durationMin))}${extra?`<span class="sub">incl. +${esc(fmtMin(extra))}</span>`:''}${s.editedBy?`<span class="sub">edited</span>`:''}</td>
<td>${esc(clockStr(s.startAt))} \u2192 ${esc(out)}</td>
<td class="num adm"><span class="${cls}">${esc(money(dueOf(s)))}</span>${discOf(s)?`<span class="sub">\u2212${esc(money(discOf(s)))} off</span>`:''}</td>
<td class="adm">${canc?'-':esc(methodOf(s)||'-')}</td>
<td class="num stf">${pi&&!canc?esc(money(pi.due)):'-'}</td>
<td class="stf">${pi&&!canc?`<span class="tag pay-${pi.status}">${STATUS_LABEL[pi.status]}</span>`:'-'}</td>
<td>${tag}</td>
<td class="adm">${esc(s.by||'-')}${s.outBy?`<span class="sub">out: ${esc(s.outBy)}</span>`:''}</td>
<td><div class="acts">${acts}</div></td></tr>`;
}).join(''):`<tr><td colspan="${cols}" style="text-align:center;color:var(--muted);padding:30px">${loaded?'No customers found for these filters.':'Loading...'}</td></tr>`;
const live=rows.filter(s=>s.status!=='cancelled');
let line=rows.length+(rows.length===1?' customer':' customers')+' \u00B7 '+sum(rows,s=>s.players)+' players';
if(adm){line+=` \u00B7 Bill total ${money(sum(live,dueOf))} \u00B7 Received ${money(sum(live,paidOf))} \u00B7 Amount due ${money(sum(live,owedOf))} (cancelled entries not counted)`}
else if(me){line+=` \u00B7 Amount still to collect ${money(sum(live,s=>{const p=payInfo(s);return p?p.due:0}))}`}
$('#rCount').textContent=line;
}
$('#rBody').addEventListener('click',e=>{
const b=e.target.closest('[data-r]');if(!b||!me)return;const id=b.dataset.id,a=b.dataset.r;
if(a==='out')openOut(id);else if(a==='more')openExtend(id);else if(a==='edit')openEdit(id);else if(a==='cancel')openCancel(id);else if(a==='pay')openPayment(id);else openDelete(id);
});
const csvCell=v=>{v=String(v==null?'':v);if(/^[=+\-@]/.test(v))v="'"+v;return '"'+v.replace(/"/g,'""')+'"'};
function exportCsv(filename,head,body){
const text='\uFEFF'+[head.map(csvCell).join(',')].concat(body.map(r=>r.map(csvCell).join(','))).join('\r\n');
const url=URL.createObjectURL(new Blob([text],{type:'text/csv;charset=utf-8'}));
const a=document.createElement('a');a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();
setTimeout(()=>URL.revokeObjectURL(url),2000);toast('CSV downloaded.');
}
$('#csvBtn').addEventListener('click',()=>{
const rows=records();if(!rows.length){toast('Nothing to export for these filters.',true);return}
const head=['Ticket','Date','Customer'].concat(me?['Phone']:[],['Area','Players','Customer type','Card','Socks','Birthday free play','Booked (min)','Extra (min)','Status','In','Out','Cancel reason','Remark']);
if(isAdmin())head.push('Bill amount','Discount','Amount due','Payment','Paid by','Entered by');else if(me)head.push('Amount due','Payment');
exportCsv('ufh-'+tab+'-'+new Date().toISOString().slice(0,10)+'.csv',head,rows.map(s=>{
const extra=sum(s.extensions,x=>x.min),out=s.endedAt||s.cancelledAt;
const r=[ticketStr(s.ticket),new Date(s.startAt).toLocaleDateString(),s.name].concat(me?[phoneOf(s)]:[],[AREAS[s.area].label,s.players,s.ctype,s.card,s.socks,s.bday?'Yes':'No',s.durationMin-extra,extra,s.status,clockStr(s.startAt),out?clockStr(out):'',s.cancelReason,s.remark]);
const c=s.status==='cancelled',pi=payInfo(s);
if(isAdmin())r.push(c?0:dueOf(s),discOf(s),c?0:owedOf(s),c||!pi?'':STATUS_LABEL[pi.status],c?'':methodOf(s),s.by||'');
else if(me)r.push(c||!pi?'':pi.due,c||!pi?'':STATUS_LABEL[pi.status]);
return r;
}));
});
function custRows(){
const q=$('#cSearch').value.trim().toLowerCase(),cd=$('#cCard').value,so=$('#cSort').value,all=customers();
const list=Object.keys(all).map(k=>all[k]).filter(c=>(cd==='all'||c.card===cd)&&(!q||(c.name+' '+c.phone).toLowerCase().indexOf(q)>-1));
const by={last:(a,b)=>b.last-a.last,visits:(a,b)=>b.visits-a.visits,spent:(a,b)=>b.spent-a.spent,name:(a,b)=>a.name.localeCompare(b.name)};
return list.sort(by[so]);
}
function renderCustomers(){
if(!isAdmin())return;
const rows=custRows();
$('#cBody').innerHTML=rows.length?rows.map(c=>`<tr><td class="name"><b>${esc(c.name)}</b></td><td>${esc(c.phone||'-')}</td><td>${esc(c.card)}</td><td class="num">${c.visits}</td><td class="num">${c.players}</td><td class="num">${c.bdays}</td><td>${esc(dateStr(c.first))}</td><td>${esc(dateStr(c.last))}</td><td class="num">${esc(money(c.spent))}</td></tr>`).join(''):'<tr><td colspan="9" style="text-align:center;color:var(--muted);padding:30px">No customers yet.</td></tr>';
$('#cCount').textContent=rows.length+' customers \u00B7 '+sum(rows,c=>c.visits)+' visits in the loaded data (cancelled entries not counted)';
}
$('#cGo').addEventListener('click',renderCustomers);
$('#cSearch').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();renderCustomers()}});
$('#cCsv').addEventListener('click',()=>{
const rows=custRows();if(!rows.length){toast('No customers to export.',true);return}
exportCsv('ufh-customers-'+new Date().toISOString().slice(0,10)+'.csv',['Customer','Phone','Card','Visits','Players','Birthday free plays','First visit','Last visit','Total received'],
rows.map(c=>[c.name,c.phone,c.card,c.visits,c.players,c.bdays,new Date(c.first).toLocaleDateString(),new Date(c.last).toLocaleDateString(),c.spent]));
});
function bars(el,items,fmt){
const max=Math.max.apply(null,items.map(i=>i.v).concat([1]));
el.innerHTML=items.map(i=>`<div class="col"><i>${i.v?esc(fmt?fmt(i.v):i.v):''}</i><span class="stack" style="height:${i.v/max*78}%"><span class="fill" style="height:100%"></span></span><em>${esc(i.l)}</em></div>`).join('');
}
function barsStacked(el,items){
const max=Math.max.apply(null,items.map(i=>i.a+i.b).concat([1]));
el.innerHTML=items.map(i=>{
const t=i.a+i.b,h=t/max*78;
return `<div class="col"><i>${t||''}</i><span class="stack" style="height:${h}%"><span class="fill" style="height:${t?i.a/t*100:0}%"></span><span class="fill b" style="height:${t?i.b/t*100:0}%"></span></span><em>${esc(i.l)}</em></div>`;
}).join('');
}
function lines(el,entries,fmt){
const max=Math.max.apply(null,entries.map(e=>Math.abs(e[1])).concat([1]));
el.innerHTML=entries.length?entries.map(e=>`<div class="line"><span>${esc(e[0])}</span><div class="b"><span style="width:${Math.abs(e[1])/max*100}%"></span></div><b>${esc(fmt?fmt(e[1]):e[1])}</b></div>`).join(''):'<p class="hint" style="margin:0">No data for these filters yet.</p>';
}
function renderStats(){
if(!isAdmin())return;
const st=FS.stats,all=sessions.filter(s=>match(s,st,{skipStatus:true}));
const rows=all.filter(s=>s.status!=='cancelled'),canc=all.filter(s=>s.status==='cancelled');
const paid=sum(rows,paidOf),due=sum(rows,dueOf),owed=sum(rows,owedOf),disc=sum(rows,discOf),cashT=sum(rows,cashOf),upiT=sum(rows,upiOf),cardT=sum(rows,cardOf),unk=Math.max(0,paid-cashT-upiT-cardT);
const done=rows.filter(s=>s.status==='completed'&&s.endedAt);
const avg=done.length?sum(done,s=>(s.endedAt-s.startAt)/60000)/done.length:0;
const extRev=sum(rows,s=>bl(s).extTotal||0);
$('#statCards').innerHTML=[[money(paid),'total received (paid)'],[money(cashT),'received in cash'],[money(upiT),'received by UPI'],[money(due),'total bill amount'],[money(owed),'amount due (pending)'],[money(disc),'discounts given'],[rows.length,'check-ins'],[sum(rows,s=>s.players),'players'],
[money(rows.length?paid/rows.length:0),'average received per check-in'],[avg?fmtMin(avg):'-','average time played'],[rows.filter(s=>s.bday).length,'birthday free plays'],[canc.length,'cancelled (not counted)']]
.map(c=>`<div class="stat"><b>${esc(c[0])}</b><span>${esc(c[1])}</span></div>`).join('');
$('#areaPanels').innerHTML=AREA_KEYS.map(a=>{
const r=rows.filter(s=>s.area===a),d=r.filter(s=>s.status==='completed'&&s.endedAt);
const av=d.length?sum(d,s=>(s.endedAt-s.startAt)/60000)/d.length:0;
return `<div class="panel areaPanel" style="--ac:${a==='trampoline'?'var(--cyan)':'var(--violet)'}"><h2>${esc(AREAS[a].label)}</h2><div class="kv">
<div><b>${r.length}</b><span>check-ins</span></div><div><b>${sum(r,s=>s.players)}</b><span>players</span></div>
<div><b>${esc(money(sum(r,paidOf)))}</b><span>received</span></div><div><b>${esc(av?fmtMin(av):'-')}</b><span>average time played</span></div></div></div>`;
}).join('');
const days={};rows.forEach(s=>{const d=startOfDay(s.startAt);(days[d]=days[d]||{rev:0,n:0,e:0}).rev+=paidOf(s);if(s.ctype==='new')days[d].n++;else days[d].e++});
const dk=Object.keys(days).map(Number).sort((a,b)=>a-b).slice(-14);
if(dk.length){
bars($('#dayChart'),dk.map(d=>({l:dateStr(d),v:days[d].rev})),v=>settings.currency+Math.round(v));
barsStacked($('#newExChart'),dk.map(d=>({l:dateStr(d),a:days[d].n,b:days[d].e})));
}else{$('#dayChart').innerHTML=$('#newExChart').innerHTML='<p class="hint" style="margin:0">No data for these filters yet.</p>'}
const hrs={};rows.forEach(s=>{const h=new Date(s.startAt).getHours();hrs[h]=(hrs[h]||0)+s.players});
const keys=Object.keys(hrs).map(Number),lo=Math.min.apply(null,keys.concat([10])),hi=Math.max.apply(null,keys.concat([21])),it=[];
for(let h=lo;h<=hi;h++)it.push({l:(h%12||12)+(h<12?'a':'p'),v:hrs[h]||0});
bars($('#hourChart'),it);
const playRev=sum(rows,s=>bl(s).play||0),sockRev=sum(rows,s=>bl(s).socks||0),cardRev=sum(rows,s=>bl(s).card||0);
const adj=sum(rows,s=>bl(s).adjust||0);
lines($('#revLines'),[['Play fees',playRev],['Socks',sockRev],['Card sales',cardRev],['Extra time',extRev],['Discounts',-disc],['Adjustments',adj]].filter(e=>e[1]!==0),v=>money(v));
lines($('#payLines'),[['Cash received',cashT],['UPI received',upiT],['Card (older entries)',cardT],['Method not recorded',unk],['Pending (due)',owed]].filter(e=>e[1]>0),v=>money(v));
lines($('#cardLines'),CARDS.map(c=>[c,rows.filter(s=>s.card===c).length]).filter(e=>e[1]>0));
lines($('#sockLines'),SOCKS.map(k=>[k,sum(rows.filter(s=>s.socks===k),s=>s.players)]).filter(e=>e[1]>0));
const dl=s=>{const b=bl(s);return b.discType==='amt'?'Custom '+money(b.discVal):b.discType==='pct'?b.discVal+'% off':'No discount'};
const dmap={};rows.forEach(s=>{const k=dl(s);dmap[k]=(dmap[k]||0)+1});
lines($('#discLines'),Object.keys(dmap).map(k=>[k,dmap[k]]));
const tmap={};rows.forEach(s=>{const b=s.baseMin||s.durationMin;const k=b===30?'30 min':b===60?'1 hour':b===120?'2 hours':'Custom';tmap[k]=(tmap[k]||0)+1});
lines($('#timeLines'),Object.keys(tmap).map(k=>[k,tmap[k]]));
lines($('#typeLines'),[['New',rows.filter(s=>s.ctype==='new').length],['Existing',rows.filter(s=>s.ctype==='existing').length]].filter(e=>e[1]>0));
}
function renderTeam(){
if(!isAdmin())return;
const list=staffList.slice().sort((a,b)=>String(a.name||a.email).localeCompare(String(b.name||b.email)));
$('#tmBody').innerHTML=list.length?list.map(u=>{
const self=u.email===me.email,own=isOwnerEmail(u.email);
const e=esc(u.email);
return `<tr><td class="name"><b>${esc(u.name||'-')}</b>${self?'<span class="sub">this is you</span>':''}</td><td>${e}</td>
<td><select data-role="${e}"${self||own?' disabled':''}><option value="staff"${u.role!=='admin'?' selected':''}>Staff</option><option value="admin"${u.role==='admin'?' selected':''}>Admin</option></select></td>
<td>${u.active===false?'<span class="tag cancel">Disabled</span>':'<span class="tag done">Active</span>'}</td>
<td><div class="acts">${self||own?'':`<button class="mini ${u.active===false?'go':'bad'}" data-tg="${e}">${u.active===false?'Enable':'Disable'}</button>`}<button class="mini" data-rs="${e}">Send reset email</button></div></td></tr>`;
}).join(''):'<tr><td colspan="5" style="text-align:center;color:var(--muted);padding:26px">No staff yet.</td></tr>';
}
$('#tmAdd').addEventListener('click',async()=>{
if(!isAdmin())return;
const name=$('#tmName').value.trim(),email=$('#tmEmail').value.trim().toLowerCase(),pw=$('#tmPass').value,role=$('#tmRole').value;
if(!name){toast('Enter the name.',true);return}
if(!/^\S+@\S+\.\S+$/.test(email)){toast('Enter a valid email.',true);return}
if(pw.length<6){toast('The password needs at least 6 characters.',true);return}
$('#tmAdd').disabled=true;
try{
let made=true,needs=false;
try{const r=await B.createAuthUser(email,pw);needs=!!(r&&r.needsConfirm)}catch(e){if(e&&e.code==='auth/email-already-in-use')made=false;else throw e}
await B.saveStaff(email,{name,email,role,active:true,createdAt:Date.now()});
$('#tmName').value=$('#tmEmail').value=$('#tmPass').value='';
toast(needs?name+' added. Supabase has emailed them a link to confirm their email before their first sign-in. (To skip this, switch off \u201CConfirm email\u201D in Supabase under Authentication, Sign In / Providers, Email.)':made?name+' added. Give them the email and password.':name+' already had a login, so access was added. Use "Send reset email" if they forgot the password.');
}catch(e){
const c=e&&e.code||'';
toast(c==='auth/weak-password'?'That password is too weak.':/email_provider_disabled|signup_disabled/.test(c)?'Email sign-ups are switched off in Supabase.':'Could not add this person'+(c?' ('+c+')':'')+'.',true);
}
$('#tmAdd').disabled=false;
});
$('#tmBody').addEventListener('click',async e=>{
const tg=e.target.closest('[data-tg]'),rs=e.target.closest('[data-rs]');
if(tg){const u=staffList.find(x=>x.email===tg.dataset.tg);if(!u)return;
try{await B.saveStaff(u.email,{active:u.active===false});toast(u.active===false?'Access enabled.':'Access switched off.')}catch(er){writeErr(er)}}
if(rs){try{await B.resetPassword(rs.dataset.rs);toast('Reset email sent (if the account exists).')}catch(er){toast('Could not send the reset email.',true)}}
});
$('#tmBody').addEventListener('change',async e=>{
const em=e.target.dataset&&e.target.dataset.role;if(!em)return;
try{await B.saveStaff(em,{role:e.target.value});toast('Role updated.')}catch(er){writeErr(er)}
});
function renderSettings(){
if(!isAdmin())return;
$('#sName').value=settings.name;$('#sCur').value=settings.currency;
$('#sockS').value=settings.sockPrices.S;$('#sockM').value=settings.sockPrices.M;$('#sockL').value=settings.sockPrices.L;
$('#cardBasic').value=settings.cardPrices.Basic;$('#cardPremium').value=settings.cardPrices.Premium;
$('#sRemind').value=settings.remindEvery;$('#sWarn').value=settings.warnMin;
$('#priceTables').innerHTML=AREA_KEYS.map(a=>{
const p=settings.play[a];
const row=c=>`<tr data-row="${a}:${c}"${c==='Premium'&&p.same?' hidden':''}><td><b>${c}</b></td>${DURS.map(d=>`<td><input type="number" min="0" step="1" data-a="${a}" data-c="${c}" data-m="${d.min}" value="${p[c][d.min]}"></td>`).join('')}</tr>`;
return `<div class="field"><span class="lbl" style="color:var(--ink);font-family:var(--display);font-size:18px">${esc(AREAS[a].label)} play prices (per player)</span>
<label class="check"><input type="checkbox" data-same="${a}"${p.same?' checked':''}><span>Same price for Basic and Premium card</span></label>
<div class="scroll"><table class="prices"><thead><tr><th>Card</th>${DURS.map(d=>`<th>${d.label}</th>`).join('')}</tr></thead><tbody>${row('Basic')}${row('Premium')}</tbody></table></div></div>`;
}).join('');
}
$('#priceTables').addEventListener('change',e=>{
const a=e.target.dataset&&e.target.dataset.same;if(!a)return;
const tr=$(`[data-row="${a}:Premium"]`);if(tr)tr.hidden=e.target.checked;
});
$('#saveSet').addEventListener('click',()=>{
if(!isAdmin())return;
const n=mergeSettings(null);
n.name=$('#sName').value.trim()||DEFAULTS.name;n.currency=$('#sCur').value.trim()||DEFAULTS.currency;
n.sockPrices={S:num($('#sockS').value),M:num($('#sockM').value),L:num($('#sockL').value)};
n.cardPrices={Basic:num($('#cardBasic').value),Premium:num($('#cardPremium').value)};
n.remindEvery=Math.min(30,Math.max(1,Math.round(Number($('#sRemind').value))||2));
n.warnMin=Math.min(30,Math.max(1,Math.round(Number($('#sWarn').value))||5));
AREA_KEYS.forEach(a=>{
const same=$(`[data-same="${a}"]`).checked;n.play[a].same=same;
$$(`#priceTables input[data-a="${a}"]`).forEach(i=>{n.play[a][i.dataset.c][i.dataset.m]=num(i.value)});
if(same)DURS.forEach(d=>{n.play[a].Premium[d.min]=n.play[a].Basic[d.min]});
});
settings=n;applySettings();renderSettings();renderAll();
Promise.all([B.saveSettings({name:n.name,currency:n.currency,remindEvery:n.remindEvery,warnMin:n.warnMin}),B.savePricing({sockPrices:n.sockPrices,cardPrices:n.cardPrices,play:n.play})])
.then(()=>toast('Settings saved.')).catch(writeErr);
});
$('#testBeep').addEventListener('click',()=>{if(!soundOn)toast('Sound is switched off at the top of the page.',true);beep()});
function applySettings(){$('#bizName').textContent=settings.name;document.title=settings.name+' \u00B7 Guest Tracker'}
function renderCounts(){
const now=Date.now(),act=sessions.filter(s=>s.status==='active');
$('#nDash').textContent=act.filter(s=>!isOver(s,now)).length;
const o=act.filter(s=>isOver(s,now)).length;$('#nOver').textContent=o;$('#nOver').classList.toggle('hot',o>0);
$('#nCompleted').textContent=sessions.filter(s=>s.status==='completed').length;
$('#nCancelled').textContent=sessions.filter(s=>s.status==='cancelled').length;
$('#nHistory').textContent=sessions.length;
}
function renderAll(){
if(!appReady)return;
$('#todayLine').textContent=(me?'Guest tracker':'Live view')+' \u00B7 '+new Date().toLocaleDateString([], {weekday:'long',day:'numeric',month:'long'});
renderCounts();
if(tab==='dash')renderDash();
else if(tab==='over')renderOver();
else if(tab==='customers')renderCustomers();
else if(tab==='stats')renderStats();
else if(tab==='team')renderTeam();
else if(tab in REC_TABS)renderRecords();
runReminders(Date.now());
}
function switchTab(t){
if(ADMIN_TABS.includes(t)&&!isAdmin())t='dash';
tab=t;
$$('#tabs [data-tab]').forEach(x=>x.setAttribute('aria-selected',String(x.dataset.tab===t)));
const isRec=t in REC_TABS;
['dash','over','customers','stats','team','settings'].forEach(v=>{$('#view-'+v).hidden=t!==v});
$('#view-records').hidden=!isRec;
if(t==='dash')buildBar('#dashFilters',FS.dash,baseKeys(),renderDash,true,false);
if(isRec){const keys=baseKeys();if(t==='history')keys.push('status');buildBar('#recFilters',FS[t],keys,renderRecords,true,true)}
if(t==='stats')buildBar('#statFilters',FS.stats,baseKeys(),renderStats,false,true);
if(t==='settings')renderSettings();
renderAll();
}
$('#tabs').addEventListener('click',e=>{const b=e.target.closest('[data-tab]');if(b)switchTab(b.dataset.tab)});
(async function boot(){
$$('img.logo').forEach(i=>{i.src=LOGO});
soundOn=lsGet('ufh4_sound')!=='0';syncSound();syncNotifBtn();
const wantDemo=false;
if(wantDemo){}
else if(!configured()){gateSetup();return}
else{
showGate('<p>Connecting...</p>');
try{B=await makeSupabaseBackend({url:CONFIG.supabaseUrl,key:CONFIG.supabaseKey},{recovery:()=>{recovering=true;gateRecovery()}})}
catch(e){
showGate('<p>Could not load the database tools. Check the internet connection and try again.</p><button class="btn primary block" id="retry">Try again</button>');
$('#retry').onclick=()=>location.reload();return;
}
}
B.onAuth(onAuthChange);
})();