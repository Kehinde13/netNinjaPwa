const staticCache = 'site-static-v1';
const dynamicCache = 'site-dynamic-v1'
const assets = [
  '/static/js/bundle.js',
  '/',
  '/index.html',
  '/FallbackPage'
]


//cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if(keys.length > size){
        cache.delete(keys[0]).then(limitCacheSize(name, size))
      }
    })
  })
}

//install service worker and add the static assets to the cache
self.addEventListener("install", evt => {
  //waitUntil method waits till the static assets has been cached
  evt.waitUntil(
    caches.open(staticCache).then(cache => {
      //addAll adds the assets to the cache
      cache.addAll(assets)
    })
  )

})

//activate service worker 
self.addEventListener('activate', evt => {
  // to delete the old cache incase of any update on the static cache
  evt.waitUntil(
    //the keys are the name of the caches
    caches.keys().then(keys => {
      // to delete the previously stored caches
      // promise.all takes an array of promises
      return Promise.all(keys
        //check all the keys to see the one's that doesnt match the current cache
        .filter(key => key !== staticCache && key !== dynamicCache)
        //then delete all the cache that doesnt match the cueent cache
        .map(key => caches.delete(key))
        ) 
    })
  )
})

// fetch event
self.addEventListener("fetch", evt => {
  //to respond with the resource from the cache instead of going to the server


  if (!(evt.request.url.indexOf('http') === 0)) return; //this code is to fix a chrome error
  evt.respondWith(
    //first check if the request mathes something in our cache
    caches.match(evt.request).then(cacheRes => {
      //the cacheRes stores the response of the request but incase we don't have the request in the cache
      //we use a conditional statement to return the actual fetch request
      return cacheRes || fetch(evt.request)
      //to store any fetch request that isnt already in the static cache to the dynamic cache
      .then(async fetchRes => {
        const cache = await caches.open(dynamicCache);
        //cache.put to store the fecth request into the dynamic cache
        //and clone is to clone the response so we can return a copy and save the other copy
        cache.put(evt.request.url, fetchRes.clone());
        //function to delete excess cache 
        limitCacheSize(dynamicCache, 15)
        return fetchRes;
      })
      //to send the user to the fallback page nothing matches the request url 
    }).catch(() => caches.match('/FallbackPage'))
  )
})