let paso = 0;
let seleccion = {
    tipo: "Jabón Personalizado",
    base: null,
    olores: [],
    color: null,
    forma: null,
    cantidad: 1,
    precio: 0
};

const precios = {
    base: 3,
    olorExtra: 1,
    miniJabon: 2
};

function iniciarPersonalizacion() {
    paso = 1;
    seleccion = { tipo: "Jabón Personalizado", base: null, olores: [], color: null, forma: null, cantidad: 1, precio: precios.base };
    mostrarPaso();
    new bootstrap.Modal(document.getElementById("modalPersonalizacion")).show();
}

function mostrarPaso() {
    const contenedor = document.getElementById("pasoPersonalizacion");
    let html = "";

    if (paso === 1) {
        html = `
            <h3>Elige la base</h3>
            <div class="mb-3">
                <strong>Base de glicerina transparente (Cristal)</strong> <br>
                Tiene una textura suave y delicada para la piel. Ayuda a conservar la hidratación natural, siendo ideal para pieles sensibles y para quienes valoran belleza y cuidado en un solo producto.
                <br>
                <strong>Base de colágeno</strong> <br>
                Brinda firmeza, elasticidad e hidratación profunda, favoreciendo la regeneración natural de la piel. Deja una sensación de suavidad y frescura, ayudando a mantener un aspecto saludable y joven por más tiempo.
            </div>
            <div class="d-flex gap-3 flex-wrap">
                <button class="opcion ${seleccion.base === 'Glicerina' ? 'seleccionado' : ''}" style="background-color:#c2b8db" onclick="seleccionarBase('Glicerina', this)">
                    <img src="img/base-glicerina.png" alt="Glicerina"><br>Glicerina Transparente (Cristal)
                </button>
                <button class="opcion ${seleccion.base === 'Colágeno' ? 'seleccionado' : ''}" style="background-color:#c2b8db" onclick="seleccionarBase('Colágeno', this)">
                    <img src="img/base-colageno.png" alt="Colágeno"><br>Colágeno
                </button>
            </div>
            <div class="mt-3">
                <button class="btn" style="background-color: #ab9cd1" onclick="validarBase()">Siguiente ➡</button>
            </div>
        `;
    } 
    else if (paso === 2) {
        html = `
            <h3>Elige hasta 3 olores</h3>
            <p>Precio base incluye 1 olor. Cada olor adicional: +$${precios.olorExtra}</p>
            <div class="d-flex gap-3 flex-wrap">
                ${["Coctel de Frutas", "Coco Kiwi", "Vainilla", "Caramel Coffee"].map(o => `
                    <button class="opcion ${seleccion.olores.includes(o) ? 'seleccionado' : ''}" style="background-color:#c2b8db" onclick="seleccionarOlor('${o}', this)">
                        <img src="img/olor-${o.toLowerCase()}.png" alt="${o}"><br>${o}
                    </button>
                `).join("")}
            </div>
            <div class="mt-3">
                <button class="btn btn-secondary" onclick="paso=1; mostrarPaso()">⬅ Anterior</button>
                <button class="btn" style="background-color: #ab9cd1" onclick="validarOlores()">Siguiente ➡</button>
            </div>
        `;
    } 
    else if (paso === 3) {
        html = `
            <h3>Elige el color</h3>
            <div class="d-flex gap-3 flex-wrap">
                <button class="opcion ${seleccion.color === 'Blanco' ? 'seleccionado' : ''}" style="background-color:#c2b8db" onclick="seleccionarColor('Blanco', this)">
                    <img src="img/color-blanco.png"><br>Blanco
                </button>
                <button class="opcion ${seleccion.color === 'Rojo' ? 'seleccionado' : ''}" style="background-color:#c2b8db" onclick="seleccionarColor('Rojo', this)">
                    <img src="img/color-rojo.png"><br>Rojo
                </button>
                <button class="opcion ${seleccion.color === 'Azul' ? 'seleccionado' : ''}" style="background-color:#c2b8db" onclick="seleccionarColor('Azul', this)">
                    <img src="img/color-azul.png"><br>Azul
                </button>
                <button class="opcion ${seleccion.color === 'Amarillo' ? 'seleccionado' : ''}" style="background-color:#c2b8db" onclick="seleccionarColor('Amarillo', this)">
                    <img src="img/color-amarillo.png"><br>Amarillo
                </button>
                <button class="opcion ${seleccion.color === 'Celeste' ? 'seleccionado' : ''}" style="background-color:#c2b8db" onclick="seleccionarColor('Celeste', this)">
                    <img src="img/color-celeste.png"><br>Celeste
                </button>
                <button class="opcion ${seleccion.color === 'Rosado' ? 'seleccionado' : ''}" style="background-color:#c2b8db" onclick="seleccionarColor('Rosado', this)">
                    <img src="img/color-rosado.png"><br>Rosado
                </button>
                <button class="opcion ${seleccion.color === 'Morado' ? 'seleccionado' : ''}" style="background-color:#c2b8db" onclick="seleccionarColor('Morado', this)">
                    <img src="img/color-morado.png"><br>Morado
                </button>
            </div>
            <div class="mt-3">
                <button class="btn btn-secondary" onclick="paso=2; mostrarPaso()">⬅ Anterior</button>
                <button class="btn" style="background-color: #ab9cd1" onclick="validarColor()">Siguiente ➡</button>
            </div>
        `;
    }
    else if (paso === 4) {
        html = `
            <h3>Elige la forma</h3>
            <div class="d-flex gap-3 flex-wrap">
                <button class="opcion ${seleccion.forma === 'Rosa Real' ? 'seleccionado' : ''}" style="background-color:#c2b8db" onclick="seleccionarForma('Rosa Real', this)">
                    <img src="img/forma-rosa-real.png"><br>Rosa Real
                </button>
                <button class="opcion ${seleccion.forma === 'Corazón Encantado' ? 'seleccionado' : ''}" style="background-color:#c2b8db" onclick="seleccionarForma('Corazón Encantado', this)">
                    <img src="img/forma-corazon-encantado.png"><br>Corazón Encantado
                </button>
                <button class="opcion ${seleccion.forma === 'Flor Radiante' ? 'seleccionado' : ''}" style="background-color:#c2b8db" onclick="seleccionarForma('Flor Radiante', this)">
                    <img src="img/forma-flor-radiante.png"><br>Flor Radiante
                </button>
                <button class="opcion ${seleccion.forma === 'Corona de Luna' ? 'seleccionado' : ''}" style="background-color:#c2b8db" onclick="seleccionarForma('Corona de Luna', this)">
                    <img src="img/forma-corona-luna.png"><br>Corona de Luna
                </button>
                <button class="opcion ${seleccion.forma === 'Aurora Floral' ? 'seleccionado' : ''}" style="background-color:#c2b8db" onclick="seleccionarForma('Aurora Floral', this)">
                    <img src="img/forma-aurora-floral.png"><br>Aurora Floral
                </button>
                <button class="opcion ${seleccion.forma === 'Estrella Boreal' ? 'seleccionado' : ''}" style="background-color:#c2b8db" onclick="seleccionarForma('Estrella Boreal', this)">
                    <img src="img/forma-estrella-boreal.png"><br>Estrella Boreal
                </button>
            </div>
            <div class="mt-3">
                <button class="btn btn-secondary" onclick="paso=3; mostrarPaso()">⬅ Anterior</button>
                <button class="btn" style="background-color: #ab9cd1" onclick="validarForma()">Añadir al Carrito ✅</button>
            </div>
        `;
    }

    contenedor.innerHTML = html;
}

// Validaciones
function validarBase() {
    if (!seleccion.base) {
        alert("Por favor, selecciona una base antes de continuar.");
        return;
    }
    paso = 2;
    mostrarPaso();
}

function validarOlores() {
    if (seleccion.olores.length === 0) {
        alert("Debes elegir al menos un olor.");
        return;
    }
    paso = 3;
    mostrarPaso();
}

function validarColor() {
    if (!seleccion.color) {
        alert("Por favor, selecciona un color antes de continuar.");
        return;
    }
    paso = 4;
    mostrarPaso();
}

function validarForma() {
    if (!seleccion.forma) {
        alert("Por favor, selecciona una forma.");
        return;
    }
    finalizarPersonalizacion();
}

// Selecciones con marcado visual
function seleccionarBase(base, btn) {
    seleccion.base = base;
    document.querySelectorAll(".opcion").forEach(o => o.classList.remove("seleccionado"));
    btn.classList.add("seleccionado");
}

function seleccionarOlor(olor, btn) {
    if (seleccion.olores.includes(olor)) {
        // Quitar olor
        seleccion.olores = seleccion.olores.filter(o => o !== olor);
        if (seleccion.olores.length >= 1) seleccion.precio -= precios.olorExtra;
        btn.classList.remove("seleccionado");
    } else if (seleccion.olores.length < 3) {
        // Añadir olor
        seleccion.olores.push(olor);
        if (seleccion.olores.length > 1) seleccion.precio += precios.olorExtra;
        btn.classList.add("seleccionado");
    }
}

function seleccionarColor(color, btn) {
    seleccion.color = color;
    document.querySelectorAll(".opcion").forEach(o => o.classList.remove("seleccionado"));
    btn.classList.add("seleccionado");
}

function seleccionarForma(forma, btn) {
    seleccion.forma = forma;
    document.querySelectorAll(".opcion").forEach(o => o.classList.remove("seleccionado"));
    btn.classList.add("seleccionado");
}


function finalizarPersonalizacion() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push({ ...seleccion });
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Producto añadido al carrito");
    bootstrap.Modal.getInstance(document.getElementById("modalPersonalizacion")).hide();
}

function agregarMiniJabon() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push({ tipo: "Mini Jabón", cantidad: 1, precio: precios.miniJabon });
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Mini jabón añadido al carrito");
}
