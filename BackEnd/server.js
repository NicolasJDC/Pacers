const express = require('express');
const admin = require('firebase-admin');

const app = express();
app.use(express.json());  // Permite que o servidor processe requisições com JSON

// Rota para lidar com o login do usuário e validar o token
app.post('/login', (req, res) => {
  const idToken = req.body.token;  // Token recebido do front-end

  // Validar o token usando o Firebase Admin SDK
  admin.auth().verifyIdToken(idToken)
    .then((decodedToken) => {
      const uid = decodedToken.uid;  // ID do usuário autenticado

      // Resposta bem-sucedida
      res.status(200).json({
        message: 'Usuário autenticado com sucesso!',
        uid: uid  // ID do usuário
      });
    })
    .catch((error) => {
      // Resposta de erro se o token for inválido
      res.status(401).json({
        message: 'Token inválido!',
        error: error.message
      });
    });
});

// Inicializar o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

//importando rotas 
const baitRoutes = require('./Routes/bait');
const leadRoutes = require('./Routes/lead');
const authRoutes = require('./Routes/auth');

// Usando as rotas 
app.use('./auth',authRoutes);
app.use('./bait',baitRoutes);
app.use('./leads', leadRoutes);
