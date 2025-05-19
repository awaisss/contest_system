const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Contest', {
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        startTime: DataTypes.DATE,
        endTime: DataTypes.DATE,
        prize: DataTypes.STRING,
        access: DataTypes.ENUM('vip', 'normal'),
    }, {
        timestamps: false // 👈 Disable auto timestamps to keep the solution simple
    });
};
