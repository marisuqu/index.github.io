const allProducts = [
    { nombre: "Base", imagen: "Mat.jpeg", precio: 150, category: "Base" },
    { nombre: "Corrector", imagen: "Hid.jpeg", precio: 100, category: "Corrector" },
    { nombre: "Esponjas", imagen: "Bob.jpeg", precio: 50, category: "Esponjas" },
    { nombre: "Brochas", imagen: "Bro.jpeg", precio: 200, category: "Brochas" },
    { nombre: "Iluminador", imagen: "Nu.jpeg", precio: 130, category: "Iluminador" },
    { nombre: "Blush", imagen: "images.jpeg", precio: 90, category: "Blush" },
    { nombre: "Base Líquida HD", imagen: "Mat.jpeg", precio: 180, category: "Base" },
    { nombre: "Corrector de Ojeras", imagen: "Hid.jpeg", precio: 120, category: "Corrector" },
];

let currentProducts = [];
let indiceActual = 0;
const carrito = [];

let slideIndex = 1;
let carouselTimer;
const slides = document.getElementsByClassName("carousel-slide");

function updateCarouselView() {
    if (slides.length === 0) return;
    const offset = -(slideIndex - 1) * 100;
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.transform = `translateX(${offset}%)`;
    }
}

function plusSlides(n) {
    slideIndex += n;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    if (slideIndex < 1) {
        slideIndex = slides.length;
    }
    updateCarouselView();
    clearInterval(carouselTimer);
    startCarousel();
}

function startCarousel() {
    clearInterval(carouselTimer);
    carouselTimer = setInterval(() => {
        slideIndex++;
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }
        updateCarouselView();
    }, 4000);
}

function mostrarInicio() {
    document.getElementById('inicio').style.display = 'block';
    document.getElementById('productos').style.display = 'none';
    
    slideIndex = 1;
    updateCarouselView();
    startCarousel();
}

function mostrarProductos() {
    currentProducts = [...allProducts];
    indiceActual = 0;
    document.getElementById('inicio').style.display = 'none';
    document.getElementById('productos').style.display = 'flex';
    mostrarProducto(indiceActual);
    updateNavigationButtons();
    clearInterval(carouselTimer);
}

function mostrarProductosPorCategoria(category) {
    currentProducts = allProducts.filter(product => product.category === category);
    indiceActual = 0;
    document.getElementById('inicio').style.display = 'none';
    document.getElementById('productos').style.display = 'flex';
    if (currentProducts.length > 0) {
        mostrarProducto(indiceActual);
    } else {
        document.getElementById('productoActual').innerHTML = '<p>No hay productos en esta categoría.</p>';
    }
    updateNavigationButtons();
    clearInterval(carouselTimer);
}

function mostrarProducto(indice) {
    const contenedor = document.getElementById('productoActual');
    if (!currentProducts[indice]) return;
    const producto = currentProducts[indice];
    const originalIndex = allProducts.findIndex(p => p === producto);
    contenedor.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <p><strong>${producto.nombre}</strong> - $${producto.precio}</p>
        <div class="producto-buttons">
            <button onclick="agregarAlCarrito(${originalIndex})">Agregar al carrito</button>
            <a href="detalles.html" target="_blank">
                <button>Detalles</button>
            </a>
        </div>
    `;
}

function productoAnterior() {
    if (indiceActual > 0) {
        indiceActual--;
        mostrarProducto(indiceActual);
        updateNavigationButtons();
    }
}

function productoSiguiente() {
    if (indiceActual < currentProducts.length - 1) {
        indiceActual++;
        mostrarProducto(indiceActual);
        updateNavigationButtons();
    }
}

function updateNavigationButtons() {
    const prevButton = document.querySelector('.botones-navegacion button:first-child');
    const nextButton = document.querySelector('.botones-navegacion button:last-child');
    prevButton.disabled = indiceActual === 0;
    nextButton.disabled = indiceActual === currentProducts.length - 1 || currentProducts.length === 0;
}

function agregarAlCarrito(indice) {
    carrito.push(allProducts[indice]);
    actualizarCarrito();
}

function actualizarCarrito() {
    const lista = document.getElementById('listaCarrito');
    const total = document.getElementById('total');
    lista.innerHTML = '';
    let suma = 0;
    carrito.forEach((producto) => {
        suma += producto.precio;
        const li = document.createElement('li');
        li.textContent = `${producto.nombre} - $${producto.precio}`;
        lista.appendChild(li);
    });
    total.textContent = suma;
}

function borrarCuenta() {
    if (confirm("¿Estás segura de que deseas borrar tu cuenta? Esto eliminará todo tu carrito.")) {
        carrito.length = 0;
        actualizarCarrito();
        alert("Tu cuenta y carrito han sido eliminados. ¡Gracias por visitarnos!");
    }
}

const openBtn = document.getElementById('open-contact-form-btn');
const closeBtn = document.getElementById('close-contact-modal-btn');
const modal = document.getElementById('contact-form-modal');
const messageInput = document.getElementById('contact-message');
const charCount = document.getElementById('message-char-count');
const contactEmailInput = document.getElementById('contact-email');
const emailValidationError = document.querySelector('.email-validation-error');

openBtn.addEventListener('click', () => modal.style.display = 'block');
closeBtn.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
});
messageInput.addEventListener('input', () => {
    charCount.textContent = messageInput.value.length;
});

contactEmailInput.addEventListener('input', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(contactEmailInput.value)) {
        emailValidationError.style.display = 'none';
    } else {
        emailValidationError.style.display = 'block';
    }
});

document.getElementById('contact-form').addEventListener('submit', function (event) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactEmailInput.value)) {
        event.preventDefault();
        emailValidationError.style.display = 'block';
        alert('Por favor, introduce un email válido para enviar el mensaje.');
    }
});

mostrarInicio();
// ... (todo tu código anterior se mantiene igual) ...

document.getElementById('contact-form').addEventListener('submit', function (event) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactEmailInput.value)) {
        event.preventDefault();
        emailValidationError.style.display = 'block';
        alert('Por favor, introduce un email válido para enviar el mensaje.');
    }
});

// NUEVA LÓGICA PARA EL ENLACE DE FINALIZAR COMPRA
const checkoutLink = document.getElementById('checkout-link');
checkoutLink.addEventListener('click', function(event) {
    event.preventDefault();

    if (carrito.length === 0) {
        alert("El carrito está vacío. Agrega productos antes de finalizar la compra.");
        return;
    }

    localStorage.setItem('shoppingCart', JSON.stringify(carrito));
    window.location.href = 'checkout.html';
});


mostrarInicio();