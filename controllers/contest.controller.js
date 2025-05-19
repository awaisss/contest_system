const { Contest, Question } = require('../models');

exports.getAllContests = async (req, res) => {
    try {
        const userRole = req.user.role;
        const where = (userRole === 'vip' || userRole === 'admin') ? {} : { access: 'normal' };
        const contests = await Contest.findAll({ where });
        res.json(contests);
    } catch (err) {
        console.log('getAllContests:err: ',err);
        res.status(500).json({ error: 'Failed to fetch contests' });
    }
};

exports.getContestQuestions = async (req, res) => {
    try {
        const { id } = req.params;
        const questions = await Question.findAll({ where: { ContestId: id }, attributes: { exclude: ['correctAnswer'] } });
        res.json(questions);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch questions' });
    }
};
