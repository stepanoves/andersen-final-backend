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
            const {id} = req.params;
            console.log(id);
            res.json(
                await postController.findAll(id)
            )
        });

        this.__router.post('/', async (req, res) => {
            const {body} = req;
            try {
                await postController.create(body);
                res.status(201).end();
            } catch (err) {
                res.status(409).end();
            }
        });

        this.__router.delete('/:idPost/:idUser', async(req, res) => {
            const {idPost} = req.params;
            const {idUser} = req.params;
            try {
                await postController.remove(idPost, idUser);
                res.status(200).end();
            } catch (err) {
                res.status(409).end();
                res.text(err.message)
            }

        });

    }
}

exports.postRouter = new PostRouter();