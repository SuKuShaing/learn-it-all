const button = document.querySelector('h1');

button.addEventListener('click', () => {
    Notification.requestPermission().then((result) => {
        if (result === 'granted') {
            const notification = new Notification("Example Notification", {
                body: Math.random(),
                data: { // La data es un objeto que puede contener cualquier información y puede ser usada después
                    hello: "world",
                    url: "https://www.example.com"
                },
                icon: "./shelter.png",
                // Tag es un identificador único para la notificación, si se envía una notificación con el mismo tag que otra, la notificación anterior se reemplazará
                // tag: "example-Tag"
            });

            notification.addEventListener('close', e => {
                console.log(e);
            });
        }
    });
});


let notification
let interval
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
        const leaveDate = new Date()
        interval = setInterval(() => {
            notification = new Notification("Come back please", {
                body: `you have been gone for ${(Math.round(new Date() - leaveDate))} seconds`,
                icon: "./shelter.png",
                tag: "come-back"
            })
        })
    } else {
        if (interval) clearInterval(interval)
        if(notification) notification.close()
    }
    // if (document.visibilityState === 'visible') {
    //     console.log("Tab is visible");
    // } else {
    //     console.log("Tab is not visible");
    // }
});