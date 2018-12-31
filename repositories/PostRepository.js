const { AbstractRepository } = require('./AbstractRepository');
const db = require('../db/dbORMConfig');
const Post = db.post;
const GroupUsers = db.groupsUsers;
const Group = db.group;


class PostRepository extends AbstractRepository {
    constructor() {
        super(Post);
    }

    async create(post) {
            return await super.create(post);

    }

    async remove(postUser) {
        const post = await super.findOne(postUser.postID);
        if (postUser.userID == post.userId) {
            return await super.remove(postUser.postID);
        } else {
            throw ("This user can't delete post in this post");
        }
    }

    async findAll(groupID) {
        return await Post.findAll(
            {
                where: {groupId: groupID}
            }
        )
    }
}
exports.postRepository = new PostRepository();
