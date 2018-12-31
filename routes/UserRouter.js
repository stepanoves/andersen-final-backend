const {Router} = require('express');
const {userController} = require('../controllers/UserController');

class UserRouter {
    constructor() {
        this.__router = new Router();
        this.__configure();
    }

    getRoutes() {
        return this.__router;
    }

    __configure() {

        // this.__router.get('/', async(req, res) => {
        //     res.json(
        //         await userController.findAll()
        //     )
        // });
        //
        // this.__router.get('/:id', async(req, res) => {
        //     const {id} = req.params;
        //     const user = await userController.findOne(id);
        //     if (!req.session.email) res.status(409).end();
        //     if(user.email !== req.session.email) res.status(409).end();
        //     res.json(
        //         await userController.findOne(id)
        //     )
        // });
        //

        this.__router.post('/', async (req, res) => {
            const {body} = req;
            if (req.session.userID) res.status(409).end();
            try {
                await userController.create(body);
                res.status(201).end();
            } catch (err) {
                res.status(409).send('This email is already registered');
            }

        });

        //
        // this.__router.delete('/:id', async(req, res) => {
        //     const {id} = req.params;
        //     await userController.remove(id);
        //     res.status(200).end();
        // });

        this.__router.put('/', async(req, res) => {
            // const {id} = req.params;
            const user = await userController.findOne(id);
            if (!req.session.userID) res.status(409).end();
            // if(user.email !== req.session.email) res.status(409).end();

            try {
                const {body} = req;
                await userController.update(req.session.userID, {email: body.email, password: body.password});
                res.status(200).end();
            } catch (error) {
                res.status(409).end();
            }

        });
    }
}

exports.userRouter = new UserRouter();