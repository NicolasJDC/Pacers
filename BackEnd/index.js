// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA-s1v9bLIDkpvB1Gp8LQJ04k1uUT2W9HQ",
    authDomain: "teste-projeto-a7fc2.firebaseapp.com",
    projectId: "teste-projeto-a7fc2",
    storageBucket: "teste-projeto-a7fc2.appspot.com",
    messagingSenderId: "392555396843",
    appId: "1:392555396843:web:2190a8401b5e6148c288ae"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  function Cadastrar(){
    var auth = null;

    firebase.auth().createUserwithEmailAndPassword(document.getElementById("email").value, document.getElementById("password").value)
    .then(function (user){
     alert("seus dados foram salvos com sucesso" );
     auth = user;

     //para atualizar o navegador 
     document.getElementById("email").value = ''
     document.getElementById("senha").value = ''
    }).catch(function(error){
        alert("falha ao cadastrar");
    })
  }