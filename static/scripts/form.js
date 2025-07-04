document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactform");

  form.addEventListener("submit", function (e) {
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const motivo = document.getElementById("motivo").value;
    const comentarios = document.getElementById("comentarios").value.trim();

    // Validaciones obligatorias
    if (!nombre || !email || !motivo || !comentarios) {
      alert("Por favor, completa todos los campos obligatorios marcados con *");
      e.preventDefault(); // Evita el envío
      return;
    }

    // Validar email (opcional)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Por favor, introduce un email válido.");
      e.preventDefault();
      return;
    }

    // Validación de archivo (opcional)
    const archivo = document.getElementById("archivo").files[0];
    if (archivo) {
      const extensionesPermitidas = ["pdf", "jpg", "jpeg", "png"];
      const extension = archivo.name.split(".").pop().toLowerCase();

      if (!extensionesPermitidas.includes(extension)) {
        alert("Formato de archivo no permitido. Solo se aceptan PDF o imágenes (.jpg, .png).");
        e.preventDefault();
      }
    }
  });
});
// JavaScript para dropdown personalizado
document.addEventListener('DOMContentLoaded', function() {
    // Función para crear dropdowns personalizados
    function createCustomSelect() {
        var selects = document.querySelectorAll('.form-contacto select');
        
        selects.forEach(function(select) {
            // Crear el contenedor personalizado
            var customSelect = document.createElement('div');
            customSelect.className = 'custom-select';
            
            // Crear el elemento seleccionado
            var selectedDiv = document.createElement('div');
            selectedDiv.className = 'select-selected';
            selectedDiv.textContent = select.options[0].textContent;
            
            // Crear el contenedor de opciones
            var itemsDiv = document.createElement('div');
            itemsDiv.className = 'select-items select-hide';
            
            // Crear las opciones personalizadas
            for (var i = 1; i < select.options.length; i++) {
                var optionDiv = document.createElement('div');
                optionDiv.textContent = select.options[i].textContent;
                optionDiv.setAttribute('data-value', select.options[i].value);
                
                // Evento click para seleccionar opción
                optionDiv.addEventListener('click', function() {
                    var selectedText = this.textContent;
                    var selectedValue = this.getAttribute('data-value');
                    
                    // Actualizar el select original
                    select.value = selectedValue;
                    
                    // Actualizar el texto mostrado
                    selectedDiv.textContent = selectedText;
                    
                    // Remover clase seleccionada de todas las opciones
                    var allOptions = itemsDiv.querySelectorAll('div');
                    allOptions.forEach(function(opt) {
                        opt.classList.remove('select-item-selected');
                    });
                    
                    // Añadir clase seleccionada a la opción actual
                    this.classList.add('select-item-selected');
                    
                    // Cerrar el dropdown
                    closeAllSelect(selectedDiv);
                    
                    // Disparar evento change en el select original
                    var event = new Event('change', { bubbles: true });
                    select.dispatchEvent(event);
                });
                
                itemsDiv.appendChild(optionDiv);
            }
            
            // Evento click para abrir/cerrar dropdown
            selectedDiv.addEventListener('click', function(e) {
                e.stopPropagation();
                closeAllSelect(this);
                itemsDiv.classList.toggle('select-hide');
                this.classList.toggle('select-arrow-active');
            });
            
            // Insertar elementos en el DOM
            customSelect.appendChild(selectedDiv);
            customSelect.appendChild(itemsDiv);
            
            // Reemplazar el select original
            select.parentNode.insertBefore(customSelect, select);
            select.style.display = 'none';
        });
    }
    
    // Función para cerrar todos los dropdowns
    function closeAllSelect(elmnt) {
        var arrNo = [];
        var selectItems = document.querySelectorAll('.select-items');
        var selectSelected = document.querySelectorAll('.select-selected');
        
        selectSelected.forEach(function(item, index) {
            if (elmnt == item) {
                arrNo.push(index);
            } else {
                item.classList.remove('select-arrow-active');
            }
        });
        
        selectItems.forEach(function(item, index) {
            if (arrNo.indexOf(index) === -1) {
                item.classList.add('select-hide');
            }
        });
    }
    
    // Cerrar dropdown al hacer click fuera
    document.addEventListener('click', function() {
        closeAllSelect();
    });
    
    // Inicializar dropdowns personalizados
    createCustomSelect();
});
