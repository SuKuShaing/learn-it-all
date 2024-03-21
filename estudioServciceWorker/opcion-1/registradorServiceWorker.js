const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) { // Verifica si el navegador soporta service workers
        try {
            const registration = await navigator.serviceWorker.register('./service-worker.js');

            // Verifica si hay una nueva versión del worker
            registration.addEventListener('updatefound', () => {
                console.log('New worker being installed => ', registration.installing);
            });

            if (registration.installing) {
                console.log('Service worker installing');
            } else if (registration.waiting) {
                console.log('Service worker installed');
            } else if (registration.active) {
                console.log('Service worker active');
            } else {
                console.error('Service worker registration failed', registration);
            }

        } catch (error) {
            console.error('Failed to register service worker', error);
        }
    } else {
        console.error('Service workers are not supported');
    }
}

registerServiceWorker();