const { RateLimiterMemory } = require('rate-limiter-flexible');
// Note we can build the custom rate limit functionality for each module routes using redis also

const limiter = new RateLimiterMemory({
    points: 10, // max 10 requests
    duration: 60,
});

module.exports = (req, res, next) => {
    limiter.consume(req.ip)
        .then(() => next())
        .catch(() => res.status(429).send('Too many requests'));
};
