class Navbar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #b9afd2">
            <div class="container">
                <a class="navbar-brand" href="index.html">
                    <img src="img/logo.jpeg" alt="Logo" width="50"> Essentielle
                </a>
                <div class="ms-auto">
                    <a href="carrito.html" class="btn shadow-sm" style="background-color: #ab9cd1">
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
            <p>📞 Tel: +504 2230-4147 | ✉ Essentiellehn@gmail.com</p>
            <p>© ${new Date().getFullYear()} Essentielle</p>
        </footer>
        `;
    }
}
customElements.define('custom-footer', Footer);
