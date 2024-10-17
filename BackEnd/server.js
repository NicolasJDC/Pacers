const express = require('express');
const admin = require('firebase-admin');

// Inicialize o Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://pacers-7928a-default-rtdb.firebaseio.com"
});

const app = express();
app.use(express.json());  // Para interpretar requisições com JSON

// Rota para lidar com o login do usuário
app.post('/login', (req, res) => {
  const idToken = req.body.token;  // Token enviado pelo front-end

  // Verificar o ID Token com Firebase Admin
  admin.auth().verifyIdToken(idToken)
    .then((decodedToken) => {
      const uid = decodedToken.uid;
      res.json({ message: 'Usuário autenticado com sucesso', uid });
    })
    .catch((error) => {
      res.status(401).json({ message: 'Token inválido', error });
    });
});

// Inicializando o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
