document.addEventListener('DOMContentLoaded', function() {
    const openModalBtn = document.getElementById('open-contact-form-btn');
    const closeModalBtn = document.getElementById('close-contact-modal-btn');
    const contactModal = document.getElementById('contact-form-modal');
    const contactForm = document.getElementById('contact-form');
    const emailInput = document.getElementById('contact-email');
    const emailError = document.querySelector('.email-validation-error');
    const messageTextarea = document.getElementById('contact-message');
    const charCountSpan = document.getElementById('message-char-count');
    const maxChars = messageTextarea ? parseInt(messageTextarea.getAttribute('maxlength')) : 0;

    if (openModalBtn && contactModal) {
        openModalBtn.addEventListener('click', () => {
            contactModal.classList.add('visible');
            document.body.style.overflow = 'hidden'; 
        });
    }

    function hideModal() {
        if (contactModal) {
            contactModal.classList.remove('visible');
            document.body.style.overflow = 'auto';
        }
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', hideModal);
    }

    if (contactModal) {
        contactModal.addEventListener('click', (event) => {
            if (event.target === contactModal) { 
                hideModal();
            }
        });
    }
    
   
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && contactModal && contactModal.classList.contains('visible')) {
            hideModal();
        }
    });



    function isValidEmail(email) {    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    if (emailInput && emailError) {
        emailInput.addEventListener('input', () => {
            if (emailInput.value === '' || isValidEmail(emailInput.value)) {
                emailError.style.display = 'none';
                emailInput.style.borderColor = 'var(--accent-ember-yellow)'; 
            } else {
                emailError.style.display = 'block';
                emailInput.style.borderColor = 'red'; 
            }
        });
    }

    if (messageTextarea && charCountSpan && maxChars > 0) {
        messageTextarea.addEventListener('input', () => {
            const currentLength = messageTextarea.value.length;
            charCountSpan.textContent = currentLength;
            if (currentLength > maxChars) {
                charCountSpan.parentElement.style.color = 'red';
            } else {
                charCountSpan.parentElement.style.color = 'var(--warm-text-main)';
            }
        });
    }

   
    if (contactForm && emailInput) {
        contactForm.addEventListener('submit', function(event) {
            if (!isValidEmail(emailInput.value)) {
                event.preventDefault(); 
                if(emailError) emailError.style.display = 'block';
                emailInput.style.borderColor = 'red';
                emailInput.focus();
                alert('Por favor, introduce una dirección de correo electrónico con formato válido.');
            }
        });
    }
});

