const cachedName = 'v1';


// call install event
self.addEventListener('install', (e) => {
    console.log('Service Worker Installed');
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
        fetch(e.request)
            .then(req => {
                //Make clone of response
                const resClone = res.clone();
                caches.open(cachedName)
                    .then(cache => {
                        // add response cache
                        cache.put(e.request, resClone);
                    });
                return res;    
            }).catch(err => caches.match(e.request).then(res => res))
    );
})