const dialog = document.getElementById('dialog')
const main = document.querySelector('main')

// Donde se almacenan los conceptos
palabras = [{
    concepto: "Agigolado",
    definicion: "falta el aire al realizar un esfuerzo, que se ahoga y tiene una presión en el pecho"
}, {
    concepto: "arrebol",
    definicion: "el rojo del atardecer"
}, {
    concepto: "inmarcesible",
    definicion: "que no se puede marchitar"
}
]

/*
{
    concepto: "cachivache",
    definicion: "cosa inutil, inservible, trasto"
}, {
    concepto: "bonhomía",
    definicion: "Afabilidad, sencillez, bondad y honradez en el carácter y en el comportamiento."
}, {
    concepto: "bizarro",
    definicion: "valiente, generoso, lucido, esplendido"
}
*/ 

// HTML de los slots
slotOcupado = `<div class="slot slot-ocupado">
<h3>Agigolado</h3>
<p>falta el aire al realizar un esfuerzo, que se ahoga y tiene una presión en el pecho</p>
</div>`

slotEnEspera = `<div class="slot slot-en-espera">
<h3>Agigolado</h3>
<p>falta el aire al realizar un esfuerzo, que se ahoga y tiene una presión en el pecho falta el aire al realizar un esfuerzo, que se ahoga y tiene una presión en el pecho falta el aire al realizar un esfuerzo, que se ahoga y tiene una presión en el pecho</p>
</div>`

slotDisponible = `<div class="slot slot-disponible">
<h3>Lugar Disponible</h3>
<p>Inserta un nuevo concepto a aprender</p>
</div>`

slotPremium = `<div class="slot slot-premium">
<h3>Obtener Lugar</h3>
<p>Comparte la aplicación o adquiere más lugares</p>
</div>`


// Generar contenido del main
let contenidoDelMain = "";
slotUsables = 5;

if(palabras.length < slotUsables) {
    for(let i = 0; i < palabras.length; i++) {
        // slotOcupado
        contenidoDelMain += `<div class="slot slot-ocupado">
        <h3>${palabras[i].concepto}</h3>
        <p>${palabras[i].definicion}</p>
        </div>`;
    }
    for(let i = 0; i < slotUsables - palabras.length; i++) {
        // slotDisponible
        contenidoDelMain += slotDisponible;
    }
} else {
    for(let i = 0; i < palabras.length; i++) {
        if(i < slotUsables) {
            // slotOcupado
            contenidoDelMain += `<div class="slot slot-ocupado">
            <h3>${palabras[i].concepto}</h3>
            <p>${palabras[i].definicion}</p>
            </div>`;
        } else {
            // slotEnEspera
            contenidoDelMain += `<div class="slot slot-en-espera">
            <h3>${palabras[i].concepto}</h3>
            <p>${palabras[i].definicion}</p>
            </div>`
        }
    }
}

// slotPremium
contenidoDelMain += slotPremium + slotPremium + slotPremium + slotPremium;

// colocar html dentro de main
main.innerHTML = contenidoDelMain



// abrir modal
function openModal() {
    dialog.showModal();
}

function closeModal() {
    dialog.close();
}