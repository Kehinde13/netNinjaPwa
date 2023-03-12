if('serviceWorker' in navigator)  //to check if the browser supports service worker
{
  navigator.serviceWorker.register('/sw.js') //to register the service worker
   .then((reg) => console.log("service worker registered", reg))
   .catch((err) => console.log("service worker not registered", err))
}