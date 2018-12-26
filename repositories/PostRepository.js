const { AbstractRepository } = require('./AbstractRepository');
const db = require('../db/dbORMConfig');
const Post = db.post;
const GroupUsers = db.groupsUsers;


class PostRepository extends AbstractRepository {
    constructor() {
        super(Post);
    }

    async create(post) {
        const userGroup = await GroupUsers.findOne(
            {where: {groupId: post.groupId, userId: post.userId}}
        );
        if (userGroup) {
            return await super.create(post);
        } else {
            throw ("This user can't create post in this group");
        }
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
