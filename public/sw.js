const CACHE_NAME = 'benzbakery-v1';
const ASSETS = [
  '/',
  '/Home-Background.webp',
  '/_next/static/css/*.css',
  '/_next/static/chunks/*.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request)
      .then(response => response || fetch(e.request))
  );
});