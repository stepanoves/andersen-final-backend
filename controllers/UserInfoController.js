const { userRepository } = require('../repositories/UserInfoRepository');
const { AbstractController } = require('./AbstractController');

class UserInfoController extends AbstractController{
    constructor() {
        super(userRepository);
    }
}

exports.userInfoController = new UserInfoController();