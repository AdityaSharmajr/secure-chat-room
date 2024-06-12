const FriendRequest = require('../models/FriendRequest');

exports.sendFriendRequest = (req, res) => {
    const { receiverId } = req.body;
    const friendRequest = { senderId: req.user.userId, receiverId };

    FriendRequest.create(friendRequest, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(201).send('Friend request sent');
    });
};
