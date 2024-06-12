const db = require('../config/db');

const ChatRoom = {
    create: (chatroom, callback) => {
        db.query('INSERT INTO chatrooms SET ?', chatroom, callback);
    },
    findById: (roomId, callback) => {
        db.query('SELECT * FROM chatrooms WHERE roomId = ?', [roomId], callback);
    }
};

module.exports = ChatRoom;
