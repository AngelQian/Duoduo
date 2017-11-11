/**
 * Created by aqian on 11/11/17.
 */
Template.registerHelper('pluralize', function(n, thing) {
// fairly stupid pluralizer
    if (n === 1) {
        return '1 ' + thing;
    } else {
        return n + ' ' + thing + 's';
    }
});