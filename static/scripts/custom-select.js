// JavaScript for custom select dropdowns
document.addEventListener('DOMContentLoaded', function() {
    // Function to create custom dropdowns
    function createCustomSelect() {
        var selects = document.querySelectorAll('.custom-select select');
        
        selects.forEach(function(select) {
            // Create selected item div
            var selectedDiv = document.createElement('div');
            selectedDiv.className = 'select-selected';
            selectedDiv.textContent = select.options[select.selectedIndex].textContent;
            
            // Create items container
            var itemsDiv = document.createElement('div');
            itemsDiv.className = 'select-items select-hide';
            
            // Create option items
            for (var i = 0; i < select.options.length; i++) {
                var optionDiv = document.createElement('div');
                optionDiv.textContent = select.options[i].textContent;
                optionDiv.setAttribute('data-value', select.options[i].value);
                
                // Click event for selecting an option
                optionDiv.addEventListener('click', function() {
                    var selectedText = this.textContent;
                    var selectedValue = this.getAttribute('data-value');
                    var parentSelect = this.parentNode.parentNode.querySelector('select');
                    
                    // Update original select element
                    for (var j = 0; j < parentSelect.options.length; j++) {
                        if (parentSelect.options[j].textContent === selectedText) {
                            parentSelect.selectedIndex = j;
                            break;
                        }
                    }
                    
                    // Update selected text
                    var selectSelected = this.parentNode.previousSibling;
                    selectSelected.textContent = selectedText;
                    
                    // Highlight selected item
                    var allItems = this.parentNode.querySelectorAll('div');
                    for (var j = 0; j < allItems.length; j++) {
                        allItems[j].classList.remove('same-as-selected');
                    }
                    this.classList.add('same-as-selected');
                    
                    // Close dropdown
                    selectSelected.click();
                    
                    // Trigger change event on original select
                    var event = new Event('change');
                    parentSelect.dispatchEvent(event);
                });
                
                itemsDiv.appendChild(optionDiv);
            }
            
            // Insert custom elements
            select.parentNode.appendChild(selectedDiv);
            select.parentNode.appendChild(itemsDiv);
            
            // Click event to toggle dropdown
            selectedDiv.addEventListener('click', function(e) {
                e.stopPropagation();
                closeAllSelect(this);
                this.nextSibling.classList.toggle('select-hide');
                this.classList.toggle('select-arrow-active');
            });
        });
    }
    
    // Close all dropdowns except the clicked one
    function closeAllSelect(elmnt) {
        var x, y, i, xl, yl, arrNo = [];
        x = document.getElementsByClassName('select-items');
        y = document.getElementsByClassName('select-selected');
        xl = x.length;
        yl = y.length;
        
        for (i = 0; i < yl; i++) {
            if (elmnt == y[i]) {
                arrNo.push(i);
            } else {
                y[i].classList.remove('select-arrow-active');
            }
        }
        
        for (i = 0; i < xl; i++) {
            if (arrNo.indexOf(i) === -1) {
                x[i].classList.add('select-hide');
            }
        }
    }
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', closeAllSelect);
    
    // Initialize custom selects
    createCustomSelect();
});
