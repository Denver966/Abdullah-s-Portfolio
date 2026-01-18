const CACHE_NAME = 'abdullah-portfolio-cache-v6';

const URLS_TO_CACHE = [
  './',
  './index.html',
  './about.html',
  './contact-us.html',
  './projects.html',
  './services.html',
  './thanks.html',
  './style.css',
  './offline.html',   // Offline fallback page
  './one192.png',
  './two512.png',
  './bg.png',
  './logo.png'
];

// INSTALL
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      console.log('Caching HTML, CSS & offline assets');
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
        keys.map(key => key !== CACHE_NAME && caches.delete(key))
      )
    )
  );
});

// FETCH
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => response)
      .catch(async () => {
        // Try cache first
        const cachedResponse = await caches.match(event.request);
        return cachedResponse || caches.match('./offline.html');
      })
  );
});
