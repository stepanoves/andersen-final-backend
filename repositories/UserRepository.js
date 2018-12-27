const { AbstractRepository } = require('./AbstractRepository');
const db = require('../db/dbORMConfig');
const User = db.user;

class UserRepository extends AbstractRepository {
    constructor() {
        super(User);
    }

    async findByParametrs(user) {
        return await User.findOne(
            {
                where: {email: user.email, password: user.password}
            }
        );
    }
}

exports.userRepository = new UserRepository();
