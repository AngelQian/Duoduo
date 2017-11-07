/**
 * Created by aqian on 11/3/17.
 */
Posts = new Mongo.Collection('posts');

Posts.allow({
    //insert: function(userId, doc){
    //    return userId;
    //    // return !!userId;
    //    // only allow insert if you are login in
    //}
    //update: function(userId, post) { return ownsDocument(userId, post); },
    remove: function(userId, post) { return ownsDocument(userId, post); }
});
Posts.deny({
    update: function(userId, post, fieldNames) {
        // may only edit the following two fields:
        return (_.without(fieldNames, 'url', 'title').length > 0);
    }
});

Meteor.methods({
    postInsert: function(postAttributes) {
        check(Meteor.userId(), String);
        check(postAttributes, {
            title: String,
            url: String
        });

        if (Meteor.isServer) {
            postAttributes.title += "(server)";
            // wait for 5 seconds
            Meteor._sleepForMs(5000);
        } else {
            postAttributes.title += "(client)";
        }

        var postWithSameLink = Posts.findOne({url: postAttributes.url});
        if (postWithSameLink) {
            return {
                postExists: true,
                _id: postWithSameLink._id
            }
        }

        var user = Meteor.user();
        var post = _.extend(postAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date()
        });

        var postId = Posts.insert(post);
        return {
            _id: postId
        };
    },
    postUpdate: function(postAttributes){
        check(postAttributes,{
            title: String,
            url: String,
            _id: String
        });
        var url = postAttributes.url;
        var exit = Posts.findOne({_id: postAttributes._id});
        if(exit && exit.url == postAttributes.url && exit.title==postAttributes.title){
            return {postChange: false, _id: exit._id};
        }

        var update = Posts.update(exit._id, {$set: {title:postAttributes.title, url: postAttributes.url}});
        return {_id : exit._id};
    }
});
