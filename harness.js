const { chromium } = require('playwright');
const fs=require('fs'),http=require('http'),path=require('path');
const FAKE=fs.readFileSync(__dirname+'/fake_supabase.js','utf8');
async function serve(dir){return new Promise(r=>{const s=http.createServer((q,res)=>{const f=path.join(dir,q.url.split('?')[0]==='/'?'index.html':q.url.split('?')[0]);fs.readFile(f,(e,d)=>{if(e){res.writeHead(404);res.end()}else{res.writeHead(200,{'Content-Type':f.endsWith('.js')?'text/javascript':'text/html'});res.end(d)}})}).listen(0,()=>r(s))})}
async function open(dir,opts){
  const s=await serve(dir),port=s.address().port;
  const b=await chromium.launch(),ctx=await b.newContext({viewport:{width:1300,height:1300}});
  const p=await ctx.newPage();const errs=[];
  if(opts&&opts.time){await p.addInitScript(t=>{const off=t-Date.now(),R=Date;class D extends R{constructor(...a){if(a.length===0)super(R.now()+off);else super(...a)} static now(){return R.now()+off}};window.Date=D},opts.time)}
  p.on('pageerror',e=>errs.push('PAGEERR '+e.message));
  p.on('console',m=>{if(m.type()==='error'&&!/ERR_NAME_NOT_RESOLVED|vibrate|Failed to load resource|googleapis/.test(m.text()))errs.push(m.text())});
  await p.route('**/cdn.jsdelivr.net/**',r=>r.fulfill({status:200,contentType:'application/javascript',body:FAKE}));
  await p.route('**/fonts.g*/**',r=>r.abort());
  await p.goto('http://localhost:'+port+'/index.html');await p.waitForTimeout(900);
  const login=async(email)=>{await p.click('#loginBtn');await p.fill('#lgEmail',email);await p.fill('#lgPass','pw123456');await p.click('#lgGo');await p.waitForTimeout(900)};
  const logout=async()=>{await p.click('#signOutBtn');await p.waitForTimeout(500)};
  const done=async()=>{await b.close();s.close()};
  return {p,errs,login,logout,done,txt:async sel=>(await p.textContent(sel)).replace(/\s+/g,' ').trim(),vis:s=>p.isVisible(s),
    toast:async()=>await p.evaluate(()=>[...document.querySelectorAll('.toast')].map(t=>t.textContent).pop()||'')};
}
module.exports={open};
