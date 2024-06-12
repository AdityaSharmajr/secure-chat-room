const db = require('../config/db');

const Message = {
    countByRoomId: (roomId, callback) => {
        db.query('SELECT COUNT(*) AS count FROM messages WHERE roomId = ?', [roomId], callback);
    }
};

module.exports = Message;
