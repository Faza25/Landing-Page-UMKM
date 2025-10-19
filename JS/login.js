document.addEventListener('DOMContentLoaded', function() {
    
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginError = document.getElementById('loginError'); 

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const emailValue = emailInput.value.trim();
            const passwordValue = passwordInput.value.trim();

            loginError.style.display = 'none';
            loginError.textContent = '';

            if (emailValue === '') {
                loginError.textContent = 'Kolom Email atau Username wajib diisi.';
                loginError.style.display = 'block';
                loginError.style.color = 'red'; 
                emailInput.focus(); 
                return; 
            }

            if (passwordValue === '') {
                loginError.textContent = 'Kolom Password wajib diisi.';
                loginError.style.display = 'block';
                loginError.style.color = 'red'; 
                passwordInput.focus(); 
                return; 
            }

            
            loginError.textContent = 'Sedang memproses...';
            loginError.style.color = 'green';
            loginError.style.display = 'block';

            window.location.href = 'index.html';
        });
    }
});