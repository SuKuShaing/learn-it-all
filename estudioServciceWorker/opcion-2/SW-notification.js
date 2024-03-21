console.log('This is the service worker againg 2');

// new Notification('Hola Seba, Esta es la 1era notificación');
self.registration.showNotification('Hola Seba, Esta es la 1era notificación');

// setInterval(() => {
//     new Notification('Hola Seba, Esta es la segunda notificación');
// }, 60000);

// Cada 60 segundos mostrar una notificación
setTimeout(() => {
    self.registration.showNotification('Hola Seba, Esta es la segunda notificación');
}, 60000);