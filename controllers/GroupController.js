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

    async removeParticipant(groupUser) {
        return await groupRepository.removeParticipant(groupUser);
    }


}

exports.groupController = new GroupController();