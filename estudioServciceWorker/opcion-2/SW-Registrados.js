// Otra forma

// Verifica si el navegador soporta service workers y notificaciones
const checkPermission = () => {
    // Verifica si el navegador soporta service workers
    if (!('serviceWorker' in navigator)) {
        throw new Error( "No support for service worker!")
    }
    
    // Verifica si el navegador soporta notificaciones
    if(!('Notification' in window)) {
        throw new Error( "No support for notifications!")
    }
}

// En caso que soporte, Registra el service worker
const registerSW = async () => {
    const registration = await navigator.serviceWorker.register('SW-notification.js');
    return registration;
};

/////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////// Registration Permition ////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

const requestNotificationPermission = async () => {
    // Pregunta al usuario si quiere recibir notificaciones
    const permission = await Notification.requestPermission();
    
    // Si el usuario no da permiso para recibir notificaciones, lanza un error
    if (permission !== 'granted') {
        throw new Error('Permission not granted for Notification');
    } 
    /* else {
        // Si el usuario da permiso para recibir notificaciones, envía una notificación de prueba
        new Notification('Hola Seba');

        // establecer un intrevalo de 1 mintuto para enviar una 2da notificación
        setInterval(() => {
            new Notification('Hola Seba, Esta es la segunda notificación');
        }, 60000);
    }*/
}

const main = async () => {
    checkPermission()
    await requestNotificationPermission()
    await registerSW()
    // const reg = await registerSW()
    // reg.showNotification("Hola SebaMundo")
}
