const CACHE_NAME = 'mahika-trans-v1';
// Cukup daftarkan file HTML dan Ikon saja
const assets = [
  'pwa-dash.html', // Sesuaikan nama file dashboardmu
  'shuttle-bus.png'       // Sesuaikan nama file ikonmu
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => {
      return res || fetch(event.request);
    })
  );
});
