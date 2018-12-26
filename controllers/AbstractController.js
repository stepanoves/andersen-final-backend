class AbstractController {
    constructor(repository) {
        this.repository = repository;
    }

    async create(record) {
        return await this.repository.create(record);
    }

    async remove(id) {
        return await this.repository.remove(id);
    }

    async update(id, record) {
        return await this.repository.update(id, record);
    }

    async findAll() {
        return await this.repository.findAll();
    }

    async findOne(id) {
        return await this.repository.findOne(id);
    }
}

exports.AbstractController = AbstractController;