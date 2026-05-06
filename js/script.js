// ================= LÓGICA DEL MENÚ HAMBURGUESA =================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// ================= LÓGICA DEL TEMPORIZADOR CINEMÁTICO =================
const timerElement = document.getElementById('timer');

if (timerElement) {
    // Fecha histórica: 6 de Agosto de 1945 a las 08:15 AM (Hiroshima)
    const detonationDate = new Date('1945-08-06T08:15:00');

    setInterval(() => {
        const now = new Date();
        const diff = now - detonationDate; // Diferencia en milisegundos desde 1945

        // Cálculos matemáticos del tiempo transcurrido
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
        const minutes = String(Math.floor((diff / 1000 / 60) % 60)).padStart(2, '0');
        const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
        const ms = String(Math.floor((diff % 1000) / 10)).padStart(2, '0'); // Mantenemos el parpadeo rápido
        
        // Lo mostramos con "T+" porque el evento ya ocurrió
        timerElement.innerText = `T+ ${days} DÍAS ${hours}:${minutes}:${seconds}:${ms}`;
    }, 50); 
}

// ================= LÓGICA DEL BOTÓN "VOLVER ARRIBA" (FOOTER) =================
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ================= LÓGICA DEL TRÁILER OFICIAL =================
const openTrailerBtn = document.getElementById('openTrailerBtn');
const closeTrailerBtn = document.getElementById('closeTrailerBtn');
const videoModal = document.getElementById('videoModal');
const iframeContainer = document.getElementById('iframeContainer');

const trailerUrl = "https://www.youtube.com/embed/uYPbbksJxIg?autoplay=1"; 

if (openTrailerBtn && videoModal) {
    openTrailerBtn.addEventListener('click', () => {
        iframeContainer.innerHTML = `<iframe src="${trailerUrl}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
        videoModal.classList.add('active');
        videoModal.setAttribute('aria-hidden', 'false');
    });

    const closeVideoModal = () => {
        videoModal.classList.remove('active');
        videoModal.setAttribute('aria-hidden', 'true');
        setTimeout(() => { iframeContainer.innerHTML = ''; }, 300);
    };

    closeTrailerBtn.addEventListener('click', closeVideoModal);

    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) closeVideoModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeVideoModal();
        }
    });
}

// ================= LÓGICA DE GALERÍA LIGHTBOX (NUEVA) =================
const lightbox = document.getElementById('imageLightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
// CAMBIO CLAVE: Ahora seleccionamos el contenedor completo, no solo la imagen
const galleryItems = document.querySelectorAll('.gallery-item'); 
const closeBtn = document.getElementById('closeLightboxBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Solo ejecutamos esto si estamos en la página de galería
if (lightbox && galleryItems.length > 0) {
    let currentIndex = 0;

    const openLightbox = (index) => {
        currentIndex = index;
        // Buscamos la imagen que está DENTRO del item al que le hicimos clic
        const selectedImg = galleryItems[currentIndex].querySelector('img');
        
        lightboxImg.src = selectedImg.src;
        lightboxCaption.textContent = selectedImg.alt; 
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    };

    const navigate = (direction) => {
        currentIndex += direction;
        
        if (currentIndex >= galleryItems.length) currentIndex = 0;
        if (currentIndex < 0) currentIndex = galleryItems.length - 1;
        
        lightboxImg.style.opacity = '0';
        setTimeout(() => {
            // Buscamos la nueva imagen
            const img = galleryItems[currentIndex].querySelector('img');
            lightboxImg.src = img.src;
            lightboxCaption.textContent = img.alt;
            lightboxImg.style.opacity = '1';
        }, 150);
    };

    // Añadimos el evento de clic al contenedor entero
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
        
        // ¡Extra! Accesibilidad: poder abrir fotos con la tecla Enter
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') openLightbox(index);
        });
    });

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        navigate(-1);
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigate(1);
    });

    const closeLightboxGallery = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    closeBtn.addEventListener('click', closeLightboxGallery);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightboxGallery();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'ArrowRight') navigate(1);
        if (e.key === 'ArrowLeft') navigate(-1);
        if (e.key === 'Escape') closeLightboxGallery();
    });

    
}

// ================= LÓGICA DEL FORMULARIO DE CONTACTO =================
const securityForm = document.getElementById('securityForm');
const successStamp = document.getElementById('successStamp');
const submitBtn = document.querySelector('.submit-btn');

if (securityForm && successStamp && submitBtn) {
    securityForm.addEventListener('submit', async (e) => {
        e.preventDefault(); 
        
        // 1. Guardamos el HTML original exacto
        const originalHTML = submitBtn.innerHTML;
        
        // 2. Modificamos el contenido temporalmente
        submitBtn.innerHTML = "TRANSMITTING..."; 
        submitBtn.style.opacity = "0.7"; 
        submitBtn.disabled = true;

        try {
            const formData = new FormData(securityForm);
            
            // LA RUTA DE TU ENDPOINT DE FORMSPREE
            const response = await fetch("https://formspree.io/f/mvzdejqk", {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Mostramos el sello de éxito
                successStamp.classList.add('show');
                submitBtn.innerHTML = "TRANSMISSION SUCCESSFUL";
                submitBtn.style.opacity = "1";
                
                // Limpiamos y restauramos después de 4 segundos
                setTimeout(() => {
                    securityForm.reset();
                    successStamp.classList.remove('show');
                    
                    // Restauramos el botón a su estado original
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.style.opacity = ""; 
                    submitBtn.disabled = false;
                }, 4000);
            } else {
                alert("Error en la transmisión clasificada. Intente nuevamente.");
                submitBtn.innerHTML = originalHTML;
                submitBtn.style.opacity = "";
                submitBtn.disabled = false;
            }
        } catch (error) {
            alert("Error de conexión. La transmisión no pudo salir de Los Álamos.");
            submitBtn.innerHTML = originalHTML;
            submitBtn.style.opacity = "";
            submitBtn.disabled = false;
        }
    });
}

// ================= LÓGICA DE PARTÍCULAS DORADAS (PÁGINA PREMIOS) =================
const particlesContainer = document.getElementById('particles-container');

if (particlesContainer) {
    const createParticle = () => {
        const particle = document.createElement('div');
        particle.classList.add('golden-particle');

        // Propiedades aleatorias para un efecto orgánico y no invasivo
        const size = Math.random() * 3 + 2; // Tamaño pequeño: entre 2px y 5px
        const left = Math.random() * 100; // Posición horizontal a lo ancho de la pantalla
        const duration = Math.random() * 10 + 15; // Caída muy lenta: entre 15s y 25s
        const delay = Math.random() * 5; // Retraso aleatorio al inicio

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;

        // Un leve resplandor alrededor de cada partícula
        particle.style.boxShadow = `0 0 ${size}px var(--oscar-gold, #d4af37)`;

        particlesContainer.appendChild(particle);

        // Limpieza: eliminamos el elemento del DOM cuando termina su animación
        setTimeout(() => {
            particle.remove();
        }, (duration + delay) * 1000);
    };

    // Crear un lote inicial reducido (25 partículas) para no saturar la vista
    for (let i = 0; i < 25; i++) {
        createParticle();
    }

    // Seguir generando una partícula nueva cada 1.5 segundos
    setInterval(createParticle, 1500);
}

// ================= LÓGICA DEL CONTADOR ANIMADO (PÁGINA PREMIOS) =================
const counterElement = document.getElementById('globalAwardsCounter');

if (counterElement) {
    const target = +counterElement.getAttribute('data-target');
    const duration = 2500; // Duración de la animación en milisegundos (2.5 segundos)
    
    const startCounting = () => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            // Función matemática (easeOutExpo) para que empiece muy rápido y termine lento
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            
            counterElement.innerText = Math.floor(easeProgress * target) + "+";
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    // Usamos Intersection Observer para que la animación inicie al verse en pantalla
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            startCounting();
            observer.disconnect(); // Desconectamos para que cuente solo una vez
        }
    }, { threshold: 0.5 });

    observer.observe(counterElement);
}

// ================= REPRODUCTOR MUSICAL (EASTER EGG EN PREMIOS) =================
const playMusicBtn = document.getElementById('playMusicBtn');
const ostAudio = document.getElementById('ostAudio');

if (playMusicBtn && ostAudio) {
    // Controlar volumen inicial (0.5 es el 50%) para que no asuste al usuario
    ostAudio.volume = 0.5;

    playMusicBtn.addEventListener('click', () => {
        if (ostAudio.paused) {
            ostAudio.play();
            playMusicBtn.classList.add('playing');
            playMusicBtn.innerHTML = '<span>⏸</span>'; // Cambia a ícono de Pausa
        } else {
            ostAudio.pause();
            playMusicBtn.classList.remove('playing');
            playMusicBtn.innerHTML = '<span>▶</span>'; // Cambia a ícono de Play
        }
    });

    // Cuando la canción termina, restaurar el botón automáticamente
    ostAudio.addEventListener('ended', () => {
        playMusicBtn.classList.remove('playing');
        playMusicBtn.innerHTML = '<span>▶</span>';
    });
}