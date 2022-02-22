var CACHE_NAME = 'my-site-cache-v1'; //disarankan nama menggunakan versi agar ketika update mudah
var urlsToCache = [
    '/',
    '/css/main.css',
    '/js/jquery.min.js',
    '/js/main.js',
    'images/logo.jpg'
];

self.addEventListener('install', function (event) { //Ketika sw di install maka
    // Perform install steps
    event.waitUntil( //event dipanggil
        caches.open(CACHE_NAME) //buka caches dan panggil nama cachenya
            .then(function (cache) {
                console.log('in install serviceworker... cache openend!');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        // console.log(event.request)
        caches.match(event.request).then(function (response) {
            // Cache hit - return response
            if (response) {
                return response;
            }
            return fetch(event.request);
        }
        )
    );
});


self.addEventListener('activate', function (event) {

    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    return cacheName != CACHE_NAME
                }).map(function (cacheName) {
                    return caches.delete(cacheName)
                })
            );
        })
    );
});




