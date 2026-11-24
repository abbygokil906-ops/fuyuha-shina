const crypto = require('crypto');
const { getDB } = require('./db');

const hashToken = (t) => crypto.createHash('sha256').update(t).digest('hex');

async function requireApiToken(req, res, next) {
  try {
    const auth = req.headers.authorization || '';
    if (!auth.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token tidak ada' });
    }

    // Cek sekaligus naikkan counter, supaya aman dari request bersamaan
    const doc = await getDB().collection('api_tokens').findOneAndUpdate(
      {
        hash: hashToken(auth.slice(7)),
        revoked: false,
        expiresAt: { $gt: new Date() },
        $expr: { $lt: ['$uses', '$maxUses'] }
      },
      { $inc: { uses: 1 } },
      { returnDocument: 'after' }
    );

    if (!doc) {
      return res.status(401).json({ error: 'Token tidak valid, habis, atau kedaluwarsa' });
    }

    res.setHeader('X-Uses-Left', doc.maxUses - doc.uses);
    req.apiToken = doc;
    next();
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { requireApiToken };