const {Router} = require('express');
const {userController} = require('../controllers/UserController');

class AuthRouter {
    constructor() {
        this.__router = new Router();
        this.__configure();
    }

    getRoutes() {
        return this.__router;
    }

    __configure() {

        this.__router.post('/login', async (req, res) => {
            const {body} = req;
            try {
                const user = await userController.findByParametrs(body);
                if (user.email === body.email && user.password === body.password) {
                    req.session.email = body.email;
                    res.send(`Login successful sessionID: ${req.session.id} user: ${req.session.email}`);
                }
            } catch (error){
                res.status(409).end();
            }
        });

        this.__router.get('/logout', async (req, res) => {
            const {body} = req;
            try {
                req.session.email = '';
                res.status(200).end();
            } catch (error){
                res.status(409).end();
            }
        });

    }
}

exports.authRouter = new AuthRouter();