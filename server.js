const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');
const profileRoutes = require('./routes/profileRoutes');
const friendRequestRoutes = require('./routes/friendRequestRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/api', authRoutes);
app.use('/api', chatRoutes);
app.use('/api', profileRoutes);
app.use('/api', friendRequestRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
