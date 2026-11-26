const V='mylife-v2',FILES=['./','index.html','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png','icons/badge-96.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(FILES.map(f=>c.add(f).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  if(new URL(r.url).origin!==location.origin)return;
  e.respondWith(fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res})
    .catch(()=>caches.match(r).then(m=>m||(r.mode==='navigate'?caches.match('index.html'):null)||Response.error())));
});
self.addEventListener('notificationclick',e=>{
  e.notification.close();if(e.action==='tutup')return;
  const url=(e.notification.data&&e.notification.data.url)||'./';
  e.waitUntil(clients.openWindow(url));
});
