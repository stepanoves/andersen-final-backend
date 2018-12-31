exports.validatePayloadMiddleware = (req, res, next) => {
    if (req.body) {
        next();
    } else {
        res.status(403).send({
            errorMessage: 'You need a payload'
        });
    }
};

exports.authMiddleware = (req, res, next) => {
    if(req.session && req.session.userID) {
        next();
    } else {
        res.status(403).send({
            errorMessage: 'You must be logged in.'
        });
    }
};

