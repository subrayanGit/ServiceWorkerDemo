const cachedName = 'v1';
const cachedAssets = [
    'index.html',
    'mobile.html',
];

// call install event
self.addEventListener('install', (e) => {
    console.log('Service Worker Installed');
    e.waitUntil(
        caches
            .open(cachedName)
            .then(cache => {
                console.log('Service Worker Caching Files');
                cache.addAll(cachedAssets);
            })
            .then(() => self.skipWaiting())
    )
});

// call Activate event
self.addEventListener('activate', (e) => {
    console.log('Service Worker Activated');
    // remove old cachs 
    e.waitUntil(
      caches.keys().then(cacheNames =>{
        return Promise.all(
            cacheNames.map(cache => {
                if(cache !== cachedName){
                    console.log('Service Worker Clearing Old Cache');
                    return caches.delete(cache);
                }        
            })
        )
    })
    )
});


// call fetch event
self.addEventListener('fetch', e =>{
    console.log('Service Worker Fetch');
    e.respondWith(
        fetch(e.request).catch(()=> caches.match(e.request))
    )
})