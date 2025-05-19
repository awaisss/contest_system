const router = require('express').Router();
const { register, login } = require('../controllers/auth.controller');
const rateLimit = require('../middleware/rateLimit.middleware');

router.post('/register', rateLimit, register);
router.post('/login', rateLimit, login);

module.exports = router;
