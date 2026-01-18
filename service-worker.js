const CACHE_NAME = 'abdullah-portfolio-cache-v8';

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
