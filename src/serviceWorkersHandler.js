//VAPID KEYS GENERATOR: https://vapidkeys.com/
const PUBLIC_VAPID_KEY = "BC4KXjUroP1xu6ynzrCpLL0YGBfyaI_HZUMXpdBoTfjdPvr9cCem9ICgujAXnZhygb4WeVXXURdlZQyBd2qaOO8"

const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4)
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/')

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; i++) {
        outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
}

const serviceWorkersRegisterer = () => {
    let serviceWorkerUrl = `${process.env.PUBLIC_URL}/service-worker.js`
    navigator.serviceWorker.register(serviceWorkerUrl).then(res => {
        console.log("response", res)

        //Subscribing to push notifications
        return res.pushManager.getSubscription().then(_ => {
            if (!('PushManager' in window)) {
                console.log('Push messaging isn\'t supported.');
                return;
            }
            if (Notification.permission === 'denied') {
                console.log('The user has blocked notifications.');
                return;
            }
            res.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
            })
        })


    })
}

export default serviceWorkersRegisterer