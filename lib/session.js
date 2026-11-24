const jwt = require('jsonwebtoken');

function requireLogin(req, res, next) {
  const token = req.cookies?.session;
  if (!token) return res.status(401).json({ error: 'Belum login' });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'Sesi tidak valid' });
  }
}

function requireOwner(req, res, next) {
  if (req.user?.role !== 'owner') {
    return res.status(403).json({ error: 'Hanya owner' });
  }
  next();
}

module.exports = { requireLogin, requireOwner };