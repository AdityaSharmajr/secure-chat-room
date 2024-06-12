const User = require('../models/User');

exports.viewProfile = (req, res) => {
    const { userId } = req.params;

    User.findById(userId, (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send('User not found');

        res.send(results[0]);
    });
};
