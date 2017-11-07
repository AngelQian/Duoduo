/**
 * Created by aqian on 11/3/17.
 */
Posts = new Mongo.Collection('posts');

Posts.allow({
    insert: function(userId, doc){
        console.log('------userid=',userId);
        console.log('------doc=',doc);
        return userId;
        // return !!userId;
        // only allow insert if you are login in
    }
});
