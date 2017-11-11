/**
 * Created by aqian on 11/3/17.
 */
Meteor.publish('posts', function(options) {
    check(options, {
        sort: Object,
        limit: Number
    });
    return Posts.find({}, options);
});

// you can have more than one publication for each collection
Meteor.publish('singlePost', function(postId) {
    check(postId, String);
    return Posts.find(postId);
});

Meteor.publish('comments', function(postId) {
    check(postId, String);
    return Comments.find({postId: postId});
});

Meteor.publish('notifications', function() {
    return Notifications.find({userId: this.userId, read: false});
});