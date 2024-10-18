document.getElementById('forgotPasswordForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o comportamento padrão de submissão do formulário
    const email = event.target.querySelector('input[type="email"]').value;
    // Adicione aqui a lógica para enviar o email de recuperação de senha ao servidor
    alert(`Email de recuperação enviado para: ${email}`);

      function recoveryPassword(){

        
      }

    window.location.href = '/FrontEnd/login.html';
  });