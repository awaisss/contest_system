const sequelize = require('../config/db');
const User = require('./user')(sequelize);
const Contest = require('./contest')(sequelize);
const Question = require('./question')(sequelize);
const Participation = require('./participation')(sequelize);

// Relations
User.hasMany(Participation);
Participation.belongsTo(User);

Contest.hasMany(Question);
Contest.hasMany(Participation);
Question.belongsTo(Contest);
Participation.belongsTo(Contest);

module.exports = { sequelize, User, Contest, Question, Participation };