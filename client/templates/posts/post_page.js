/**
 * Created by aqian on 11/9/17.
 */
Template.postPage.helpers({
    comments: function() {
        return Comments.find({postId: this._id});
    }
});

Template.postPage.onRendered(function(){
    console.log('---postpage, this = ', this.data);
});