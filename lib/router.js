/**
 * Created by aqian on 11/3/17.
 */
Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function() { return Meteor.subscribe('posts'); }
});
Router.route('/', {name: 'postsList'});
// Router 1) search its own name 2)search path name
Router.route('/posts/:_id', {
    name: 'postPage',
    data: function() { return Posts.findOne(this.params._id); }
});
Router.onBeforeAction('dataNotFound', {only: 'postPage'});
/*
This tells Iron Router to show the 'not found' page not just for invalid routes but also for the
postPage route, whenever the data function returns a 'false' (i.e. null , false , undefined ,
    or empty) object.
*/
