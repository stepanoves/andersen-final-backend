const { AbstractRepository } = require('./AbstractRepository');
const db = require('../db/dbORMConfig');
const Group = db.group;
const GroupUsers = db.groupsUsers;
const userInfo = db.userInfo;


class GroupRepository extends AbstractRepository {
    constructor() {
        super(Group);
    }

    async findParticipantInfo(groupId) {

        let usersID = await GroupUsers.findAll(
            {attributes: ['userId'], where: {groupId: groupId}}
        );

        return await userInfo.findAll(
            {
                where: { userId : usersID.map(el => el.userId) }
            }
        )
    }

    async createParticipant(groupUser) {
        return await GroupUsers.create(groupUser);
    }

    async removeParticipant(groupUser) {
        return await GroupUsers.destroy(
            {where: {groupId: groupUser.groupId, userId: groupUser.userId}}
        );
    }
}
exports.groupRepository = new GroupRepository();
