// Write your package code here!

// Variables exported by this module can be imported by other packages and
// applications. See errors-tests.js for an example of importing.


//export const name = 'errors';


Errors = {
// Local (client-only) collection
    collection: new Mongo.Collection(null),
    throw: function(message) {
        Errors.collection.insert({message: message, seen: false})
    }
};