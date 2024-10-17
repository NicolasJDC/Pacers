// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA4jHszfFYRY5RPbromzFutRPrHMrdi8uY",
    authDomain: "pacers-7928a.firebaseapp.com",
    databaseURL: "https://pacers-7928a-default-rtdb.firebaseio.com",
    projectId: "pacers-7928a",
    storageBucket: "pacers-7928a.appspot.com",
    messagingSenderId: "788533711208",
    appId: "1:788533711208:web:365527901cc118e33486dd",
    measurementId: "G-43GVLJXXRH"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  // Função de login com Google
  document.getElementById('googleLogin').addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
  
    // Login via popup do Google
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
  
        // Obter o ID Token do usuário logado
        user.getIdToken().then((token) => {
          // Enviar o token para o back-end
          fetch('/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token })
          })
          .then(response => response.json())
          .then(data => {
            console.log('Resposta do servidor:', data);
            if (data.uid) {
              alert(`Usuário autenticado com sucesso: ${user.email}`);
            }
          })
          .catch((error) => {
            console.error('Erro ao enviar o token:', error);
          });
        });
      })
      .catch((error) => {
        console.error('Erro ao tentar logar:', error);
        alert('Erro ao tentar logar: ' + error.message);
      });
  });
  