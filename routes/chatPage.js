const express = require('express');
const router = express.Router();
const aiController = require('../controllers/ai');
const { ensureAuth } = require('../middleware/auth');

router.post('/sendAiReq', aiController.sendAiReq);

module.exports = router;
