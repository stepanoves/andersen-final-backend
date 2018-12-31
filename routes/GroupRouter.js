const {Router} = require('express');
const {groupController} = require('../controllers/GroupController');
const {authMiddleware} = require('../middlewares/index');


class GroupRouter {
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
                const groups = await groupController.findAll();
                res.status(200).send({
                    groups: groups
                })
            } catch (error) {
                res.status(403).send({
                    errorMessage: 'Access Denied.'
                });
            }
        });

        this.__router.get('/:id/findparticipantinfo', authMiddleware, async(req, res) => {
            if (!req.session.email) res.status(409).end();
            const {id} = req.params;
            res.json(
                await groupController.findParticipantInfo(id)
            )
        });

        this.__router.get('/:id', authMiddleware, async(req, res) => {
            const {id} = req.params;
            try {
                const rights = await groupController.isExist(id, req.session.userID);
                const group = await groupController.findOne(id);
                res.status(200).send({
                    group: group,
                    rights: rights
                })
            } catch (error) {
                res.status(403).send({
                    errorMessage: 'Access Denied.'
                });
            }
        });

        this.__router.post('/', authMiddleware, async (req, res) => {

            const {body} = req;
            try {
                body.userId = req.session.userID;
                await groupController.create(body);
                res.status(201).send();
            } catch (err) {
                res.status(409).end();
            }
        });



        this.__router.post('/createparticipant', authMiddleware, async (req, res) => {
            const {body} = req;

            try {
                body.userId = req.session.userID;

                await groupController.createParticipant(body);
                res.status(201).end();
            } catch (err) {
                res.status(409).end();
            }
        });

        this.__router.delete('/removeparticipant/:id/', async(req, res) => {

            const {id} = req.params;
            console.log(id +' '+ req.session.userID);
            try {
                await groupController.removeParticipant(id, req.session.userID);
                res.status(201).end();
            } catch (err) {
                res.status(409).end();
            }
        });

        // this.__router.delete('/:id', async(req, res) => {
        //     if (!req.session.email) res.status(409).end();
        //     const {id} = req.params;
        //     try {
        //         await groupController.remove(id);
        //         res.status(201).end();
        //     } catch (err) {
        //         res.status(409).end();
        //     }
        // });

    }
}

exports.groupRouter = new GroupRouter();