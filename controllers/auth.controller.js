const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

/**
 * Register a new user
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
exports.register = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            password: hashedPassword,
            role
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        });

    } catch (error) {
        // 👇 Check for Sequelize Unique Constraint Error
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({
                error: "Username already exists"
            });
        }

        // 👇 Catch-all for any other errors
        console.error("Registration error:", error);
        res.status(500).json({
            error: "Internal server error"
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        res.json({ message: 'Logged in successfully', token });
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ error: error.errors[0].message });
        }

        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ error: error.errors[0].message });
        }

        if (error.message === 'NotFound') {
            return res.status(404).json({ error: 'Resource not found' });
        }

        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }

};
