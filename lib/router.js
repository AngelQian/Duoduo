/**
 * Created by aqian on 11/3/17.
 */
Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function() {
        return [Meteor.subscribe('notifications')];
    }
});
// Router 1) search its own name 2)search path name

Router.route('/posts/:_id', {
    name: 'postPage',
    waitOn: function() {
        return [
            Meteor.subscribe('singlePost', this.params._id),
            Meteor.subscribe('comments', this.params._id)
        ];
    },
    data: function() {
        var rt = Posts.findOne(this.params._id);
        console.log('====> id = ', this.params._id);
        console.log('====> data = ',Posts.find().fetch());
        return rt;
    }
});


Router.route('/posts/:_id/edit', {
    name: 'postEdit',
    waitOn: function() {
        return Meteor.subscribe('singlePost', this.params._id);
    },
    data: function() { return Posts.findOne(this.params._id); }
});

Router.route('/submit',{name: 'postSubmit'});

//subscribe to the posts publication when loading the postsList route
PostsListController = RouteController.extend({
    template: 'postsList',
    increment: 5,
    postsLimit: function() {
        return parseInt(this.params.postsLimit) || this.increment;
    },
    findOptions: function() {
        return {sort: this.sort, limit: this.postsLimit()};
    },
    //waitOn: function() {
    //    return Meteor.subscribe('posts', this.findOptions());
    //},
    subscriptions: function() {
        this.postsSub = Meteor.subscribe('posts', this.findOptions());
    },
    posts: function() {
        return Posts.find({}, this.findOptions());
    },
    data: function() {
        var hasMore = this.posts().count() === this.postsLimit();

        // //telling the postsList route to build its own path using that JavaScript object{} as data context
        //var nextPath = this.route.path({postsLimit: this.postsLimit() + this.increment});

        return {
            posts: this.posts(),
            ready: this.postsSub.ready,
            nextPath: hasMore ? this.nextPath : null
        };
    }
});

NewPostsController = PostsListController.extend({
    sort: {submitted: -1, _id: -1},
    nextPath: function() {
        return Router.routes.newPosts.path({postsLimit: this.postsLimit() + this.increment})
    }
});
BestPostsController = PostsListController.extend({
    sort: {votes: -1, submitted: -1, _id: -1},
    nextPath: function() {
        return Router.routes.bestPosts.path({postsLimit: this.postsLimit() + this.increment})
    }
});
Router.route('/', {
    name: 'home',
    controller: NewPostsController
});

Router.route('/new/:postsLimit?', {name: 'newPosts'});
Router.route('/best/:postsLimit?', {name: 'bestPosts'});

//Router.route('/:postsLimit?', {name: 'postsList'});

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
