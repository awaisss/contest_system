const { Participation, Question, Contest } = require('../models');

exports.startParticipation = async (req, res) => {
    try {
        const { contestId } = req.body;
        const existing = await Participation.findOne({ where: { ContestId: contestId, UserId: req.user.id } });
        if (existing) return res.status(400).json({ error: 'Already participating' });

        const participation = await Participation.create({ ContestId: contestId, UserId: req.user.id });
        res.json(participation);
    } catch {
        res.status(500).json({ error: 'Failed to start participation' });
    }
};

exports.submitAnswers = async (req, res) => {
    try {
        const { contestId, answers } = req.body;
        const participation = await Participation.findOne({ where: { ContestId: contestId, UserId: req.user.id } });
        if (!participation || participation.submitted) return res.status(400).json({ error: 'Invalid or already submitted' });

        const questions = await Question.findAll({ where: { ContestId: contestId } });

        let score = 0;
        for (const userAnswer of answers) {
            const question = questions.find(q => q.id === userAnswer.questionId);
            if (!question) continue;

            const correct = JSON.stringify(question.correctAnswer.sort()) === JSON.stringify(userAnswer.answer.sort());
            if (correct) score += 1;
        }

        participation.score = score;
        participation.answers = answers;
        participation.submitted = true;

        const contest = await Contest.findByPk(contestId);
        participation.prizeWon = score > 0 ? contest.prize : null;

        await participation.save();
        res.json({ score, prize: participation.prizeWon });
    } catch {
        res.status(500).json({ error: 'Failed to submit answers' });
    }
};

exports.getUserHistory = async (req, res) => {
    try {
        const history = await Participation.findAll({ where: { UserId: req.user.id } });
        res.json(history);
    } catch {
        res.status(500).json({ error: 'Failed to fetch history' });
    }
};
