// Service worker kecil untuk My Life: menampilkan notifikasi absen dengan tombol aksi.
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',()=>{});
self.addEventListener('notificationclick',e=>{
  e.notification.close();
  if(e.action==='tutup')return;
  const url=(e.notification.data&&e.notification.data.url)||'https://mahasiswa.unsam.ac.id/';
  e.waitUntil(self.clients.openWindow(url));
});
