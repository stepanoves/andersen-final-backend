class AbstractRepository {

    constructor(model) {
        this.model = model;
    }

    async create(record) {
        return await this.model.create(record);
    }

    async remove(id) {
        return await this.model.destroy(
            {where: {id: id}}
        );
    }

    async update(id, record) {
        return await this.model.update(
            record,
            {where: {id: id}}
        );
    }

    async findAll() {
        return await this.model.findAll();
    }

    async findOne(id) {
        return await this.model.findById(id);
    }
}

exports.AbstractRepository = AbstractRepository;
