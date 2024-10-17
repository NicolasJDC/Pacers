const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();
const db = admin.firestore();

// Captura de lead
router.post('/capture/:baitId', async (req, res) => {
    const { baitId } = req.params;
    const { name, email, phone } = req.body;
    try {
        const leadRef = db.collection('leads').doc();
        await leadRef.set({
            baitId,
            name,
            email,
            phone,
            capturedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        res.status(201).json({ message: 'Lead capturado com sucesso' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Listar leads por isca
router.get('/list/:baitId', async (req, res) => {
    const { baitId } = req.params;
    try {
        const leads = [];
        const snapshot = await db.collection('leads').where('baitId', '==', baitId).get();
        snapshot.forEach(doc => leads.push({ id: doc.id, ...doc.data() }));
        res.status(200).json(leads);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Exportar leads
router.get('/export/:baitId', async (req, res) => {
    const { baitId } = req.params;
    try {
        const leads = [];
        const snapshot = await db.collection('leads').where('baitId', '==', baitId).get();
        snapshot.forEach(doc => leads.push({ id: doc.id, ...doc.data() }));
        // Export leads in CSV format or another format
        res.status(200).json({ message: 'Leads exportados', data: leads });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
