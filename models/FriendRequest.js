const db = require('../config/db');

const FriendRequest = {
    create: (friendRequest, callback) => {
        db.query('INSERT INTO friend_requests SET ?', friendRequest, callback);
    }
};

module.exports = FriendRequest;
