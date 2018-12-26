const { AbstractRepository } = require('./AbstractRepository');
const db = require('../db/dbORMConfig');
const UserInfo = db.userInfo;


class UserInfoRepository extends AbstractRepository {
    constructor() {
        super(UserInfo);
    }

    async create(userInfo) {
        const info = await UserInfo.findOne(
            { where: {userId: userInfo.userId}}
        );

        if (!info) {
            super.create(userInfo);
        } else {
            throw ('This user already has information about himself')
        }
    }

    async update(id, record) {
        return await this.model.update(
            record,
            {where: {userId: id}}
        );
    }

    async findOne(id) {
        return await UserInfo.findOne({ where: {userId: id } });
    }

    async remove(id) {
        return await UserInfo.destroy({ where: {userId: id } });
    }
}
exports.userRepository = new UserInfoRepository();
