const {Router} = require('express');
const {postController} = require('../controllers/PostController');

class PostRouter {
    constructor() {
        this.__router = new Router();
        this.__configure();
    }

    getRoutes() {
        return this.__router;
    }

    __configure() {


        this.__router.get('/group/:id', async(req, res) => {
            if (!req.session.email) res.status(409).end();
            const {id} = req.params;
            console.log(id);
            res.json(
                await postController.findAll(id)
            )
        });

        this.__router.post('/', async (req, res) => {
            if (!req.session.email) res.status(409).end();
            const {body} = req;
            try {
                await postController.create(body);
                res.status(201).end();
            } catch (err) {
                res.status(409).end();
            }
        });

        this.__router.delete('/', async(req, res) => {
            if (!req.session.email) res.status(409).end();
            const {body} = req;
            try {
                await postController.remove(body);
                res.status(200).end();
            } catch (err) {
                res.status(409).end();

            }

        });

    }
}

exports.postRouter = new PostRouter();