document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o comportamento padrão de submissão do formulário

    window.location.href = '/FrontEnd/login.html';
});