// Carrusel de imágenes
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    // Asegurar que el índice esté dentro del rango
    if (index >= slides.length) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = slides.length - 1;
    } else {
        currentSlideIndex = index;
    }

    // Ocultar todas las diapositivas
    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    // Desactivar todos los puntos
    dots.forEach(dot => {
        dot.classList.remove('active');
    });

    // Mostrar la diapositiva actual
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
}

function moveSlide(direction) {
    showSlide(currentSlideIndex + direction);
}

function currentSlide(index) {
    showSlide(index);
}

// Cambio automático de diapositivas cada 5 segundos
let autoSlideInterval = setInterval(() => {
    moveSlide(1);
}, 5000);

// Pausar el cambio automático cuando el usuario interactúa
document.querySelector('.carousel-container').addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

// Reanudar el cambio automático cuando el usuario deja de interactuar
document.querySelector('.carousel-container').addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(() => {
        moveSlide(1);
    }, 5000);
});

// Soporte para deslizar en dispositivos táctiles
let touchStartX = 0;
let touchEndX = 0;

const carouselContainer = document.querySelector('.carousel-container');

carouselContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

carouselContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Deslizar hacia la izquierda
        moveSlide(1);
    }
    if (touchEndX > touchStartX + 50) {
        // Deslizar hacia la derecha
        moveSlide(-1);
    }
}

// Animación de entrada para los enlaces
// No JS animation for .link-button — visual hover handled by CSS
