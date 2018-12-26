const { AbstractRepository } = require('./AbstractRepository');
const db = require('../db/dbORMConfig');
const User = db.user;

class UserRepository extends AbstractRepository {
    constructor() {
        super(User);
    }
}

exports.userRepository = new UserRepository();
