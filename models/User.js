const db = require('../config/db');

const User = {
    create: (user, callback) => {
        const query = 'INSERT INTO users (deviceId, name, phone, availCoins, password) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [user.deviceId, user.name, user.phone, user.availCoins, user.password], callback);
    },
    findByPhone: (phone, callback) => {
        const query = 'SELECT * FROM users WHERE phone = ?';
        db.query(query, [phone], callback);
    },
    findById: (userId, callback) => {
        const query = 'SELECT * FROM users WHERE userId = ?';
        db.query(query, [userId], callback);
    }
};

module.exports = User;
