const CACHE_DYNAMIC_NAME = 'dynamic-v1';
const PHOTO_URL =
  'https://firebasestorage.googleapis.com/v0/b/calvin-hu.appspot.com/o/photography';

self.addEventListener('fetch', event => {
  if (event.request.url.includes(PHOTO_URL) > 0) cacheNetworkFallback(event);
});

cacheNetworkFallback = event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) return response;
      else {
        return fetch(event.request)
          .then(response => {
            return caches.open(CACHE_DYNAMIC_NAME).then(cache => {
              cache.put(event.request.url, response.clone());
              return response;
            });
          })
          .catch(error => console.log('Cache Network Fallback Error: ', error));
      }
    })
  );
};
