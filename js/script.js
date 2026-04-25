// ================= LÓGICA DEL MENÚ HAMBURGUESA =================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Verifica que los elementos existan antes de añadir el evento
if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        // Activa/desactiva el menú lateral
        navLinks.classList.toggle('active');
        // Activa/desactiva la animación de la 'X' en el botón
        hamburger.classList.toggle('active');
    });
}

// ================= LÓGICA DEL TEMPORIZADOR CINEMÁTICO =================
// Simula el tiempo corriendo, ideal para la página de inicio
const timerElement = document.getElementById('timer');

if (timerElement) {
    setInterval(() => {
        const now = new Date();
        // Formateamos los números para que siempre tengan 2 dígitos
        const ms = String(Math.floor(now.getMilliseconds() / 10)).padStart(2, '0');
        const s = String(now.getSeconds()).padStart(2, '0');
        const m = String(now.getMinutes()).padStart(2, '0');
        const h = String(now.getHours()).padStart(2, '0');
        
        // Actualizamos el texto en pantalla
        timerElement.innerText = `T- ${h}:${m}:${s}:${ms}`;
    }, 50); // Se actualiza cada 50 milisegundos para dar ese efecto de película
}

// ================= LÓGICA DEL LIGHTBOX (GALERÍA) =================
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.lightbox-close');

if (lightbox) {
    // Función para abrir el lightbox
    const openLightbox = (item) => {
        // Obtenemos la URL de alta calidad del data-attribute
        const highResUrl = item.getAttribute('data-src'); 
        lightboxImg.src = highResUrl;
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        // Enfocamos el botón de cerrar por accesibilidad
        closeBtn.focus();
    };

    // Función para cerrar el lightbox
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        // Limpiamos el src tras la animación para evitar saltos visuales al abrir otra imagen
        setTimeout(() => { lightboxImg.src = ''; }, 300);
    };

    // Event listeners para abrir (Clic y Teclado)
    galleryItems.forEach(item => {
        item.addEventListener('click', () => openLightbox(item));
        
        // Accesibilidad: Permitir abrir con 'Enter' o 'Espacio'
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(item);
            }
        });
    });

    // Event listeners para cerrar (Botón, fondo oscuro y Teclado)
    closeBtn.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', (e) => {
        // Cerrar solo si se hace clic en el fondo oscuro, no en la imagen
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        // Cerrar con la tecla 'Escape'
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}