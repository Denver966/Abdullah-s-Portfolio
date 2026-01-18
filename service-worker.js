const CACHE_NAME = 'abdullah-portfolio-cache-v5';

const URLS_TO_CACHE = [
  './',
  './index.html',
  './about.html',
  './contact-us.html',
  './projects.html',
  './services.html',
  './thanks.html',
  './style.css',
  './images/192.png',
  './images/512.png',
  './images/bg.png',
  './images/logo.png'
];

// INSTALL
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      console.log('Caching HTML & CSS assets');
      for (const url of URLS_TO_CACHE) {
        try {
          await cache.add(url);
        } catch (err) {
          console.warn('Skip missing file:', url);
        }
      }
    })
  );
});

// ACTIVATE
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

// FETCH
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
