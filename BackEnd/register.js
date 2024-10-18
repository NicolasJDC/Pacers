// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import{getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js"


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

  const auth=getAuth();
    const db=getFirestore();
    console.log(auth)

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        const user=userCredential.user;
        const userData={
            email: email,

          //  firstName: firstName,
          //  lastName:lastName
        };
      //  showMessage('Account Created Successfully', 'signUpMessage');
        const docRef=doc(db, "users", user.uid);
        setDoc(docRef,userData)
        .then(()=>{
            window.location.href='index.html';
        })
        .catch((error)=>{
            console.error("error writing document", error);

        });
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode=='auth/email-already-in-use'){
      //      showMessage('Email Address Already Exists !!!', 'signUpMessage');
        }
        else{
      //      showMessage('unable to create User', 'signUpMessage');
        }
    })
 });

 
 document.getElementById('signupForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Previne o comportamento padrão de submissão do formulário

  window.location.href = '/FrontEnd/login.html';
});