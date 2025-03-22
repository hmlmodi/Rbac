const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
const roleRoutes = require('./routes/role.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;