 // Função para voltar para a página anterior
 document.getElementById('backButton').addEventListener('click', function() {
    window.location.href = "/FrontEnd/poslogin.html";
});

// Função para criar uma isca digital
document.getElementById('createButton').addEventListener('click', function() {
    alert('Criando uma nova isca digital...');
    // Lógica adicional para criar a isca digital pode ser adicionada aqui
});

// Função para editar uma isca digital
document.getElementById('editButton').addEventListener('click', function() {
    alert('Editando a isca digital...');
    // Lógica adicional para editar a isca digital pode ser adicionada aqui
});

// Função para excluir uma isca digital
document.getElementById('deleteButton').addEventListener('click', function() {
    if(confirm('Você tem certeza que deseja excluir esta isca digital?')) {
        alert('Isca digital excluída!');
        // Lógica adicional para excluir a isca digital pode ser adicionada aqui
    }
});