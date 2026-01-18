const CACHE_NAME = 'abdullah-portfolio-cache-v9';

const URLS_TO_CACHE = [
  '/Abdullah-s-Portfolio/',
  '/Abdullah-s-Portfolio/index.html',
  '/Abdullah-s-Portfolio/about.html',
  '/Abdullah-s-Portfolio/contact-us.html',
  '/Abdullah-s-Portfolio/projects.html',
  '/Abdullah-s-Portfolio/services.html',
  '/Abdullah-s-Portfolio/thanks.html',
  '/Abdullah-s-Portfolio/style.css',
  '/Abdullah-s-Portfolio/offline.html',
  '/Abdullah-s-Portfolio/one192.png',
  '/Abdullah-s-Portfolio/two512.png',
  '/Abdullah-s-Portfolio/bg.png',
  '/Abdullah-s-Portfolio/logo.png'
];

// INSTALL
self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      for (const url of URLS_TO_CACHE) {
        try {
          await cache.add(url);
        } catch (err) {
          console.warn('Caching failed for:', url);
        }
      }
    })()
  );
});

// ACTIVATE
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => key !== CACHE_NAME && caches.delete(key)))
    )
  );
});

// FETCH - Cache first then network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request)
        .then(response => {
          // Update cache dynamically
          if (event.request.url.startsWith('http')) {
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, response.clone()));
          }
          return response;
        })
        .catch(() => caches.match('/Abdullah-s-Portfolio/offline.html'));
    })
  );
});
