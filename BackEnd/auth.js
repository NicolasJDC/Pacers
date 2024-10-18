const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

// Registro de usuário
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const userRecord = await admin.auth().createUser({
            email,
            password
        });
        res.status(201).json({ message: 'Usuário registrado com sucesso', user: userRecord });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Login de usuário
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await admin.auth().getUserByEmail(email);
        if (user) {
            // Suponha que você tem uma função para verificar a senha
            res.status(200).json({ message: 'Login bem-sucedido', user });
        } else {
            res.status(404).json({ error: 'Usuário não encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
