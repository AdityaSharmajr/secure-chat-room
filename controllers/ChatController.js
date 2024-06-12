const ChatRoom = require('../models/ChatRoom');
const Message = require('../models/Message');

exports.createChatRoom = (req, res) => {
    if (!req.user.isPrime) return res.status(403).send('Only prime members can create chat rooms');

    const chatroom = { roomName: req.body.roomName, createdBy: req.user.userId };
    ChatRoom.create(chatroom, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(201).send({ roomId: results.insertId });
    });
};

exports.joinChatRoom = (req, res) => {
    const { roomId } = req.body;

    ChatRoom.findById(roomId, (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send('Chat room not found');

        const chatroom = results[0];

        Message.countByRoomId(roomId, (err, results) => {
            if (err) return res.status(500).send(err);
            if (results[0].count >= chatroom.capacity) return res.status(403).send('Room capacity reached');

            // Join logic here...

            res.send('Joined room');
        });
    });
};
