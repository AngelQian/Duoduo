Meteor.startup(function () {
// put suto run in Meteor.startup to ensure it only runs once Meteor has finished loading the Posts collection
    Tracker.autorun(function () {
        // var count = Posts.find().count();
        console.log('There are  Posts.');
    });
});