const {Router} = require('express');
const {userController} = require('../controllers/UserController');
const {validatePayloadMiddleware} = require('../middlewares/index');

class AuthRouter {
    constructor() {
        this.__router = new Router();
        this.__configure();
    }

    getRoutes() {
        return this.__router;
    }

    __configure() {

        this.__router.post('/login', validatePayloadMiddleware, async (req, res) => {
            const {body} = req;
            try {
                const user = await userController.findByParametrs(body);
                if (user.email === body.email && user.password === body.password) {
                    req.session.userID = user.id;
                    res.status(200).send({
                        user: user.id
                    });
                } else {
                    res.status(403).send({
                        errorMessage: 'Permission denied!'
                    });
                }
            } catch (error){
                res.status(409).end();
            }
        });

        this.__router.get('/login', (req, res) => {
            req.session.userID ? res.status(200).send({loggedIn: true}) : res.status(200).send({loggedIn: false});
        });

        this.__router.post('/logout', (req, res) => {
            req.session.destroy((err) => {
                if (err) {
                    res.status(500).send('Could not log out.');
                } else {
                    res.status(200).send({});
                }
            });
        });

    }
}

exports.authRouter = new AuthRouter();