class FullWidthSlider {
    constructor() {
        this.slider = document.getElementById('slider');
        this.dots = document.querySelectorAll('.nav-dot');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.progressFill = document.getElementById('progressFill');

        this.currentSlide = 0;
        this.totalSlides = 3;
        this.autoPlayInterval = 10000; // 1000 = 1 segundo
        this.autoPlayTimer = null;
        this.progressTimer = null;
        this.progressStartTime = 0;

        this.init();
    }

    init() {
        // Verificar que todos los elementos existen
        if (!this.slider || !this.prevBtn || !this.nextBtn || !this.progressFill) {
            console.error('Elementos del slider no encontrados');
            return;
        }

        this.addEventListeners();
        this.updateSlider();
        this.startAutoPlay();
    }

    addEventListeners() {
        this.prevBtn.addEventListener('click', () => {
            this.stopAutoPlay();
            this.prevSlide();
            this.startAutoPlay();
        });

        this.nextBtn.addEventListener('click', () => {
            this.stopAutoPlay();
            this.nextSlide();
            this.startAutoPlay();
        });

        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        // Pausar autoplay cuando el mouse está sobre el slider
        this.slider.parentElement.addEventListener('mouseenter', () => {
            this.stopAutoPlay();
        });

        this.slider.parentElement.addEventListener('mouseleave', () => {
            this.startAutoPlay();
        });
    }

    startAutoPlay() {
        this.progressStartTime = Date.now();
        this.resetProgress();
        
        this.autoPlayTimer = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayInterval);
        
        this.progressTimer = setInterval(() => {
            this.updateProgress();
        }, 50);
    }

    stopAutoPlay() {
        if (this.autoPlayTimer) {
            clearInterval(this.autoPlayTimer);
            this.autoPlayTimer = null;
        }
        if (this.progressTimer) {
            clearInterval(this.progressTimer);
            this.progressTimer = null;
        }
    }

    resetProgress() {
        this.progressFill.style.width = '0%';
        this.progressStartTime = Date.now();
    }

    updateProgress() {
        const elapsed = Date.now() - this.progressStartTime;
        const progress = Math.min((elapsed / this.autoPlayInterval) * 100, 100);
        this.progressFill.style.width = `${progress}%`;
    }

    goToSlide(index) {
        this.stopAutoPlay();
        this.currentSlide = index;
        this.updateSlider();
        this.startAutoPlay();
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateSlider();
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlider();
    }

    updateSlider() {
        // Calcular el desplazamiento correcto
        const translateX = -this.currentSlide * (100 / this.totalSlides);
        this.slider.style.transform = `translateX(${translateX}%)`;

        // Actualizar los dots
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });

        // Resetear la barra de progreso
        this.resetProgress();
    }
}

// Inicializar el slider cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new FullWidthSlider();
});