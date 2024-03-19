const dialogNuevoConcepto = document.getElementById('dialogNuevoConcepto');
document.getElementById('fromNewConcept').addEventListener('submit', guardarConcepto);


// HTML de los slots
slotOcupado = `<div class="slot slot-ocupado">
<h3>Agigolado</h3>
<p>falta el aire al realizar un esfuerzo, que se ahoga y tiene una presión en el pecho</p>
<button class="deleteConcepto">
    <img src="./svg/mas.svg" alt="eliminar concepto">
</button>
</div>`

slotEnEspera = `<div class="slot slot-en-espera">
<h3>Agigolado</h3>
<p>falta el aire al realizar un esfuerzo, que se ahoga y tiene una presión en el pecho falta el aire al realizar un esfuerzo, que se ahoga y tiene una presión en el pecho falta el aire al realizar un esfuerzo, que se ahoga y tiene una presión en el pecho</p>
<button class="deleteConcepto">
    <img src="./svg/mas.svg" alt="eliminar concepto">
</button>
</div>`

slotDisponible = `<div class="slot slot-disponible">
<h3>Lugar Disponible</h3>
<p>Inserta un nuevo concepto a aprender</p>
</div>`

slotPremium = `<div class="slot slot-premium">
<h3>Obtener Lugar</h3>
<p>Comparte la aplicación o adquiere más lugares</p>
</div>`



////////////////////////////////////////////
////////////// CRUD Conceptos //////////////
////////////////////////////////////////////

// Guardar conceptos en el localstorage
function guardarConcepto(e) {
    let concepto_title = document.getElementById('titleConcepto').value;
    let concepto_description = document.getElementById('descripConcepto').value;

    const concepto = {
        concepto_title,
        concepto_description
    };

    if(localStorage.getItem('ListaConceptosJson') === null) { // para ver sí está vacío o existe el localstorage conceptos
        let ListaConceptos = []; // creo un arreglo vacío para guardar los conceptos
        ListaConceptos.push(concepto); // agrego el objeto task al arreglo
        localStorage.setItem('ListaConceptosJson', JSON.stringify(ListaConceptos)); // guardo la lista como json en el localstorage
    } else {
        let ListaConceptos = JSON.parse(localStorage.getItem('ListaConceptosJson')); // obtengo el Json del localstorage y los transformo a lista
        ListaConceptos.push(concepto); // agrego el objeto nuevo a la lista de tareas
        localStorage.setItem('ListaConceptosJson', JSON.stringify(ListaConceptos)); // guardo la lista actualizada en el localstorage
    }

    document.getElementById('fromNewConcept').reset(); // limpio los campos del formulario
    // e.preventDefault(); // evita los comportamientos por defecto, entre ellos que no se recargue la página

    obtenerConceptos(); // llamamos a la función para que se ejecute al cargar la página
    closeModal(); // cierro el modal 
}


slotUsables = 5;


// Obtener conceptos del localstorage y mostrarlos en el main
function obtenerConceptos() {
    let main = document.querySelector('main');

    // Verificar si existe el localstorage conceptos, si no existe, lo creo
    if(localStorage.getItem('ListaConceptosJson') === null) { // para ver sí está vacío o existe el localstorage conceptos
        localStorage.setItem('ListaConceptosJson', JSON.stringify([])); // si está vacío, creo un arreglo vacío y lo guardo como json en el localstorage
    }

    // Obtener conceptos del localstorage
    let ListaConceptos = JSON.parse(localStorage.getItem('ListaConceptosJson')); // obtengo el Json del localstorage y los transformo a lista

    // limpio el contenido del div
    main.innerHTML = '';

    // Generar contenido del main
    let contenidoDelMain = "";
    if(ListaConceptos.length < slotUsables) {
        for(let i = 0; i < ListaConceptos.length; i++) {
            // slotOcupado
            contenidoDelMain += `<div class="slot slot-ocupado">
            <h3>${ListaConceptos[i].concepto_title}</h3>
            <p>${ListaConceptos[i].concepto_description}</p>
            <button class="deleteConcepto" onclick="deleteConcepto('${ListaConceptos[i].concepto_title}')">
                <img src="./svg/mas.svg" alt="eliminar concepto">
            </button>
            </div>`;
        }
        for(let i = 0; i < slotUsables - ListaConceptos.length; i++) {
            // slotDisponible
            contenidoDelMain += slotDisponible;
        }
    } else {
        for(let i = 0; i < ListaConceptos.length; i++) {
            if(i < slotUsables) {
                // slotOcupado
                contenidoDelMain += `<div class="slot slot-ocupado">
                <h3>${ListaConceptos[i].concepto_title}</h3>
                <p>${ListaConceptos[i].concepto_description}</p>
                <button class="deleteConcepto" onclick="deleteConcepto('${ListaConceptos[i].concepto_title}')">
                    <img src="./svg/mas.svg" alt="eliminar concepto">
                </button>                
                </div>`;
            } else {
                // slotEnEspera
                contenidoDelMain += `<div class="slot slot-en-espera">
                <h3>${ListaConceptos[i].concepto_title}</h3>
                <p>${ListaConceptos[i].concepto_description}</p>
                <button class="deleteConcepto" onclick="deleteConcepto('${ListaConceptos[i].concepto_title}')">
                    <img src="./svg/mas.svg" alt="eliminar concepto">
                </button>                
                </div>`
            }
        }
    }

    // slotPremium
    contenidoDelMain += slotPremium + slotPremium + slotPremium + slotPremium;

    // colocar html dentro de main
    main.innerHTML = contenidoDelMain
}

// Editar conceptos del localstorage
// --> No he descubierto como hacerlo aún


// Eliminar conceptos del localstorage
function deleteConcepto(title) {
    let ListaConceptos = JSON.parse(localStorage.getItem('ListaConceptosJson'));

    for(let i = 0; i < ListaConceptos.length; i++) {
        if(ListaConceptos[i].concepto_title == title) { // Busco que tarea coincide con el título buscado
            ListaConceptos.splice(i, 1); // Elimino la tarea del arreglo de tareas en la posición i, solo quita 1 elemento
        }
    }

    localStorage.setItem('ListaConceptosJson', JSON.stringify(ListaConceptos)); // guardo la lista actualizada en el localstorage 

    obtenerConceptos();
}




////////////////////////////////////////////
/////////// Interacción del Modal //////////
////////////////////////////////////////////

// abrir modal
function openModal() {
    dialogNuevoConcepto.showModal();
}

// cerrar modal
function closeModal() {
    dialogNuevoConcepto.close();
}

// Cerrar modal al hacer click fuera de él
dialogNuevoConcepto.addEventListener("click", e => {
    const dialogDimensions = dialogNuevoConcepto.getBoundingClientRect()
    if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
        ) {
            closeModal();
        }
    })



////////////////////////////////////////////
//////////// funciones iniciales ///////////
////////////////////////////////////////////

obtenerConceptos();