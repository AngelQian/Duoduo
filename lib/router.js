/**
 * Created by aqian on 11/3/17.
 */
Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function() {
        //return Meteor.subscribe('posts');
        return [Meteor.subscribe('posts'), Meteor.subscribe('comments')];
    }
});
Router.route('/', {name: 'postsList'});
// Router 1) search its own name 2)search path name

Router.route('/posts/:_id', {
    name: 'postPage',
    data: function() { return Posts.findOne(this.params._id); }
});

Router.route('/submit',{name: 'postSubmit'});

Router.route('/posts/:_id/edit', {
    name: 'postEdit',
    data: function() { return Posts.findOne(this.params._id); }
});

var requireLogin = function(){
    if(!Meteor.user()){
        //this.render('accessDenied');
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            this.render('accessDenied');
        }
    }else{
        this.next();
    }
};


Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});
/*
This tells Iron Router to show the 'not found' page not just for invalid routes but also for the
postPage route, whenever the data function returns a 'false' (i.e. null , false , undefined ,
    or empty) object.
*/
