const CACHE_NAME = 'v1';
const CACHE_URLS = [
  '/',
  '/np/index.html',
  '/en/index.html',
  '/assets/styles.css',
  '/assets/script.js',
  '/images/logo.png', // Add any other assets you want to cache
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching initial resources');
      return cache.addAll(CACHE_URLS);
    })
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated');
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // If the request is found in cache, return it
      if (cachedResponse) {
        return cachedResponse;
      }

      // Otherwise, fetch from the network
      return fetch(event.request);
    })
  );
});
