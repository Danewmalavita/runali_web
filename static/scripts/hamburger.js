// scripts/hamburger.js

// Elementos del DOM
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
const overlay = document.getElementById('overlay');

// Función para alternar el menú
function toggleMenu() {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
    overlay.classList.toggle('active');
    
    // Prevenir scroll del body cuando el menú está abierto
    document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : 'auto';
}

// Función para cerrar el menú
function closeMenu() {
    hamburger.classList.remove('active');
    nav.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Event listeners
hamburger.addEventListener('click', toggleMenu);
overlay.addEventListener('click', closeMenu);

// Cerrar menú al hacer clic en un enlace (en móvil)
nav.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && window.innerWidth <= 768) {
        closeMenu();
    }
});

// Cerrar menú con tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('active')) {
        closeMenu();
    }
});

// Cerrar menú si se redimensiona la ventana
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && nav.classList.contains('active')) {
        closeMenu();
    }
});

// Smooth scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Actualizar enlace activo según scroll o página actual
function updateActiveLink() {
    const sections = document.querySelectorAll('section[id], main');
    const navLinks = document.querySelectorAll('#nav a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    const currentPage = window.location.pathname.split('/').pop();

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');

        const isSectionLink = href.startsWith('#');
        const isPageLink = href === currentPage || href === './' + currentPage;

        if ((isSectionLink && href === `#${current}`) || (!isSectionLink && isPageLink)) {
            link.classList.add('active');
        }
    });
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    updateActiveLink();
});

// Actualizar enlace activo al hacer scroll
window.addEventListener('scroll', updateActiveLink);
