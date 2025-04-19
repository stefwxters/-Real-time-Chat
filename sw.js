self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('message', (event) => {
  if (event.data.type === 'queueMessage') {
    // Store message in IndexedDB (simplified)
    console.log('Queuing message:', event.data.message);
    // In production, save to IndexedDB and sync when online
  }
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
