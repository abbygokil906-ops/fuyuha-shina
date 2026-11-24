const express = require('express');
const { getStats } = require('../../../lib/stats');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const stats = await getStats();
    res.json({
      success: true,
      total: stats.total,
      today: stats.today,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal membaca stats' });
  }
});

module.exports = router;