const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');
const { getAllContests, getContestQuestions } = require('../controllers/contest.controller');

router.get('/', auth, getAllContests);
router.get('/:id/questions', auth, getContestQuestions);

module.exports = router;
