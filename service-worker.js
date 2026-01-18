const CACHE_NAME = 'abdullah-portfolio-cache-v2';
const URLS_TO_CACHE = [
  '/Abdullah-s-Portfolio/index.html',
  '/Abdullah-s-Portfolio/about.html',
  '/Abdullah-s-Portfolio/contact-us.html',
  '/Abdullah-s-Portfolio/projects.html',
  '/Abdullah-s-Portfolio/services.html',
  '/Abdullah-s-Portfolio/thanks.html',
  '/Abdullah-s-Portfolio/style.css',
  '/Abdullah-s-Portfolio/script.js',
  '/Abdullah-s-Portfolio/images/192.png',
  '/Abdullah-s-Portfolio/images/512.png',
  '/Abdullah-s-Portfolio/images/bg.png',
  '/Abdullah-s-Portfolio/images/logo.png'
];

// Install event - cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching app assets');
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('Removing old cache', key);
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// Fetch event - serve cached content if offline
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => caches.match(event.request).then(resp => resp))
  );
});
