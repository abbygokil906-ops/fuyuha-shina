const express = require('express');
const { requireApiToken } = require('../../lib/apiToken');
const statusRoute = require('./status/route');
const sendLinkRoute = require('./send-link/route');
const verifyLinkRoute = require('./verify-link/route');
const statsRoute = require('./stats/route');

const router = express.Router();

router.use('/status', statusRoute);
router.use('/send-link', sendLinkRoute);
router.use('/verify-link', verifyLinkRoute);
router.use('/stats', statsRoute);

// Route tes untuk token API (boleh dihapus setelah tes selesai)
router.get('/tes-token', requireApiToken, (req, res) => {
  res.json({ ok: true, sisa: req.apiToken.maxUses - req.apiToken.uses });
});

module.exports = router;