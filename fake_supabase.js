export function createClient(){
  const w=window;
  if(!w.__db){
    const now=Date.now();
    w.__db={staff:[{email:'ufih.bg@gmail.com',name:'Owner',role:'admin',active:true,created_at:now},{email:'staff@test.com',name:'Staff One',role:'staff',active:true,created_at:now}],
      app_settings:[],app_pricing:[
        {id:'offers',data:{offers:[{id:'student',name:'Student offer',pct:20,days:[1,2,3,4,5],from:'10:00',to:'18:00',durations:[60,120],areas:['trampoline','softplay'],needId:true,active:true}]}},
        {id:'drafts',data:{drafts:[{area:'trampoline',min:60,socks:'M',card:'Basic',ctype:'new'},{area:'trampoline',min:60,socks:'L',card:'Basic',ctype:'new'},{area:'trampoline',min:60,socks:'No socks',card:'Basic',ctype:'existing'},{area:'softplay',min:60,socks:'S',card:'Basic',ctype:'new'}]}}],
      guests:[],contacts:[],billing:[],payment_status:[]};
    w.__accounts={'ufih.bg@gmail.com':'pw123456','staff@test.com':'pw123456'};
    w.__session=null;w.__authCbs=[];w.__channels=[];w.__log=[];
  }
  const db=w.__db;
  const role=()=>{const s=w.__session;if(!s)return 'anon';const r=db.staff.find(x=>x.email===s.user.email);if(s.user.email==='ufih.bg@gmail.com')return 'admin';return r&&r.active?r.role:'anon'};
  const isStaff=()=>['staff','admin'].includes(role()),isAdmin=()=>role()==='admin';
  const READ={guests:()=>true,app_settings:()=>true,staff:()=>role()!=='anon',contacts:isStaff,billing:isAdmin,payment_status:isStaff,app_pricing:isStaff};
  const WRITE={guests:{insert:isStaff,update:isStaff,delete:isAdmin},contacts:{insert:isStaff,update:isStaff,delete:isStaff},billing:{insert:isAdmin,update:isAdmin,delete:isAdmin},
    staff:{insert:isAdmin,update:isAdmin,delete:isAdmin},app_settings:{insert:isAdmin,update:isAdmin,delete:isAdmin},app_pricing:{insert:isAdmin,update:isAdmin,delete:isAdmin},payment_status:{insert:()=>false,update:()=>false,delete:()=>false}};
  const emit=(table,type,nw,old)=>{w.__channels.forEach(c=>{c.handlers.forEach(h=>{if(h.table===table&&c.on)h.cb({eventType:type,new:nw,old:old})})})};
  const clone=o=>JSON.parse(JSON.stringify(o));
  const perm=e=>({data:null,error:{code:'42501',message:e||'permission denied'}});
  const pk={staff:'email'};
  const syncPS=b=>{if(!b)return;const due=+b.total+ +b.ext_total+ +b.adjust,paid=+b.paid_amount;const st=due<=0?'paid':paid>=due?'paid':paid<=0?'pending':'partial';
    const row={id:b.id,start_at:b.start_at,due,balance:Math.max(due-paid,0),status:st};const i=db.payment_status.findIndex(x=>x.id===b.id);if(i<0){db.payment_status.push(row);emit('payment_status','INSERT',row)}else{db.payment_status[i]=row;emit('payment_status','UPDATE',row,row)}};
  const putBill=row=>{const i=db.billing.findIndex(x=>x.id===row.id);if(i<0){db.billing.push(row);emit('billing','INSERT',clone(row))}else{db.billing[i]=row;emit('billing','UPDATE',clone(row),clone(row))}syncPS(row)};
  const bdef={play:0,socks:0,card:0,discount:0,disc_type:'none',disc_val:0,total:0,ext_total:0,adjust:0,paid_amount:0,cash:0,upi:0,card_amt:0,paid_by:null,paid_at:null,offer:null,ext_list:[]};
  const rpcs={
    billing_create:a=>{const p=a.p;if(!isStaff())return perm();if(db.billing.some(x=>x.id===p.id))return {data:null,error:null};
      const total=+p.total||0,paid=!!p.paid,upi=String(p.pay_method||'cash').toLowerCase()==='upi',part=('cash_amt' in p&&p.cash_amt!==undefined)||('upi_amt' in p&&p.upi_amt!==undefined);
      let pa,cash,upv;if(part){const pc=Math.min(Math.max(+p.cash_amt||0,0),total),pu=Math.min(Math.max(+p.upi_amt||0,0),total-pc);cash=pc;upv=pu;pa=pc+pu}else{pa=paid?total:0;cash=paid&&!upi?total:0;upv=paid&&upi?total:0}
      putBill(Object.assign({},bdef,{id:p.id,start_at:+p.start_at||0,play:+p.play||0,socks:+p.socks||0,card:+p.card||0,discount:Math.max(+p.discount||0,0),disc_type:['pct','amt'].includes(String(p.disc_type).toLowerCase())?String(p.disc_type).toLowerCase():'none',disc_val:Math.max(+p.disc_val||0,0),total,paid_amount:pa,cash,upi:upv,paid_by:p.paid_by||null,paid_at:pa>0?Date.now():null,offer:p.offer?String(p.offer).slice(0,60):null}));return {data:null,error:null}},
    billing_set_paid:a=>{if(!isStaff())return perm();const b=db.billing.find(x=>x.id===a.p_id);if(!b)return {data:null,error:null};const bill=+b.total+ +b.ext_total+ +b.adjust,upi=a.p_method==='upi';
      if(a.p_paid){const rem=Math.max(bill-b.paid_amount,0);b.paid_amount=Math.max(bill,0);if(upi)b.upi+=rem;else b.cash+=rem;b.paid_at=Date.now();b.paid_by=a.p_by}else{b.paid_amount=0;b.cash=0;b.upi=0;b.card_amt=0;b.paid_at=Date.now();b.paid_by=a.p_by}putBill(b);return {data:null,error:null}},
    billing_add_payment:a=>{if(!isStaff())return perm();const b=db.billing.find(x=>x.id===a.p_id);if(!b)return {data:null,error:null};const room=Math.max(+b.total+ +b.ext_total+ +b.adjust-b.paid_amount,0),c=Math.min(Math.max(+a.p_cash||0,0),room),u=Math.min(Math.max(+a.p_upi||0,0),room-c);if(c+u<=0)return {data:null,error:null};b.cash+=c;b.upi+=u;b.paid_amount+=c+u;b.paid_by=a.p_by;b.paid_at=Date.now();putBill(b);return {data:null,error:null}},
    billing_set_discount:a=>{if(!isStaff())return perm();const b=db.billing.find(x=>x.id===a.p_id);if(!b)return {data:null,error:null};const t=['pct','amt'].includes(String(a.p_type).toLowerCase())?String(a.p_type).toLowerCase():'none',v=Math.max(+a.p_val||0,0);
      const d=t==='pct'?Math.round(b.play*Math.min(100,v)/100):t==='amt'?Math.min(b.play,Math.round(v)):0;b.disc_type=t;b.disc_val=t==='none'?0:v;b.discount=d;b.total=b.play-d+b.socks+b.card;b.offer=null;putBill(b);return {data:null,error:null}},
    billing_set_method:a=>{if(!isStaff())return perm();const b=db.billing.find(x=>x.id===a.p_id);const m=String(a.p_method||'').toLowerCase();if(!b||!['cash','upi'].includes(m)||!(b.paid_amount>0))return {data:null,error:null};b.cash=m==='upi'?0:b.paid_amount;b.upi=m==='upi'?b.paid_amount:0;b.card_amt=0;putBill(b);return {data:null,error:null}},
    billing_update_items:a=>{if(!isStaff())return perm();const b=db.billing.find(x=>x.id===a.p_id);if(!b)return {data:null,error:null};const play=Math.max(+a.p_play||0,0),socks=Math.max(+a.p_socks||0,0),card=Math.max(+a.p_card||0,0);
      const d=b.disc_type==='pct'?Math.round(play*Math.min(100,Math.max(0,b.disc_val))/100):b.disc_type==='amt'?Math.min(play,Math.round(Math.max(0,b.disc_val))):0;Object.assign(b,{play,socks,card,discount:d,total:play-d+socks+card});putBill(b);return {data:null,error:null}},
    billing_add_ext:a=>{if(!isStaff())return perm();const b=db.billing.find(x=>x.id===a.p_id);if(!b)return {data:null,error:null};b.ext_total+= +a.p_price;b.ext_list=(b.ext_list||[]).concat([{price:+a.p_price,min:+a.p_min}]);putBill(b);return {data:null,error:null}},
    guest_add_time:a=>{if(!isStaff())return perm();const g=db.guests.find(x=>x.id===a.p_id);if(!g)return {data:null,error:null};g.duration_min=+g.duration_min+ +a.p_min;g.extensions=(g.extensions||[]).concat([{min:+a.p_min,by:a.p_by,at:+a.p_at}]);emit('guests','UPDATE',clone(g),clone(g));return {data:null,error:null}}
  };
  function builder(table){
    const st={op:'select',filters:[],orders:[],range:null,payload:null,opts:null,single:false};
    const b={
      select(){return b},insert(p){st.op='insert';st.payload=p;return b},update(p){st.op='update';st.payload=p;return b},
      upsert(p,o){st.op='upsert';st.payload=p;st.opts=o||{};return b},delete(){st.op='delete';return b},
      eq(c,v){st.filters.push(r=>String(r[c])===String(v));return b},gte(c,v){st.filters.push(r=>Number(r[c])>=Number(v));return b},
      order(c,o){st.orders.push({c,asc:!(o&&o.ascending===false)});return b},range(a,z){st.range=[a,z];return b},maybeSingle(){st.single=true;return b},
      then(res,rej){return Promise.resolve().then(run).then(res,rej)}
    };
    function run(){
      const key=pk[table]||'id',rows=db[table];
      if(st.op==='select'){
        if(!(READ[table]&&READ[table]()))return {data:[],error:null};
        let out=rows.filter(r=>st.filters.every(f=>f(r)));
        st.orders.slice().reverse().forEach(o=>{out=out.slice().sort((x,y)=>{const a=x[o.c],c=y[o.c];return (a<c?-1:a>c?1:0)*(o.asc?1:-1)})});
        if(st.range)out=out.slice(st.range[0],st.range[1]+1);
        out=clone(out);return {data:st.single?(out[0]||null):out,error:null};
      }
      const W=WRITE[table]||{};
      if(st.op==='insert'){if(!(W.insert&&W.insert()))return perm('new row violates row-level security policy');
        for(const p of [].concat(st.payload)){if(rows.some(r=>r[key]===p[key]))return {data:null,error:{code:'23505',message:'duplicate key'}};const row=clone(p);if(table==='guests'){row.paused_ms=row.paused_ms||0;row.extensions=row.extensions||[]}rows.push(row);emit(table,'INSERT',clone(row))}return {data:null,error:null}}
      if(st.op==='upsert'){const oc=(st.opts&&st.opts.onConflict)||key;if(!(W.insert&&W.insert()))return perm('new row violates row-level security policy');
        for(const p of [].concat(st.payload)){const i=rows.findIndex(r=>r[oc]===p[oc]);if(i<0){const row=clone(p);if(table==='billing')Object.assign(row,Object.assign({},bdef,row));rows.push(row);emit(table,'INSERT',clone(row));if(table==='billing')syncPS(row)}else{Object.assign(rows[i],clone(p));emit(table,'UPDATE',clone(rows[i]),clone(rows[i]));if(table==='billing')syncPS(rows[i])}}return {data:null,error:null}}
      if(st.op==='update'){if(!(W.update&&W.update()))return perm('permission denied');rows.forEach(r=>{if(st.filters.every(f=>f(r))){Object.assign(r,clone(st.payload));emit(table,'UPDATE',clone(r),clone(r));if(table==='billing')syncPS(r)}});return {data:null,error:null}}
      if(st.op==='delete'){if(!(W.delete&&W.delete()))return perm('permission denied');for(let i=rows.length-1;i>=0;i--){const r=rows[i];if(st.filters.every(f=>f(r))){rows.splice(i,1);emit(table,'DELETE',null,clone(r));if(table==='guests'){['billing','contacts','payment_status'].forEach(t=>{const j=db[t].findIndex(x=>x.id===r.id);if(j>=0)db[t].splice(j,1)})}}}return {data:null,error:null}}
    }
    return b;
  }
  const sess=email=>({user:{email,id:'uid_'+email}});
  return {
    from:t=>builder(t),
    rpc:async(n,a)=>{w.__log.push(n);const f=rpcs[n];if(!f)return {data:null,error:{code:'42883',message:'function '+n+' does not exist'}};return f(a)},
    channel:name=>{const c={name,handlers:[],on:false};w.__channels.push(c);const o={on(ev,f,cb){c.handlers.push({table:f.table,cb});return o},subscribe(cb){c.on=true;setTimeout(()=>cb&&cb('SUBSCRIBED'),0);return o}};return o},
    removeChannel(){},
    auth:{
      getSession:async()=>({data:{session:w.__session}}),
      onAuthStateChange:cb=>{w.__authCbs.push(cb);return {data:{subscription:{unsubscribe(){}}}}},
      signInWithPassword:async({email,password})=>{const e=String(email).toLowerCase();if(w.__accounts[e]!==password)return {error:{code:'invalid_credentials',message:'Invalid login credentials'}};w.__session=sess(e);w.__authCbs.forEach(cb=>cb('SIGNED_IN',w.__session));return {error:null}},
      signOut:async()=>{w.__session=null;w.__authCbs.forEach(cb=>cb('SIGNED_OUT',null));return {}},
      signUp:async()=>({data:{user:{identities:[{}]},session:null},error:null}),resetPasswordForEmail:async()=>({error:null}),updateUser:async()=>({error:null})
    }
  };
}
