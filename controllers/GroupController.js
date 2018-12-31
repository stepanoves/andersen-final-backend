const { groupRepository } = require('../repositories/GroupRepository');
const { AbstractController } = require('./AbstractController');

class GroupController extends AbstractController{
    constructor() {
        super(groupRepository);
    }

    async findParticipantInfo(id) {
        return await groupRepository.findParticipantInfo(id);
    }

    async createParticipant(groupUser) {
        return await groupRepository.createParticipant(groupUser);
    }

    async removeParticipant(groupId, userId) {
        return await groupRepository.removeParticipant(groupId, userId);
    }

    async isExist(groupId, userId) {
        return await groupRepository.isExist(groupId, userId);
    }


}

exports.groupController = new GroupController();