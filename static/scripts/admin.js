// Variables globales
let currentSlides = [];
let currentSections = {};
let currentProducts = [];
let slideCounter = 3;
let productCounter = 2;

// Datos iniciales del slider
const initialSlides = [
    {
        title: 'Bienvenido',
        description: 'Descubre nuestros productos 100% naturales',
        buttonText: 'Explorar',
        buttonLink: '#',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
        title: 'Laboratorio',
        description: 'Te creamos el producto en función de tus necesidades. 100% personalizado',
        buttonText: 'Conocer más',
        buttonLink: '#',
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
        title: 'Eficacia demostrada',
        description: 'Calidad garantizada en cada proyecto',
        buttonText: 'Contactanos',
        buttonLink: '#',
        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    }
];

// Datos iniciales de secciones
const initialSections = {
    'lab': {
        title: 'Conoce Runali Lab',
        content: 'Este es el sitio web de Runalí - Work in progress\nCosmética natural y ecológica para tu bienestar'
    },
    'destacados': {
        title: 'Productos destacados',
        content: 'Productos 100% naturales creados con amor'
    },
    'tienda': {
        title: 'Tienda',
        content: 'Fácil y rápido, directo a tu puerta'
    },
    'contacto': {
        title: 'Contacto',
        content: '¿Tienes alguna pregunta? Estamos aquí para ayudarte'
    }
};

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    initializeAdmin();
    loadDataFromStorage();
    addEventListeners();
    applyChangesToPreview();
});

function initializeAdmin() {
    // Verificar si estamos en admin.html
    if (!window.location.pathname.includes('admin.html')) {
        return;
    }
    
    // Cargar datos del localStorage o usar valores iniciales
    const savedSlides = localStorage.getItem('runali_slides');
    const savedSections = localStorage.getItem('runali_sections');
    const savedProducts = localStorage.getItem('runali_products');
    
    currentSlides = savedSlides ? JSON.parse(savedSlides) : [...initialSlides];
    currentSections = savedSections ? JSON.parse(savedSections) : {...initialSections};
    currentProducts = savedProducts ? JSON.parse(savedProducts) : [];
    
    showNotification('Panel de administración cargado correctamente', 'success');
}

function loadDataFromStorage() {
    // Cargar datos guardados en localStorage
    try {
        const savedSlides = localStorage.getItem('runali_slides');
        const savedSections = localStorage.getItem('runali_sections');
        
        if (savedSlides) {
            currentSlides = JSON.parse(savedSlides);
            updateSliderInMainPage();
        }
        
        if (savedSections) {
            currentSections = JSON.parse(savedSections);
            updateSectionsInMainPage();
        }
    } catch (error) {
        console.error('Error cargando datos:', error);
    }
}

// FUNCIONES PARA APLICAR CAMBIOS AL INDEX.HTML
function updateSliderInMainPage() {
    // Si estamos en la página principal, actualizar el slider
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        const slider = document.getElementById('slider');
        const dots = document.querySelector('.navigation');
        
        if (slider && currentSlides.length > 0) {
            // Limpiar slides existentes
            slider.innerHTML = '';
            dots.innerHTML = '';
            
            // Crear nuevos slides
            currentSlides.forEach((slide, index) => {
                // Crear slide
                const slideElement = document.createElement('div');
                slideElement.className = 'slide';
                slideElement.style.background = slide.background;
                slideElement.innerHTML = `
                    <div class="slide-content">
                        <h2 class="slide-title">${slide.title}</h2>
                        <p class="slide-text">${slide.description}</p>
                        <a href="${slide.buttonLink}" class="slide-button">${slide.buttonText}</a>
                    </div>
                `;
                slider.appendChild(slideElement);
                
                // Crear dot de navegación
                const dot = document.createElement('div');
                dot.className = `nav-dot ${index === 0 ? 'active' : ''}`;
                dot.setAttribute('data-slide', index);
                dots.appendChild(dot);
            });
            
            // Reinicializar el slider si existe la clase
            if (typeof FullWidthSlider !== 'undefined') {
                new FullWidthSlider();
            }
        }
    }
}

function updateSectionsInMainPage() {
    // Si estamos en la página principal, actualizar las secciones
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        Object.keys(currentSections).forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                const sectionData = currentSections[sectionId];
                const h2 = section.querySelector('h2');
                const p = section.querySelector('p');
                
                if (h2) h2.textContent = sectionData.title;
                if (p) p.textContent = sectionData.content;
            }
        });
    }
}

// FUNCIONES DE GUARDADO
function saveToStorage() {
    try {
        localStorage.setItem('runali_slides', JSON.stringify(currentSlides));
        localStorage.setItem('runali_sections', JSON.stringify(currentSections));
        localStorage.setItem('runali_products', JSON.stringify(currentProducts));
        
        showNotification('Datos guardados correctamente', 'success');
        return true;
    } catch (error) {
        showNotification('Error al guardar datos: ' + error.message, 'error');
        return false;
    }
}

// GESTIÓN DEL SLIDER (actualizada)
function updateSlide(index) {
    const slideCard = document.querySelector(`[data-slide="${index}"]`);
    if (!slideCard) return;
    
    const title = slideCard.querySelector('.slide-title-input').value;
    const description = slideCard.querySelector('.slide-desc-input').value;
    const buttonText = slideCard.querySelector('.slide-btn-input').value;
    const buttonLink = slideCard.querySelector('.slide-link-input').value;
    const background = slideCard.querySelector('.slide-bg-input').value;
    
    // Actualizar datos
    currentSlides[index] = {
        title,
        description,
        buttonText,
        buttonLink,
        background
    };
    
    // Actualizar preview
    updateSlidePreview(index);
    
    // Guardar en localStorage
    if (saveToStorage()) {
        showNotification('Slide actualizado correctamente', 'success');
    }
}

function addSlide() {
    slideCounter++;
    const newSlide = {
        title: `Nuevo Slide ${slideCounter}`,
        description: 'Descripción del nuevo slide',
        buttonText: 'Botón',
        buttonLink: '#',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    };
    
    currentSlides.push(newSlide);
    
    // Crear nuevo elemento en el DOM
    const slidesContainer = document.querySelector('.admin-slides-container');
    const slideIndex = currentSlides.length - 1;
    
    const slideHTML = createSlideHTML(newSlide, slideIndex);
    slidesContainer.insertAdjacentHTML('beforeend', slideHTML);
    
    // Guardar en localStorage
    if (saveToStorage()) {
        showNotification('Nuevo slide añadido correctamente', 'success');
    }
}

function deleteSlide(index) {
    showConfirmModal(
        '¿Estás seguro de que deseas eliminar este slide?',
        () => {
            currentSlides.splice(index, 1);
            
            // Eliminar del DOM
            const slideCard = document.querySelector(`[data-slide="${index}"]`);
            if (slideCard) {
                slideCard.remove();
            }
            
            // Reindexar slides restantes
            reindexSlides();
            
            // Guardar en localStorage
            if (saveToStorage()) {
                showNotification('Slide eliminado correctamente', 'success');
            }
        }
    );
}

// GESTIÓN DE CONTENIDO (actualizada)
function updateSection(sectionId) {
    const sectionCards = document.querySelectorAll('.admin-content-card');
    let targetCard = null;
    
    // Encontrar la tarjeta correcta por el onclick del botón
    sectionCards.forEach(card => {
        const saveBtn = card.querySelector('.admin-btn-success');
        if (saveBtn && saveBtn.getAttribute('onclick').includes(sectionId)) {
            targetCard = card;
        }
    });
    
    if (!targetCard) return;
    
    const title = targetCard.querySelector('.section-title-input').value;
    const content = targetCard.querySelector('.section-content-input').value;
    
    currentSections[sectionId] = {
        title,
        content
    };
    
    // Actualizar el título de la tarjeta
    targetCard.querySelector('h3').textContent = `Sección: ${title}`;
    
    // Guardar en localStorage
    if (saveToStorage()) {
        showNotification('Sección actualizada correctamente', 'success');
    }
}

// FUNCIONES PARA GENERAR CÓDIGO ACTUALIZADO
function generateUpdatedHTML() {
    let htmlContent = `<!DOCTYPE html>
<html lang="es">
  <head>
    <title>Runali - Cosmética natural</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/png" href="img/#" />
    <link rel="stylesheet" href="styles/style.css" />
  </head>
  <body>
    <!-- Overlay para cerrar menú -->
    <div class="overlay" id="overlay"></div>

    <!--Zona header-->
    <header>
      <div class="nav-container">
        <img src="img/logo.png" alt="Runali_logo" class="logo" />

        <!-- Navegación principal -->
        <nav>
          <ul id="nav">
            <li><a href="#" class="active">Home</a></li>
            <li><a href="#lab">Lab</a></li>
            <li><a href="#destacados">Productos destacados</a></li>
            <li><a href="#tienda">Tienda</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
        </nav>

        <!-- Botón hamburguesa -->
        <div class="hamburger" id="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>

    <div class="slider-container">
      <div class="slider" id="slider">`;
    
    // Generar slides dinámicamente
    currentSlides.forEach((slide, index) => {
        htmlContent += `
        <div class="slide" style="background: ${slide.background};">
          <div class="slide-content">
            <h2 class="slide-title">${slide.title}</h2>
            <p class="slide-text">${slide.description}</p>
            <a href="${slide.buttonLink}" class="slide-button">${slide.buttonText}</a>
          </div>
        </div>`;
    });
    
    htmlContent += `
      </div>

      <div class="navigation">`;
    
    // Generar dots de navegación
    currentSlides.forEach((slide, index) => {
        htmlContent += `
        <div class="nav-dot ${index === 0 ? 'active' : ''}" data-slide="${index}"></div>`;
    });
    
    htmlContent += `
      </div>

      <div class="arrow arrow-left" id="prevBtn">‹</div>
      <div class="arrow arrow-right" id="nextBtn">›</div>

      <div class="progress-bar">
        <div class="progress-fill" id="progressFill"></div>
      </div>
    </div>

    <script src="scripts/slider.js"></script>
    <script src="scripts/hamburger.js"></script>

    <main>`;
    
    // Generar secciones dinámicamente
    Object.keys(currentSections).forEach(sectionId => {
        const section = currentSections[sectionId];
        htmlContent += `
      <section id="${sectionId}">
        <article>
        <h2>${section.title}</h2>
        <p>${section.content.replace(/\n/g, '</p><p>')}</p>
        </article>
      </section>`;
    });
    
    htmlContent += `
      <section id="contacto">
        <h2>Contacto</h2>
        <p>¿Tienes alguna pregunta? Estamos aquí para ayudarte</p>
        <form id="miFormulario" action="#" method="post">
          <label for="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" required />

          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required /><br /><br />

          <label for="telefono">Teléfono:</label><br />
          <input type="tel" id="telefono" name="telefono" /><br /><br />

          <label for="comentarios">Comentarios:</label><br />
          <textarea
            id="comentarios"
            name="comentarios"
            rows="4"
            cols="50"
          ></textarea
          ><br /><br />

          <input type="submit" value="Enviar" />
        </form>
      </section>

      <a href="#abajo">Ir abajo de la página</a>
    </main>

    <aside>
      <p>Información adicional sobre nuestros productos</p>
    </aside>

    <section id="abajo"></section>

    <!--Zona Bottom-->
    <footer>
      <section>
        <h3>Runali - Cosmética Natural</h3>
        <p>
          runali.es es una web creada por DanewMalavita y diseñada por Verónica
          Rivero
        </p>
        <p>&copy; 2025 Runali. Todos los derechos reservados.</p>
      </section>
    </footer>

    <!-- Script para aplicar cambios dinámicos -->
    <script>
    // Aplicar cambios guardados cuando carga la página
    document.addEventListener('DOMContentLoaded', function() {
        try {
            const savedSlides = localStorage.getItem('runali_slides');
            const savedSections = localStorage.getItem('runali_sections');
            
            if (savedSlides) {
                const slides = JSON.parse(savedSlides);
                updateSliderContent(slides);
            }
            
            if (savedSections) {
                const sections = JSON.parse(savedSections);
                updateSectionContent(sections);
            }
        } catch (error) {
            console.error('Error aplicando cambios:', error);
        }
    });
    
    function updateSliderContent(slides) {
        const slider = document.getElementById('slider');
        const navigation = document.querySelector('.navigation');
        
        if (slider && slides.length > 0) {
            slider.innerHTML = '';
            navigation.innerHTML = '';
            
            slides.forEach((slide, index) => {
                const slideElement = document.createElement('div');
                slideElement.className = 'slide';
                slideElement.style.background = slide.background;
                slideElement.innerHTML = \`
                    <div class="slide-content">
                        <h2 class="slide-title">\${slide.title}</h2>
                        <p class="slide-text">\${slide.description}</p>
                        <a href="\${slide.buttonLink}" class="slide-button">\${slide.buttonText}</a>
                    </div>
                \`;
                slider.appendChild(slideElement);
                
                const dot = document.createElement('div');
                dot.className = \`nav-dot \${index === 0 ? 'active' : ''}\`;
                dot.setAttribute('data-slide', index);
                navigation.appendChild(dot);
            });
            
            // Reinicializar slider
            if (typeof FullWidthSlider !== 'undefined') {
                new FullWidthSlider();
            }
        }
    }
    
    function updateSectionContent(sections) {
        Object.keys(sections).forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                const sectionData = sections[sectionId];
                const h2 = section.querySelector('h2');
                const p = section.querySelector('p');
                
                if (h2) h2.textContent = sectionData.title;
                if (p) p.textContent = sectionData.content;
            }
        });
    }
    </script>
  </body>
</html>`;
    
    return htmlContent;
}

// FUNCIONES DE PREVIEW Y EXPORTACIÓN
function applyChangesToPreview() {
    // Crear botón para aplicar cambios
    const adminHeader = document.querySelector('.admin-section-header');
    if (adminHeader && !document.getElementById('applyChangesBtn')) {
        const applyBtn = document.createElement('button');
        applyBtn.id = 'applyChangesBtn';
        applyBtn.className = 'admin-btn admin-btn-warning';
        applyBtn.textContent = 'Aplicar Cambios';
        applyBtn.onclick = function() {
            if (saveToStorage()) {
                showNotification('Cambios aplicados. Recarga la página principal para ver los cambios.', 'success');
            }
        };
        adminHeader.appendChild(applyBtn);
    }
    
    // Crear botón para exportar HTML
    if (adminHeader && !document.getElementById('exportHtmlBtn')) {
        const exportBtn = document.createElement('button');
        exportBtn.id = 'exportHtmlBtn';
        exportBtn.className = 'admin-btn admin-btn-info';
        exportBtn.textContent = 'Exportar HTML';
        exportBtn.onclick = exportToHTML;
        adminHeader.appendChild(exportBtn);
    }
}

function exportToHTML() {
    const htmlContent = generateUpdatedHTML();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index_updated.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('HTML exportado correctamente', 'success');
}

// RESTO DE FUNCIONES ORIGINALES (mantener las existentes)
function createSlideHTML(slide, index) {
    return `
        <div class="admin-slide-card" data-slide="${index}">
            <div class="admin-slide-preview">
                <div class="admin-slide-mini" style="background: ${slide.background};">
                    <div class="admin-slide-content-mini">
                        <h3>${slide.title}</h3>
                        <p>${slide.description}</p>
                    </div>
                </div>
            </div>
            <div class="admin-slide-form">
                <div class="admin-form-group">
                    <label>Título:</label>
                    <input type="text" value="${slide.title}" class="admin-input slide-title-input">
                </div>
                <div class="admin-form-group">
                    <label>Descripción:</label>
                    <textarea class="admin-textarea slide-desc-input">${slide.description}</textarea>
                </div>
                <div class="admin-form-group">
                    <label>Texto del Botón:</label>
                    <input type="text" value="${slide.buttonText}" class="admin-input slide-btn-input">
                </div>
                <div class="admin-form-group">
                    <label>Enlace del Botón:</label>
                    <input type="url" value="${slide.buttonLink}" class="admin-input slide-link-input">
                </div>
                <div class="admin-form-group">
                    <label>Color de Fondo (Gradiente):</label>
                    <select class="admin-select slide-bg-input">
                        <option value="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">Azul-Violeta</option>
                        <option value="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)">Rosa-Rojo</option>
                        <option value="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)">Azul Claro</option>
                        <option value="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)">Verde-Turquesa</option>
                        <option value="linear-gradient(135deg, #fa709a 0%, #fee140 100%)">Rosa-Amarillo</option>
                    </select>
                </div>
                <div class="admin-form-actions">
                    <button class="admin-btn admin-btn-success" onclick="updateSlide(${index})">Guardar</button>
                    <button class="admin-btn admin-btn-danger" onclick="deleteSlide(${index})">Eliminar</button>
                </div>
            </div>
        </div>
    `;
}

function updateSlidePreview(index) {
    const slideCard = document.querySelector(`[data-slide="${index}"]`);
    if (!slideCard || !currentSlides[index]) return;
    
    const preview = slideCard.querySelector('.admin-slide-mini');
    const slide = currentSlides[index];
    
    preview.style.background = slide.background;
    preview.querySelector('h3').textContent = slide.title;
    preview.querySelector('p').textContent = slide.description;
}

function reindexSlides() {
    const slideCards = document.querySelectorAll('.admin-slide-card');
    slideCards.forEach((card, newIndex) => {
        card.setAttribute('data-slide', newIndex);
        
        // Actualizar botones
        const saveBtn = card.querySelector('.admin-btn-success');
        const deleteBtn = card.querySelector('.admin-btn-danger');
        
        saveBtn.setAttribute('onclick', `updateSlide(${newIndex})`);
        deleteBtn.setAttribute('onclick', `deleteSlide(${newIndex})`);
    });
}

// GESTIÓN DE NAVEGACIÓN
function showSection(sectionId) {
    // Ocultar todas las secciones
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Mostrar la sección seleccionada
    document.getElementById(sectionId).classList.add('active');
    
    // Actualizar tabs activos
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
}

function addEventListeners() {
    // Event listeners para formularios
    document.addEventListener('input', handleFormInput);
    document.addEventListener('change', handleFormChange);
    
    // Cerrar overlay
    const overlay = document.getElementById('adminOverlay');
    if (overlay) {
        overlay.addEventListener('click', closeModal);
    }
}

// SISTEMA DE MODALES
function showConfirmModal(message, onConfirm) {
    const modal = document.getElementById('confirmModal');
    const messageEl = document.getElementById('confirmMessage');
    const confirmBtn = document.getElementById('confirmBtn');
    const overlay = document.getElementById('adminOverlay');
    
    if (!modal || !messageEl || !confirmBtn || !overlay) return;
    
    messageEl.textContent = message;
    
    // Limpiar eventos anteriores
    const newConfirmBtn = confirmBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);
    
    // Añadir nuevo evento
    newConfirmBtn.addEventListener('click', () => {
        onConfirm();
        closeModal();
    });
    
    modal.style.display = 'block';
    overlay.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('confirmModal');
    const overlay = document.getElementById('adminOverlay');
    
    if (modal) modal.style.display = 'none';
    if (overlay) overlay.style.display = 'none';
}

// SISTEMA DE NOTIFICACIONES
function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    
    if (!notification || !notificationText) return;
    
    notificationText.textContent = message;
    
    // Limpiar clases anteriores
    notification.className = 'admin-notification';
    notification.classList.add(`admin-notification-${type}`);
    
    notification.style.display = 'block';
    
    // Auto-ocultar después de 3 segundos
    setTimeout(() => {
        closeNotification();
    }, 3000);
}

function closeNotification() {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.style.display = 'none';
    }
}

// MANEJO DE EVENTOS DE FORMULARIO
function handleFormInput(event) {
    const target = event.target;
    
    // Actualizar preview en tiempo real para slides
    if (target.classList.contains('slide-title-input') || 
        target.classList.contains('slide-desc-input')) {
        
        const slideCard = target.closest('.admin-slide-card');
        if (slideCard) {
            const slideIndex = parseInt(slideCard.getAttribute('data-slide'));
            
            if (target.classList.contains('slide-title-input')) {
                const h3 = slideCard.querySelector('.admin-slide-mini h3');
                if (h3) h3.textContent = target.value;
            } else if (target.classList.contains('slide-desc-input')) {
                const p = slideCard.querySelector('.admin-slide-mini p');
                if (p) p.textContent = target.value;
            }
        }
    }
}

function handleFormChange(event) {
    const target = event.target;
    
    // Actualizar background del slide
    if (target.classList.contains('slide-bg-input')) {
        const slideCard = target.closest('.admin-slide-card');
        if (slideCard) {
            const preview = slideCard.querySelector('.admin-slide-mini');
            if (preview) {
                preview.style.background = target.value;
            }
        }
    }
}

// FUNCIONES DE EXPORTACIÓN
function exportSliderData() {
    return JSON.stringify(currentSlides, null, 2);
}

function exportSectionsData() {
    return JSON.stringify(currentSections, null, 2);
}

function exportAllData() {
    return {
        slides: currentSlides,
        sections: currentSections,
        timestamp: new Date().toISOString()
    };
}

// Funciones globales para debugging
window.adminDebug = {
    getCurrentSlides: () => currentSlides,
    getCurrentSections: () => currentSections,
    getCurrentProducts: () => currentProducts,
    exportData: exportAllData,
    saveData: saveToStorage,
    loadData: loadDataFromStorage
};

console.log('Admin panel enhanced initialized successfully');
console.log('Use window.adminDebug for debugging functions');