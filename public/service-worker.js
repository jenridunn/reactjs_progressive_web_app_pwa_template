//Caches the app's files for being used when the app is offline
this.addEventListener("install", event => {
    event.waitUntil(
        caches.open("appFiles").then(cache => {
            cache.addAll([
                '/static/js/main.chunk.js',
                '/static/js/0.chunk.js',
                '/static/js/bundle.js',
                '/index.html',
                '/static/js/vendors~main.chunk.js',
                '/',
                '/team'
            ])
        })
    )
})

//Fetches the app's files when the app is offline
this.addEventListener("fetch", event => {
    if (!navigator.onLine) {
        event.respondWith(
            caches.match(event.request).then(res => {
                if (res) {
                    return res
                }
                //this line caches all (online images for instance) remove it if you wanna have 
                // total control over the items you want to cache
                fetch(event.request.clone())
            })
        )
    }

})

this.addEventListener("message", event => {
    if (event.data && event.data.type === "TEST") {
        this.setTimeout(() => {
            this.registration.showNotification("This is a test", {
                body: event.data.data
            })
        }, 30000)
    }
})