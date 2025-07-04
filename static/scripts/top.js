// Inicialización del botón de scroll al cargar el documento
document.addEventListener("DOMContentLoaded", function() {
  // Obtener el botón
  const scrollToTopButton = document.getElementById("scrollToTop");
  
  // Crear la imagen
  const arrowImg = document.createElement("img");
  arrowImg.src = "static/img/icons/top_arrow.png";
  arrowImg.alt = "Volver arriba";
  arrowImg.style.width = "24px";
  arrowImg.style.height = "24px";
  
  // Limpiar el contenido del botón y añadir la imagen
  scrollToTopButton.innerHTML = "";
  scrollToTopButton.appendChild(arrowImg);
  
  // Añadir estilos mejorados al botón
  scrollToTopButton.style.display = "none";  // Inicialmente oculto
  scrollToTopButton.style.position = "fixed";
  scrollToTopButton.style.bottom = "20px";
  scrollToTopButton.style.right = "20px";
  scrollToTopButton.style.backgroundColor = "#ffffff";
  scrollToTopButton.style.borderRadius = "50%";
  scrollToTopButton.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  scrollToTopButton.style.cursor = "pointer";
  scrollToTopButton.style.zIndex = "1000";
  scrollToTopButton.style.alignItems = "center";
  scrollToTopButton.style.justifyContent = "center";
  scrollToTopButton.style.width = "50px";
  scrollToTopButton.style.height = "50px";
  scrollToTopButton.style.padding = "0";
  scrollToTopButton.style.display = "flex";  // Para centrar la imagen
  scrollToTopButton.style.transition = "opacity 0.3s, visibility 0.3s";
  scrollToTopButton.style.opacity = "0";
  scrollToTopButton.style.visibility = "hidden";
  
  // Función para verificar la posición del scroll y mostrar/ocultar el botón
  function toggleScrollToTopButton() {
    if (window.pageYOffset > 300) {
      scrollToTopButton.style.opacity = "1";
      scrollToTopButton.style.visibility = "visible";
    } else {
      scrollToTopButton.style.opacity = "0";
      scrollToTopButton.style.visibility = "hidden";
    }
  }
  
  // Función para hacer scroll al principio de la página
  scrollToTopButton.addEventListener("click", function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
  
  // Mostrar/ocultar el botón según la posición del scroll
  window.addEventListener("scroll", toggleScrollToTopButton);
  
  // Verificar la posición inicial del scroll
  toggleScrollToTopButton();
});
