const { userRepository } = require('../repositories/UserRepository');
const { AbstractController } = require('./AbstractController');

class UserController extends AbstractController{
    constructor() {
        super(userRepository);
    }
}

exports.userController = new UserController();