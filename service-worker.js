const CACHE_NAME = 'abdullah-portfolio-cache-v3';

const URLS_TO_CACHE = [
  './',
  './index.html',
  './about.html',
  './contact-us.html',
  './projects.html',
  './services.html',
  './thanks.html',
  './style.css',
  './script.js',
  './images/192.png',
  './images/512.png',
  './images/bg.png',
  './images/logo.png'
];

// Install
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching app assets');
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

// Activate
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// Fetch
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
