const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Participation', {
        score: DataTypes.INTEGER,
        answers: DataTypes.JSON,
        submitted: { type: DataTypes.BOOLEAN, defaultValue: false },
        prizeWon: { type: DataTypes.STRING, allowNull: true },
    }, {
        timestamps: false // 👈 Disable auto timestamps to keep it simple
    });
};
