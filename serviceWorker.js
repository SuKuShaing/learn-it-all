/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////// Configuración para que la app corro offline /////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Agrega los recursos al cache con el nombre 'v1' y espera a que se agreguen
const addResourcesToCache = async (resources) => {
    const cache = await caches.open('v1'); // Abre el cache con el nombre 'v1'
    return cache.addAll(resources); // Agrega los recursos especificados al cache
}

// Busca en el cache el recurso solicitado en la cache, si no lo encuentra lo busca en la red y lo agrega al cache
const cacheMatch = async (request, preloadResponsePromise) => {
    // Busca el recurso en el cache local
    const cachedResponse = await caches.match(request); // Busca el recurso en el cache
    if (cachedResponse) { // Si lo encuentra lo retorna
        return cachedResponse;
    }

    try {
        // Si no, busca el recurso en la precarga de navegación
        // Esto acelera la carga de la página, puesto que busca en la red a la par que se carga el recurso desde cache
        const preloadResponse = await preloadResponsePromise; 
        if (preloadResponse) {
            const cache = await caches.open('v1');
            await cache.put(request, preloadResponse.clone());
            return preloadResponse;
        }

        // Si no, busca el recurso en la red
        const networkResponse = await fetch(request); // busca en la red, Si la solicitud se encuentra en la red, networkResponse será la respuesta de la red.
        const cache = await caches.open('v1'); // abre la caché con el nombre 'v1'. Si la caché no existe, se crea
        await cache.put(request, networkResponse.clone()); // agrega la respuesta de la red al cache
        return networkResponse; // retorna la respuesta de la red
    } catch (err) {
        console.error('Failed to fetch resource', err);
        return new Response('Failed to fetch resource');
    }
}

// Detector de eventos para el evento de instalación del service worker
// Mantiene el evento en instalación hasta que se agreguen los recursos al cache
// Espera a que se instale el service worker y agrega los recursos listados al cache 
self.addEventListener('install', (event) => {
    self.skipWaiting(); // Hace que el nuevo service worker pase al estado de activación
    event.waitUntil(addResourcesToCache([ // Espera a que se agreguen los recursos al cache
        // Estos son los recursos que se agregan al cache
        '/',
        '/index.html',
        '/style.css', 
        '/tarjetasEnPantalla.js',
        '/registradorDelSW.js',
        '/serviceWorker.js',
        '/svg/BurgerMenu.svg',
        '/svg/mas.svg',
    ]));
});

// Detector de eventos para el evento de activación del service worker
// cuando se activa toma el control de las páginas abiertas el nuevo service worker
// Habilita la precarga de navegación (para que cargue los recursos en la red a la par que en el cache)
self.addEventListener('activate', (event) => {
    event.waitUntil(async () => {
        event.waitUntil(clients.claim().then(() => console.log("SW ha reclamado a todas las páginas que lo solicitan"))); // Toma el control de las páginas abiertas el nuevo service worker
    });

    event.waitUntil(async () => {
        if (self.registration.navigationPreload) { // verifica si hay la precarga de navegación
            await self.registration.navigationPreload.enable(); // habilita la precarga de navegación
        }
    });
});

// Detector de eventos de solicitud de recursos
// Espera a que se reciba una solicitud y busca el recurso en el cache, si no lo encuentra lo busca en la red
self.addEventListener('fetch', (event) => {
    event.respondWith(cacheMatch(event.request, event.preloadResponse)); // Busca el recurso en el cache
});





/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// Configuración para que lance las notificaciones a la hora indicada  /////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

self.registration.showNotification('Hola Seba, Esta es la 1era notificación', {
    body: "Ahora recibirás notificaciones de tus conceptos",
    icon: "./svg/mas.svg"
});

// setInterval(() => {
//     new Notification('Hola Seba, Esta es la segunda notificación');
// }, 60000);

// Cada 60 segundos mostrar una notificación
setTimeout(() => {
    self.registration.showNotification('Hola Seba, Esta es la segunda notificación', {
        body: "Ahora recibirás notificaciones de tus conceptos",
        icon: "./svg/mas.svg"
    });
}, 60 * 1000);



self.addEventListener('message', (event) => {
    console.log('event.data: ' ,event.data);
    console.log('event.data.fechayHoraAlGuardar: ', event.data.fechayHoraAlGuardar);
    console.log('event.data.fechayHoraAlGuardar.toLocaleString(): ', event.data.fechayHoraAlGuardar.toLocaleString());

    if (event.data.type === 'mostrar-notificacion') {
        // Convierte fechayHoraAlGuardar a un objeto Date
        let fechayHoraAlGuardar = new Date(event.data.fechayHoraAlGuardar);
        console.log('fechayHoraAlGuardar: ', fechayHoraAlGuardar);
        console.log('fechayHoraAlGuardar.toLocaleString(): ', fechayHoraAlGuardar.toLocaleString());

        // Calcula la hora de 30 minutos después
        let in3Minutes = new Date(fechayHoraAlGuardar.getTime() + 3 * 60 * 1000);
        console.log('in30Minutes: ', in3Minutes);
        console.log('in30Minutes.toLocaleString(): ', in3Minutes.toLocaleString());

        // Calcula la diferencia entre la hora actual y in30Minutes
        let delay = in3Minutes.getTime() - Date.now();
        console.log('delay: ', delay);
        console.log('delay.toLocaleString(): ', delay.toLocaleString());

        // Si la diferencia es positiva, programa una notificación para 30 minutos después
        if (delay > 0) {
            setTimeout(() => {
                self.registration.showNotification(event.data.titulo, {
                    body: event.data.mensaje,
                    icon: './svg/mas.svg'
                });
            }, delay);
        }
    }
});