const express = require('express');
const friendRequestController = require('../controllers/friendRequestController');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/friend-requests', authenticateToken, friendRequestController.sendFriendRequest);

module.exports = router;
