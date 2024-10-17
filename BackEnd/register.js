// register.js
export function registerUser() {
    console.log("User registered!");
    // Adicione a lógica de registro aqui, como salvar o usuário ou validar os dados.
  }
  

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";

import { getAuth, createUserWithEmailAndPassword } from "http://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsGDFLSHiuketXtmDl1EHicSmDEOeM9A0",
  authDomain: "login-example-f4f03.firebaseapp.com",
  projectId: "login-example-f4f03",
  storageBucket: "login-example-f4f03.appspot.com",
  messagingSenderId: "81029437916",
  appId: "1:81029437916:web:ff043eec4a3abe3ccd9719"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//submit button
const submit = document.getElementById('submit');
submit.addEventListener("click", function(event){
event.preventDefault()

//inputs
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;


createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    alert("Criando conta...")
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
    // ..
  });
})