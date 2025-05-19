const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const { startParticipation, submitAnswers, getUserHistory } = require('../controllers/participation.controller');

router.post('/start', auth, startParticipation);
router.post('/submit', auth, submitAnswers);
router.get('/history', auth, getUserHistory);

module.exports = router;
