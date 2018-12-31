const {Router} = require('express');
const {postController} = require('../controllers/PostController');
const {userInfoController} = require('../controllers/UserInfoController');
const {authMiddleware} = require('../middlewares/index');
const db = require('../db/dbORMConfig');
const UserInfo = db.userInfo;

class PostRouter {
    constructor() {
        this.__router = new Router();
        this.__configure();
    }

    getRoutes() {
        return this.__router;
    }

    __configure() {


        this.__router.get('/group/:id', authMiddleware, async(req, res) => {
            try {
                const {id} = req.params;
                const posts = await postController.findAll(id);
                const postsWithAuthorNames = Promise.all(posts.map(async (post) => {
                    const user = await UserInfo.findOne(
                        {
                            where: { userId: post.userId }
                        }
                    );
                    return {text: post.text, userName: user.name + ' ' + user.surname};
                }))
                    .then((res) => res);
                res.status(200).send({
                    posts: await postsWithAuthorNames
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
                await postController.create(body);
                res.status(201).end();
            } catch (err) {
                res.status(409).end();
            }
        });

        // this.__router.delete('/', async(req, res) => {
        //     if (!req.session.email) res.status(409).end();
        //
        //     const {body} = req;
        //     try {
        //         await postController.remove(body);
        //         res.status(200).end();
        //     } catch (err) {
        //         res.status(409).end();
        //
        //     }
        //
        // });

    }
}

exports.postRouter = new PostRouter();