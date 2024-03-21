const notificacrBtn = document.querySelector('h1');

// Pedir permiso para enviar notificaciones
notificacrBtn.addEventListener('click', () => {
    Notification.requestPermission().then((result) => {
        console.log('Respuesta: ', result);
    });
});

// Enviar notificación
const verNotificacion = document.querySelector('nav');

verNotificacion.addEventListener('click', () => {
    if (Notification.permission === 'granted') {
        const notification = new Notification('Hola Seba',{
            icon: './shelter.png',
            body: 'Este es el cuerpo de la notificación',
        });

        // Al hacer click en la notificación, se abre una nueva pestaña
        notification.onclick = function() {
            window.open('https://www.google.com');
        }
    }
}); 