const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const bodyParser = require('body-parser');


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

//Rotas para Iscas Digitais
app.get('/api/baits', async (req, res) => {
  const baitRef = db.collection('baits');
  const snapshot = await baitRef.get();
  let baits = [];
  snapshot.forEach(doc =>{
    baits.push({id: doc.id, ...doc.data()});
  });
  res.status(200).json(baits);
});

app.post('/api/baits', async (req, res) => {
  const newBait = req.body;
  await db.collection('baits').add(newBait);
  res.status(201).send('Isca criada com sucesso!');
});

app.put('/api/baits/:id', async (req, res) => {
  const baitId = req.params.id;
  const updatedBait = req.body;
  await db.collection('baits').doc(baitId).update(updatedBait);
  res.status(200).send('Isca atualizada!');
});

app.delete('/api/baits/:id', async (req, res) => {
  const baitId = req.params.id;
  await db.collection('baits').doc(baitId).delete();
  res.status(200).send('Isca removida!');
});

//Rotas para o leads
app.get('/api/leads', async (req, res) => {
  const leadsRef = db.collection('leads');
  const snapshot = await leadsRef.get();
  let leads = [];
  snapshot.forEach(doc => {
    leads.push({ id: doc.id, ...doc.data() });
  });
  res.status(200).json(leads);
});

app.post('/api/leads', async (req, res) => {
  const newLead = req.body;
  await db.collection('leads').add(newLead);
  res.status(201).send('Lead capturado com sucesso!');
});

// Configuracao de conta 
app.get('/api/account/:id', async (req, res) => {
  const userId = req.params.id;
  const userRef = db.collection('users').doc(userId);
  const doc = await userRef.get();
  if (!doc.exists) {
    res.status(404).send('Usuário não encontrado');
  } else {
    res.status(200).json(doc.data());
  }
});

app.put('/api/account/:id', async (req, res) => {
  const userId = req.params.id;
  const updatedAccount = req.body;
  await db.collection('users').doc(userId).update(updatedAccount);
  res.status(200).send('Perfil atualizado!');
});

app.delete('/api/account/:id', async (req, res) => {
  const userId = req.params.id;
  await db.collection('users').doc(userId).delete();
  res.status(200).send('Conta excluída!');
});








