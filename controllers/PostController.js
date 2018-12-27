const { postRepository } = require('../repositories/PostRepository');
const { AbstractController } = require('./AbstractController');

class PostController extends AbstractController{
    constructor() {
        super(postRepository);
    }

    async findAll(groupID) {
        return await postRepository.findAll(groupID);
    }

}

exports.postController = new PostController();