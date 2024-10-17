const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const dotenv = require('dotenv');

// Configurações do servidor e Firebase
dotenv.config();
const serviceAccount = require('./firebaseServiceAccount.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
});

const app = express();
app.use(bodyParser.json());

// Verificar token enviado pelo front-end
app.post('/login', async (req, res) => {
  const token = req.body.token; // Recebe o token do front-end
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const userId = decodedToken.uid; // ID do usuário autenticado
    res.status(200).json({ message: `Usuário autenticado: ${userId}` });
  } catch (error) {
    res.status(401).json({ error: 'Token inválido ou expirado' });
  }
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
