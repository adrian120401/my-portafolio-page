const fs=require('node:fs');const assert=require('node:assert/strict');const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
 const target=await(await fetch('http://127.0.0.1:9334/json/new?about:blank',{method:'PUT',signal:AbortSignal.timeout(5000)})).json();
 const ws=new WebSocket(target.webSocketDebuggerUrl);await new Promise((resolve,reject)=>{ws.onopen=resolve;ws.onerror=reject;setTimeout(()=>reject(Error('CDP connect timeout')),8000);});
 let id=0;const pending=new Map();ws.onmessage=event=>{const m=JSON.parse(event.data);const c=pending.get(m.id);if(c){pending.delete(m.id);m.error?c.reject(Error(m.error.message)):c.resolve(m.result);}};
 const cdp=(method,params={})=>new Promise((resolve,reject)=>{const n=++id;pending.set(n,{resolve,reject});ws.send(JSON.stringify({id:n,method,params}));setTimeout(()=>{if(pending.has(n)){pending.delete(n);reject(Error('CDP timeout '+method));}},12000);});
 async function evaluate(expression){const r=await cdp('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;}
 async function wait(expression){for(let i=0;i<40;i++){if(await evaluate(expression))return;await sleep(250);}throw Error('Timeout '+expression);}
 async function shot(name){await evaluate('document.fonts.ready.then(()=>true)');const r=await cdp('Page.captureScreenshot',{format:'png'});fs.writeFileSync('../review/motion-'+name+'.png',Buffer.from(r.data,'base64'));return r.data;}
 await cdp('Page.enable');await cdp('Runtime.enable');await cdp('Emulation.setDeviceMetricsOverride',{width:1505,height:1045,deviceScaleFactor:1,mobile:false});
 await cdp('Page.navigate',{url:'http://localhost:3000/en'});await wait("!!document.querySelector('.system-viewport.is-ready canvas')");
 assert.equal(await evaluate("document.querySelectorAll('.gesture-canvas').length"),0);
 await evaluate("document.querySelector('#lab').scrollIntoView({behavior:'instant'})");await wait("!!document.querySelector('.gesture-viewport.is-ready canvas')");await sleep(800);const open=await shot('lab-webgl');
 await evaluate("document.querySelectorAll('.gesture-controls button')[1].click()");await sleep(800);const pinch=await shot('lab-webgl-pinch');assert.notEqual(open,pinch);
 await evaluate("document.querySelectorAll('.gesture-controls button')[2].click()");await sleep(800);assert.equal(await evaluate("document.querySelectorAll('.gesture-controls button')[2].getAttribute('aria-pressed')"),'true');
 await cdp('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});await cdp('Page.navigate',{url:'http://localhost:3000/es'});await wait("!!document.querySelector('.gesture-enable')");assert.equal(await evaluate("document.querySelectorAll('.gesture-canvas').length"),0);
 await evaluate("document.querySelector('.gesture-enable').click();document.querySelector('.gesture-explorer').scrollIntoView({behavior:'instant'})");await wait("!!document.querySelector('.gesture-viewport.is-ready canvas')");await sleep(800);await shot('lab-mobile-webgl');
 await evaluate("document.querySelector('.gesture-canvas canvas').dispatchEvent(new Event('webglcontextlost',{cancelable:true}))");await wait("!document.querySelector('.gesture-viewport.is-ready')");assert.match(await evaluate("document.querySelector('.gesture-copy [role=status]').innerText"),/diagrama/);
 await cdp('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});await sleep(300);assert.equal(await evaluate("document.querySelectorAll('canvas').length"),0);
 fs.writeFileSync('../review/motion-webgl-verification.json',JSON.stringify({date:new Date().toISOString(),browser:'Windows Chrome with WebGL2',deferredUntilLab:true,poseChangesPixels:true,controls:true,mobileOptIn:true,contextLossFallback:true,reducedMotionRemovesWebGL:true},null,2));
 console.log('PASS lab WebGL, poses, mobile, context loss and reduced motion');ws.close();await fetch('http://127.0.0.1:9334/json/close/'+target.id,{signal:AbortSignal.timeout(3000)});
})().catch(e=>{console.error(e);process.exitCode=1;});
