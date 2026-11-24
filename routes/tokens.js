const express = require('express');
const crypto = require('crypto');
const { ObjectId } = require('mongodb');
const { getDB } = require('../lib/db');
const { requireLogin, requireOwner } = require('../lib/session');

const router = express.Router();

const generateToken = () => crypto.randomBytes(32).toString('hex');
const hashToken = (t) => crypto.createHash('sha256').update(t).digest('hex');

// Buat token baru (hanya owner)
router.post('/', requireLogin, requireOwner, async (req, res) => {
  try {
    const { name = 'default', maxUses = 1000, days = 30 } = req.body;
    const token = generateToken();

    await getDB().collection('api_tokens').insertOne({
      name,
      hash: hashToken(token),
      createdBy: req.user.sub,
      maxUses: Number(maxUses),
      uses: 0,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + Number(days) * 24 * 60 * 60 * 1000),
      revoked: false
    });

    // Token asli hanya ditampilkan sekali
    res.json({ token, name, maxUses: Number(maxUses), days: Number(days) });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Lihat daftar token (tanpa hash)
router.get('/', requireLogin, requireOwner, async (req, res) => {
  const list = await getDB().collection('api_tokens')
    .find({}, { projection: { hash: 0 } }).toArray();
  res.json(list);
});

// Cabut token
router.post('/:id/revoke', requireLogin, requireOwner, async (req, res) => {
  try {
    await getDB().collection('api_tokens').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { revoked: true } }
    );
    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ error: 'ID tidak valid' });
  }
});

module.exports = router;