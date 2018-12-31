const {Router} = require('express');
const {userInfoController} = require('../controllers/UserInfoController');
const {userController} = require('../controllers/UserController');
const {authMiddleware} = require('../middlewares/index');

class UserInfoRouter {
    constructor() {
        this.__router = new Router();
        this.__configure();
    }

    getRoutes() {
        return this.__router;
    }

    __configure() {

        this.__router.get('/', authMiddleware, async(req, res) => {
            try {
                const info = await userInfoController.findOne(req.session.userID)
                res.status(200).send({
                    info: info
                })
            } catch (error) {
                res.status(403).send({
                    errorMessage: 'Access Denied.'
                });
            }
        });

        this.__router.get('/:id', async(req, res) => {
            const {id} = req.params;
            if (!req.session.userID) res.status(409).end();
            try {
                res.json(
                    await userInfoController.findOne(id)
                )
            } catch (error) {
                res.status(200).end();
            }

        });

        this.__router.post('/', authMiddleware, async (req, res) => {
            const {body} = req;

            try {
                body.userId = req.session.userID;
                await userInfoController.create(body);
                res.status(201).end();
            } catch (err) {
                res.status(409).end();
            }
        });

        // this.__router.delete('/:id', async(req, res) => {
        //     const {id} = req.params;
        //     await userInfoController.remove(id);
        //     res.status(200).end();
        // });

        this.__router.put('/', async(req, res) => {
            // const {id} = req.params;
            // const user = await userController.findOne(id);
            if (!req.session.userID) res.status(409).end();
            // if(user.email !== req.session.email) res.status(409).end();
            const {body} = req;
            try {
                const info = {name: body.name, surname: body.surname, specialization: body.specialization,
                    position: body.position, resumeLink: body.resumeLink };
                await userInfoController.update(req.session.userID, info);
                res.status(200).end();
            } catch (error) {
                res.status(409).end();
            }

        });
    }
}

exports.userInfoRouter = new UserInfoRouter();