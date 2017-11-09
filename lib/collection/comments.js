/**
 * Created by aqian on 11/8/17.
 */
Comments = new Mongo.Collection('comments');
Meteor.methods({
    commentInsert: function(commentAttributes) {
        check(this.userId, String);
        check(commentAttributes, {
            postId: String,
            body: String
        });
        var user = Meteor.user();
        var post = Posts.findOne(commentAttributes.postId);
        if (!post)
            throw new Meteor.Error('invalid-comment', 'You must comment on a post');

        var comment = _.extend(commentAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date()
        });

        // update the post with the number of comments
        Posts.update(comment.postId, {$inc: {commentsCount: 1}});

        return Comments.insert(comment);
    }
});