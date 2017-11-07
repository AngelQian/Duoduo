/**
 * Created by AngelQian on 11/5/17.
 */
Template.postSubmit.events({
    'submit form': function (e) {
        e.preventDefault();
        // to make sure the browser does not go ahead submit the form

        var post = {
            url: $(e.target).find('[name=url]').val(),
            title: $(e.target).find('[name=title]').val()
        };
        //post._id = Posts.insert(post);
        //Router.go('postPage', post);
        Meteor.call('postInsert', post, function(error, result) {
            // display the error to the user and abort
            if (error)
                return alert(error.reason);

            // show this result but route anyway
            if (result.postExists)
                alert('This link has already been posted');

            //Router.go('postPage', {_id: result._id});
        });
        Router.go('postsList');
    }
});