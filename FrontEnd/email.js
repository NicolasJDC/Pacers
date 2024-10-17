/**Função para cadastro com email e senha */
function createLogin(){
  var email = document.getElementById('email').value;
  var senha = document.getElementById('senha').value;
   firebase.auth().createUserwithEmailAndPassword(email,senha).then(user => {
    console.log('usuario', user);
    alert('Usuario criado e logado');
   });
}

 /**   Função para login           */
 function loginEmail(){
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;
 }

 /**listener de dom ready */

 document.addEventListener("DOMContentLoaded", function(){

 });