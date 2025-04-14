require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const notificationRoutes = require('./routes/notification.routes');
const matchRoutes = require('./routes/match.routes');
const userRoutes = require('./routes/user.routes');
const chatRoutes = require('./routes/chat.routes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/notify', notificationRoutes);
app.use('/api/match', matchRoutes);
app.use('/api/users', userRoutes);
app.use('/api/chat', chatRoutes);
app.get('/', (req, res) => {
  res.send('GymBuddies API Server is running');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server is running on http://0.0.0.0:${PORT}`);
});
