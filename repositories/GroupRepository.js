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

    async isExist(groupId, userId) {
        const grUserParticipant = await GroupUsers.findOne(
            {where: {groupId: groupId, userId: userId}}
        );
        const grUserMain = await Group.findOne(
            {where: {id: groupId, userId: userId}}
        )

        return {participant: !!grUserParticipant, main: !!grUserMain};
    }

    async createParticipant(groupUser) {
        return await GroupUsers.create(groupUser);
    }

    async removeParticipant(groupId, userId) {
        return await GroupUsers.destroy(
            {where: {groupId: groupId, userId: userId}}
        );
    }
}
exports.groupRepository = new GroupRepository();
