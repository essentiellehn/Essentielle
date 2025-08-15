// main.js -> control del carrito, dirección y pago (usa localStorage 'carrito')

document.addEventListener("DOMContentLoaded", () => {
  // botones
  document.getElementById("vaciarBtn").addEventListener("click", vaciarCarrito);
  document.getElementById("procederBtn").addEventListener("click", procederPago);

  // formularios
  document.getElementById("formDireccion").addEventListener("submit", confirmarDireccion);
  document.getElementById("formPago").addEventListener("submit", realizarPago);

  document.getElementById("cerrarConfirmacionBtn").addEventListener("click", () => {
    bootstrap.Modal.getInstance(document.getElementById("modalConfirmacion")).hide();
    window.location.href = "index.html";
  });

  renderCarrito();
});

function obtenerCarrito() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarrito(cart) {
  localStorage.setItem("carrito", JSON.stringify(cart));
}

function renderCarrito() {
  const container = document.getElementById("carritoContainer");
  const cart = obtenerCarrito();

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="alert" style="background-color:#ab9cd1">Tu carrito está vacío. <a href="productos.html">Ver productos</a></div>
    `;
    return;
  }

  let html = `
    <div class="table-responsive">
      <table class="table align-middle">
        <thead>
          <tr>
            <th>Producto</th>
            <th class="text-center">Precio unitario</th>
            <th class="text-center">Cantidad</th>
            <th class="text-end">Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
  `;

  let totalPedido = 0;

  cart.forEach((item, idx) => {
    const nombre = construirNombre(item);
    const precioUnit = Number(item.precio || 0);
    const cantidad = Number(item.cantidad || 1);
    const totalItem = precioUnit * cantidad;
    totalPedido += totalItem;

    html += `
      <tr>
        <td>
          <strong>${escapeHtml(nombre)}</strong>
          ${detalleLinea(item)}
        </td>
        <td class="text-center">L.${precioUnit.toFixed(2)}</td>
        <td class="text-center">
          <div class="d-flex justify-content-center align-items-center">
            <button class="btn btn-sm btn-outline-secondary me-2" onclick="cambiarCantidad(${idx}, -1)">-</button>
            <input type="number" min="1" value="${cantidad}" style="width:60px; text-align:center;" onchange="setCantidad(${idx}, this.value)">
            <button class="btn btn-sm btn-outline-secondary ms-2" onclick="cambiarCantidad(${idx}, 1)">+</button>
          </div>
        </td>
        <td class="text-end">L.${totalItem.toFixed(2)}</td>
        <td class="text-end">
          <button class="btn btn-sm btn-danger" onclick="quitarItem(${idx})">Quitar</button>
        </td>
      </tr>
    `;
  });

  html += `
        </tbody>
      </table>
    </div>

    <div class="d-flex justify-content-end">
      <div class="card p-3" style="min-width:260px;">
        <div class="d-flex justify-content-between">
          <strong>Subtotal</strong>
          <span>L.${totalPedido.toFixed(2)}</span>
        </div>
        <div class="text-muted small">Impuestos y envío no calculados</div>
      </div>
    </div>
  `;

  container.innerHTML = html;
}

function construirNombre(item) {
  // Construye un nombre descriptivo para cada tipo de item
  if (item.tipo) {
    if (item.tipo.toLowerCase().includes("mini")) {
      return "Mini Jabón";
    }
    // si es jabon personalizado
    let parts = [item.tipo || "Jabón"];
    if (item.base) parts.push(`Base: ${item.base}`);
    if (item.olores && item.olores.length) parts.push(`Olores: ${item.olores.join(", ")}`);
    if (item.color) parts.push(`Color: ${item.color}`);
    if (item.forma) parts.push(`Forma: ${item.forma}`);
    return parts.join(" · ");
  }
  return "Producto";
}

function detalleLinea(item) {
  // retorna HTML pequeño con detalles si conviene
  let deta = "";
  if (item.olores && item.olores.length) {
    deta += `<div class="small text-muted">Olores: ${escapeHtml(item.olores.join(", "))}</div>`;
  }
  if (item.base) deta += `<div class="small text-muted">Base: ${escapeHtml(item.base)}</div>`;
  return deta;
}

function cambiarCantidad(idx, delta) {
  const cart = obtenerCarrito();
  cart[idx].cantidad = Math.max(1, Number(cart[idx].cantidad || 1) + delta);
  guardarCarrito(cart);
  renderCarrito();
}

function setCantidad(idx, value) {
  let val = Number(value) || 1;
  val = Math.max(1, Math.floor(val));
  const cart = obtenerCarrito();
  cart[idx].cantidad = val;
  guardarCarrito(cart);
  renderCarrito();
}

function quitarItem(idx) {
  const cart = obtenerCarrito();
  cart.splice(idx, 1);
  guardarCarrito(cart);
  renderCarrito();
}

function vaciarCarrito() {
  if (!confirm("¿Seguro que quieres vaciar el carrito?")) return;
  localStorage.removeItem("carrito");
  renderCarrito();
}

function procederPago() {
  const cart = obtenerCarrito();
  if (cart.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }
  const modal = new bootstrap.Modal(document.getElementById("modalDireccion"));
  modal.show();
}

function confirmarDireccion(event) {
  event.preventDefault();
  // Validaciones básicas (HTML ya marca required)
  const departamento = document.getElementById("departamento").value.trim();
  const ciudad = document.getElementById("ciudad").value.trim();
  const colonia = document.getElementById("colonia").value.trim();

  if (!departamento || !ciudad || !colonia) {
    alert("Por favor completa los campos obligatorios de dirección.");
    return;
  }

  // Guardamos dirección temporal en sessionStorage (solo para demo)
  const direccion = {
    departamento,
    ciudad,
    colonia,
    numeroCasa: document.getElementById("numeroCasa").value.trim(),
    bloque: document.getElementById("bloque").value.trim(),
    detalles: document.getElementById("detallesDireccion").value.trim()
  };
  sessionStorage.setItem("direccionEnvio", JSON.stringify(direccion));

  // Cerrar modal de direccion y abrir modal de pago
  bootstrap.Modal.getInstance(document.getElementById("modalDireccion")).hide();
  const modalPago = new bootstrap.Modal(document.getElementById("modalPago"));
  modalPago.show();
}

function realizarPago(event) {
  event.preventDefault();
  // En demo validamos de forma muy simple
  const name = document.getElementById("cardName").value.trim();
  const number = document.getElementById("cardNumber").value.trim();
  const expiry = document.getElementById("cardExpiry").value.trim();
  const cvc = document.getElementById("cardCVC").value.trim();

  if (!name || !number || !expiry || !cvc) {
    alert("Por favor completa los datos de la tarjeta (demo).");
    return;
  }

  // Simulamos proceso de pago (no real)
  // -> cerramos modal de pago y abrimos confirmación
  bootstrap.Modal.getInstance(document.getElementById("modalPago")).hide();

  // Opcional: generar resumen / número de orden simulado
  const ordenId = "ORD-" + Math.random().toString(36).substring(2, 9).toUpperCase();
  const direccion = JSON.parse(sessionStorage.getItem("direccionEnvio") || "{}");
  const texto = document.getElementById("textoConfirmacion");
  texto.innerHTML = `
    <strong>¡Pago realizado!</strong><br>
    ID de orden: <strong>${ordenId}</strong><br>
    Envío a: ${escapeHtml(direccion.departamento || "")}, ${escapeHtml(direccion.ciudad || "")}.
  `;

  // Limpiar carrito
  localStorage.removeItem("carrito");
  renderCarrito();

  // Mostrar modal confirmación
  const modalConfirm = new bootstrap.Modal(document.getElementById("modalConfirmacion"));
  modalConfirm.show();
}

// helper: evita inyección básica en campos que mostramos como HTML
function escapeHtml(text) {
  if (!text && text !== 0) return "";
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
