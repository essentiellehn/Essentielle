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
            <div class="d-flex gap-3 flex-wrap">
                <button class="opcion ${seleccion.base === 'Glicerina' ? 'seleccionado' : ''}" onclick="seleccionarBase('Glicerina', this)">
                    <img src="img/base-glicerina.png" alt="Glicerina"><br>Glicerina
                </button>
                <button class="opcion ${seleccion.base === 'Colágeno' ? 'seleccionado' : ''}" onclick="seleccionarBase('Colágeno', this)">
                    <img src="img/base-colageno.png" alt="Colágeno"><br>Colágeno
                </button>
            </div>
            <div class="mt-3">
                <button class="btn btn-primary" onclick="validarBase()">Siguiente ➡</button>
            </div>
        `;
    } 
    else if (paso === 2) {
        html = `
            <h3>Elige hasta 3 olores</h3>
            <p>Precio base incluye 1 olor. Cada olor adicional: +$${precios.olorExtra}</p>
            <div class="d-flex gap-3 flex-wrap">
                ${["Lavanda", "Rosas", "Coco"].map(o => `
                    <button class="opcion ${seleccion.olores.includes(o) ? 'seleccionado' : ''}" onclick="seleccionarOlor('${o}', this)">
                        <img src="img/olor-${o.toLowerCase()}.png" alt="${o}"><br>${o}
                    </button>
                `).join("")}
            </div>
            <div class="mt-3">
                <button class="btn btn-secondary" onclick="paso=1; mostrarPaso()">⬅ Anterior</button>
                <button class="btn btn-primary" onclick="validarOlores()">Siguiente ➡</button>
            </div>
        `;
    } 
    else if (paso === 3) {
        html = `
            <h3>Elige el color</h3>
            <div class="d-flex gap-3 flex-wrap">
                <button class="opcion ${seleccion.color === 'Azul' ? 'seleccionado' : ''}" onclick="seleccionarColor('Azul', this)">
                    <img src="img/color-azul.png"><br>Azul
                </button>
                <button class="opcion ${seleccion.color === 'Rosa' ? 'seleccionado' : ''}" onclick="seleccionarColor('Rosa', this)">
                    <img src="img/color-rosa.png"><br>Rosa
                </button>
            </div>
            <div class="mt-3">
                <button class="btn btn-secondary" onclick="paso=2; mostrarPaso()">⬅ Anterior</button>
                <button class="btn btn-primary" onclick="validarColor()">Siguiente ➡</button>
            </div>
        `;
    }
    else if (paso === 4) {
        html = `
            <h3>Elige la forma</h3>
            <div class="d-flex gap-3 flex-wrap">
                <button class="opcion ${seleccion.forma === 'Corazón' ? 'seleccionado' : ''}" onclick="seleccionarForma('Corazón', this)">
                    <img src="img/forma-corazon.png"><br>Corazón
                </button>
                <button class="opcion ${seleccion.forma === 'Redonda' ? 'seleccionado' : ''}" onclick="seleccionarForma('Redonda', this)">
                    <img src="img/forma-redonda.png"><br>Redonda
                </button>
                <button class="opcion ${seleccion.forma === 'Cuadrada' ? 'seleccionado' : ''}" onclick="seleccionarForma('Cuadrada', this)">
                    <img src="img/forma-cuadrada.png"><br>Cuadrada
                </button>
            </div>
            <div class="mt-3">
                <button class="btn btn-secondary" onclick="paso=3; mostrarPaso()">⬅ Anterior</button>
                <button class="btn btn-success" onclick="validarForma()">Añadir al Carrito ✅</button>
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
