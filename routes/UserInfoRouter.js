const {Router} = require('express');
const {userInfoController} = require('../controllers/UserInfoController');

class UserInfoRouter {
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
                await userInfoController.findAll()
            )
        });

        this.__router.get('/:id', async(req, res) => {
            const {id} = req.params;
            res.json(
                await userInfoController.findOne(id)
            )
        });

        this.__router.post('/', async (req, res) => {
            const {body} = req;
            try {
                await userInfoController.create(body);
                res.status(201).end();
            } catch (err) {
                res.status(409).end();
            }
        });

        this.__router.delete('/:id', async(req, res) => {
            const {id} = req.params;
            await userInfoController.remove(id);
            res.status(200).end();
        });

        this.__router.put('/:id', async(req, res) => {
            const {id} = req.params;
            const {body} = req;
            const info = {name: body.name, surname: body.surname, specialization: body.specialization,
                        position: body.position, resumeLink: body.resumeLink };
            await userInfoController.update(id, info);
            res.status(200).end();
        });
    }
}

exports.userInfoRouter = new UserInfoRouter();