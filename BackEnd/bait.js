const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();
const db = admin.firestore();

// Criar isca digital
router.post('/create', async (req, res) => {
    const { title, description, fileUrl, category } = req.body;
    try {
        const baitRef = db.collection('baits').doc();
        await baitRef.set({
            title,
            description,
            fileUrl,
            category,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
        res.status(201).json({ message: 'Isca criada com sucesso' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Editar isca digital
router.put('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, category } = req.body;
    try {
        const baitRef = db.collection('baits').doc(id);
        await baitRef.update({ title, description, category });
        res.status(200).json({ message: 'Isca atualizada com sucesso' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Remover isca digital
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const baitRef = db.collection('baits').doc(id);
        await baitRef.delete();
        res.status(200).json({ message: 'Isca removida com sucesso' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Listar iscas do usuário
router.get('/list', async (req, res) => {
    try {
        const baits = [];
        const snapshot = await db.collection('baits').get();
        snapshot.forEach(doc => baits.push({ id: doc.id, ...doc.data() }));
        res.status(200).json(baits);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
