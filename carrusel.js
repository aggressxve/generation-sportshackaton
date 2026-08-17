const slides = document.querySelectorAll('.hero-slide');
const dotsContainer = document.querySelector('.carousel-dots');
let currentSlide = 0;
let autoplayInterval;

// Crear los dots dinámicamente según el número de slides
slides.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('carousel-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.carousel-dot');

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
}

function nextSlide() {
    const newIndex = (currentSlide + 1) % slides.length;
    showSlide(newIndex);
    resetAutoplay();
}

function prevSlide() {
    const newIndex = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(newIndex);
    resetAutoplay();
}

function goToSlide(index) {
    showSlide(index);
    resetAutoplay();
}

function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 5000);
}

function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
}

startAutoplay();