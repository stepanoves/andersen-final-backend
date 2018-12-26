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

        this.__router.get('/', async(req, res) => {
            res.json(
                await userController.findAll()
            )
        });

        this.__router.get('/:id', async(req, res) => {
            const {id} = req.params;
            res.json(
                await userController.findOne(id)
            )
        });


        this.__router.post('/', async (req, res) => {
            const {body} = req;
            try {
                await userController.create(body);
                res.status(201).end();
            } catch (err) {
                res.status(409).end();
            }

        });

        this.__router.delete('/:id', async(req, res) => {
            const {id} = req.params;
            await userController.remove(id);
            res.status(200).end();
        });

        this.__router.put('/:id', async(req, res) => {
            const {id} = req.params;
            const {body} = req;
            await userController.update(id, {email: body.email, password: body.password});
            res.status(200).end();
        });
    }
}

exports.userRouter = new UserRouter();