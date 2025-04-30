const CACHE_NAME = 'my-smart-list-cache-v1';
const urlsToCache = [
  '/',
  '/index1.html',
  '/index2.html',
  '/offline.html',
  '/manifest.json',
  '/server.js',
  '/package-lock.html',
  '/package.json',
  '/service-worker.js',
  'icons/icon-192.png',
  'icons/icon-512.png',
  // Ajoute ici tous les fichiers nécessaires : CSS, JS, images
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
      console.log('Cache ouvert');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
    .then(function(response) {
      if (response) {
        return response; // Retourne la ressource depuis le cache
      }
      return fetch(event.request); // Sinon essaie depuis le réseau
    })
  );
});

self.addEventListener('activate', function(event) {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
