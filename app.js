require('dotenv').config();
const express = require('express');
const app = express();
const { sequelize } = require('./models');

app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/contests', require('./routes/contest.routes'));
app.use('/api/participation', require('./routes/participation.routes'));

const PORT = process.env.PORT || 3000;
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
