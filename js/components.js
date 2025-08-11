class Navbar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container">
                <a class="navbar-brand" href="index.html">
                    <img src="img/logo.png" alt="Logo" width="40"> Jabones Artesanales
                </a>
                <div class="ms-auto">
                    <a href="carrito.html" class="btn btn-outline-primary">
                        🛒 Carrito
                    </a>
                </div>
            </div>
        </nav>
        `;
    }
}
customElements.define('custom-navbar', Navbar);

class Footer extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer class="bg-dark text-light text-center p-4 mt-5">
            <p>📞 Tel: +503 0000-0000 | ✉ contacto@jabonesartesanales.com</p>
            <p>© ${new Date().getFullYear()} Jabones Artesanales</p>
        </footer>
        `;
    }
}
customElements.define('custom-footer', Footer);
