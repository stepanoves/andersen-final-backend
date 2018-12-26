const { postRepository } = require('../repositories/PostRepository');
const { AbstractController } = require('./AbstractController');

class PostController extends AbstractController{
    constructor() {
        super(postRepository);
    }

    async findAll(groupID) {
        return await postRepository.findAll(groupID);
    }

    // async remove(postUser) {
    //     return await postRepository.remove(postID, userID);
    // }
}

exports.postController = new PostController();