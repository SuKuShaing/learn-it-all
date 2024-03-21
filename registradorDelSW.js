const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) { // Verifica si el navegador soporta service workers
        try {
            const registration = await navigator.serviceWorker.register('./serviceWorker.js');

            // Verifica si hay una nueva versión del worker
            registration.addEventListener('updatefound', () => {
                console.log('New worker being installed => ', registration.installing);
            });

        } catch (error) {
            console.error('Failed to register service worker', error);
        }
    } else {
        console.error('Service workers are not supported');
    }
}

registerServiceWorker();