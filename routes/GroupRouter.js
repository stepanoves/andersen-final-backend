const {Router} = require('express');
const {groupController} = require('../controllers/GroupController');

class GroupRouter {
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
                await groupController.findAll()
            )
        });

        this.__router.get('/:id/findparticipantinfo', async(req, res) => {
            const {id} = req.params;
            res.json(
                await groupController.findParticipantInfo(id)
            )
        });

        this.__router.get('/:id', async(req, res) => {
            const {id} = req.params;
            res.json(
                await groupController.findOne(id)
            )
        });

        this.__router.post('/', async (req, res) => {
            const {body} = req;
            try {
                await groupController.create(body);
                res.status(201).end();
            } catch (err) {
                res.status(409).end();
            }
        });

        this.__router.post('/createparticipant', async (req, res) => {
            const {body} = req;
            try {
                await groupController.createParticipant(body);
                res.status(201).end();
            } catch (err) {
                res.status(409).end();
            }
        });

        this.__router.delete('/removeparticipant', async(req, res) => {
            const {body} = req;
            console.log(body)
            await groupController.removeParticipant(body);
            res.status(200).end();
        });

        this.__router.delete('/:id', async(req, res) => {
            const {id} = req.params;
            await groupController.remove(id);
            res.status(200).end();
        });

    }
}

exports.groupRouter = new GroupRouter();