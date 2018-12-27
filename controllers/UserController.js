const { userRepository } = require('../repositories/UserRepository');
const { AbstractController } = require('./AbstractController');

class UserController extends AbstractController{
    constructor() {
        super(userRepository);
    }

    async findByParametrs(user) {
        return await userRepository.findByParametrs(user);
    }
}

exports.userController = new UserController();