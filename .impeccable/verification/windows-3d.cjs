if (process.argv.includes('--close')) {
 fetch('http://127.0.0.1:9334/json/version').then(r => r.json()).then(info => {
  const ws = new WebSocket(info.webSocketDebuggerUrl);
  ws.onopen = () => { ws.send(JSON.stringify({ id: 1, method: 'Browser.close' })); };
  ws.onerror = () => process.exitCode = 1;
 }).catch(error => { console.error(error.message); process.exitCode = 1; });
} else {
// Browser diagnostic: run with Windows Node.js against a dedicated local Chrome CDP profile.
const fs = require('node:fs');
const assert = require('node:assert/strict');
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
(async () => {
 const target = await (await fetch('http://127.0.0.1:9334/json/new?about:blank', { method: 'PUT' })).json();
 const ws = new WebSocket(target.webSocketDebuggerUrl);
 await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
 let id = 0; const pending = new Map();
 ws.onmessage = event => { const message = JSON.parse(event.data); const callback = pending.get(message.id); if(callback) { pending.delete(message.id); message.error ? callback.reject(new Error(message.error.message)) : callback.resolve(message.result); } };
 function cdp(method, params = {}) { return new Promise((resolve, reject) => { const request = ++id; pending.set(request, { resolve, reject }); ws.send(JSON.stringify({ id: request, method, params })); }); }
 async function evaluate(expression) { const result = await cdp('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }); if(result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails)); return result.result.value; }
 async function wait(expression) { for(let i=0;i<40;i++) { if(await evaluate(expression)) return; await sleep(300); } throw new Error('Timed out: '+expression); }
 async function screenshot(name) { await evaluate('document.fonts.ready.then(()=>true)'); const r=await cdp('Page.captureScreenshot',{format:'png'}); fs.writeFileSync('../review/'+name+'.png',Buffer.from(r.data,'base64'));return r.data; }
 await cdp('Page.enable'); await cdp('Runtime.enable');
 await cdp('Emulation.setDeviceMetricsOverride',{width:1505,height:1045,deviceScaleFactor:1,mobile:false});
 await cdp('Page.navigate',{url:'http://localhost:3000/en'});
 await wait("!!document.querySelector('.system-viewport.is-ready canvas')");await sleep(1000);
 const renderer=await evaluate("(()=>{const g=document.createElement('canvas').getContext('webgl2');return g?g.getParameter(g.VERSION):null})()");assert.ok(renderer);
 const before=await screenshot('desktop-3d');
 await evaluate("document.querySelector('.scene-toolbar button').click()");await sleep(1100);const assembled=await screenshot('desktop-3d-assembled');assert.notEqual(before,assembled);
 await evaluate("document.querySelectorAll('.layer-controls button')[1].focus(); document.querySelectorAll('.layer-controls button')[1].click()");assert.equal(await evaluate("document.querySelectorAll('.layer-controls button')[1].getAttribute('aria-pressed')"),'true');
 await cdp('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
 await cdp('Page.navigate',{url:'http://localhost:3000/es'});await wait("!!document.querySelector('.enable-scene')");assert.equal(await evaluate("document.querySelectorAll('.system-canvas canvas').length"),0);
 await evaluate("document.querySelector('.enable-scene').click()");await wait("!!document.querySelector('.system-viewport.is-ready canvas')");await evaluate("document.querySelector('.system-explorer').scrollIntoView()");await sleep(1000);await screenshot('mobile-3d');
 await evaluate("document.querySelector('.system-canvas canvas').dispatchEvent(new Event('webglcontextlost',{cancelable:true}))");await wait("!document.querySelector('.system-viewport.is-ready')");assert.match(await evaluate("document.querySelector('[role=status]').innerText"),/estático/);
 const result={date:new Date().toISOString(),browser:'Windows Chrome CDP dedicated profile',webgl2:renderer,desktopCanvas:true,assembleChangesPixels:true,layerControls:true,mobileOptIn:true,contextLossFallback:true};fs.writeFileSync('../review/webgl-verification.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result));
 ws.close();await fetch('http://127.0.0.1:9334/json/close/'+target.id);
})().catch(error=>{console.error(error);process.exitCode=1;});

}
