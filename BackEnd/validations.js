const admin = require('firebase-admin');

// Inicializar o Firebase Admin SDK (caso ainda não tenha sido feito)
if (!admin.apps.length) {
  const serviceAccount = require('../path-to-your-service-account-key.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://your-database.firebaseio.com"
  });
}

const db = admin.firestore();

// Função para validar o login do usuário
const validateUserLogin = async (req, res) => {
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
};

module.exports = { validateUserLogin };