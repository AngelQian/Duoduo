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
        post._id = Posts.insert(post);
        Router.go('postPage', post);
    }
});