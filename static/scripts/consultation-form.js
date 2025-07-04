// JavaScript for the Lab consultation form
document.addEventListener('DOMContentLoaded', function() {
    const consultaForm = document.getElementById('consultaForm');
    
    if (consultaForm) {
        consultaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const tipoPiel = document.getElementById('tipoPiel').value;
            const necesidades = document.getElementById('necesidades').value.trim();
            const alergias = document.getElementById('alergias').value.trim();
            const preferencias = document.getElementById('preferencias').value.trim();
            
            // Validate required fields
            if (!nombre || !email || !tipoPiel || !necesidades) {
                showFormAlert('Por favor, completa todos los campos obligatorios marcados con *', 'error');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormAlert('Por favor, introduce un email válido.', 'error');
                return;
            }
            
            // Show loading state
            const submitButton = consultaForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';
            
            // Simulate form submission (in production, this would be an actual API call)
            setTimeout(function() {
                // Reset form
                consultaForm.reset();
                
                // Reset any custom selects
                const customSelects = document.querySelectorAll('.select-selected');
                if (customSelects.length > 0) {
                    customSelects.forEach(select => {
                        const originalSelect = select.parentNode.querySelector('select');
                        if (originalSelect) {
                            originalSelect.selectedIndex = 0;
                            select.textContent = originalSelect.options[0].textContent;
                        }
                    });
                }
                
                // Show success message
                showFormAlert('Tu consulta ha sido enviada correctamente. En breve nos pondremos en contacto contigo.', 'success');
                
                // Reset button
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }, 1500);
        });
    }
    
    // Helper function to show alerts
    function showFormAlert(message, type) {
        // Check if alert element already exists
        let alertElement = document.querySelector('.form-alert');
        
        // If not, create one
        if (!alertElement) {
            alertElement = document.createElement('div');
            alertElement.className = 'form-alert';
            
            // Insert after the form
            const formParent = consultaForm.parentNode;
            formParent.insertBefore(alertElement, consultaForm.nextSibling);
        }
        
        // Set content and style based on type
        alertElement.textContent = message;
        alertElement.className = `form-alert ${type === 'error' ? 'alert-error' : 'alert-success'}`;
        
        // Make sure it's visible
        alertElement.style.display = 'block';
        
        // Scroll to show the alert
        alertElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Automatically hide after some time
        setTimeout(function() {
            alertElement.style.opacity = '0';
            setTimeout(function() {
                alertElement.style.display = 'none';
                alertElement.style.opacity = '1';
            }, 300);
        }, 5000);
    }
    
    // Add visual feedback on input fields
    const formInputs = consultaForm.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        // Add validation class on blur
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required')) {
                if (this.value.trim() === '') {
                    this.classList.add('invalid');
                    this.classList.remove('valid');
                } else {
                    this.classList.add('valid');
                    this.classList.remove('invalid');
                }
            }
        });
        
        // Remove validation class on focus
        input.addEventListener('focus', function() {
            this.classList.remove('invalid');
        });
    });
});
