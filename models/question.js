const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Question', {
        text: DataTypes.TEXT,
        type: DataTypes.ENUM('single', 'multi', 'boolean'),
        options: DataTypes.JSON,
        correctAnswer: DataTypes.JSON,
    }, {
        timestamps: false // 👈 Disable auto timestamps to keep the solution simple
    });
};
