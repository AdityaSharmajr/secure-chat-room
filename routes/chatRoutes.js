const express = require('express');
const chatController = require('../controllers/chatController');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/chatrooms', authenticateToken, chatController.createChatRoom);
router.post('/joinroom', authenticateToken, chatController.joinChatRoom);

module.exports = router;
