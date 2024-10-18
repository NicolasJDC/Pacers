const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const bodyParser = require('body-parser');

// Inicializando o Firebase Admin SDK
if (!admin.apps.length) {
  const serviceAccount = require('../path-to-your-service-account-key.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://your-database.firebaseio.com"
  });
}

const db = admin.firestore();

const app = express();
app.use(cors());
app.use(bodyParser.json());  // Permite que o servidor processe requisições com JSON

// Rota para lidar com o login do usuário e validar e-mail e senha
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Procurar o usuário pelo e-mail no Firestore
    const usersRef = db.collection('users');
    const querySnapshot = await usersRef.where('email', '==', email).get();

    if (querySnapshot.empty) {
      // Nenhum usuário encontrado com o e-mail fornecido
      return res.status(401).json({ success: false, message: 'Usuário não cadastrado.' });
    }

    // Verificar a senha
    let userFound = false;
    querySnapshot.forEach((doc) => {
      const user = doc.data();
      if (user.password === password) {
        // Senha correta
        userFound = true;
        return res.status(200).json({ success: true, message: 'Login bem-sucedido.' });
      }
    });

    if (!userFound) {
      // Senha incorreta
      return res.status(401).json({ success: false, message: 'Senha incorreta.' });
    }
    
  } catch (error) {
    console.error('Erro ao validar login:', error);
    return res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
  }
});

// Inicializar o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

// Importando rotas
const baitRoutes = require('./Routes/bait');
const leadRoutes = require('./Routes/lead');
const authRoutes = require('./Routes/auth');

// Usando as rotas
app.use('/auth', authRoutes);  // Corrigi o uso incorreto de './auth' para '/auth'
app.use('/bait', baitRoutes);
app.use('/leads', leadRoutes);

// Rotas para Iscas Digitais (Baits)
app.get('/api/baits', async (req, res) => {
  const baitRef = db.collection('baits');
  const snapshot = await baitRef.get();
  let baits = [];
  snapshot.forEach(doc => {
    baits.push({ id: doc.id, ...doc.data() });
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

// Rotas para Leads
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

// Configuração de conta
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




