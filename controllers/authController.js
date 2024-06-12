const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const secretKey = 'your-secret-key';

exports.register = async (req, res) => {
    const { deviceId, name, phone, availCoins, password } = req.body;
    if (!deviceId || !name || !phone || !availCoins || !password) {
        return res.status(400).send('All fields are required');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = { deviceId, name, phone, availCoins, password: hashedPassword };

        User.create(user, (err, results) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).send('User with this phone already exists');
                }
                return res.status(500).send('Database error');
            }
            res.status(201).send({ userId: results.insertId });
        });
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
    const { phone, password } = req.body;
    if (!phone || !password) {
        return res.status(400).send('Phone and password are required');
    }

    try {
        User.findByPhone(phone, async (err, results) => {
            if (err) return res.status(500).send('Database error');
            if (results.length === 0) return res.status(400).send('User not found');

            const user = results[0];
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) return res.status(400).send('Invalid password');

            const token = jwt.sign({ userId: user.userId, isPrime: user.isPrime }, secretKey, { expiresIn: '1h' });
            res.send({ token });
        });
    } catch (err) {
        res.status(500).send('Server error');
    }
};
