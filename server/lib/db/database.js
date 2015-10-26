/**
 * Module Dependency
 */

var db = process.env.MONGOLAB_URI || 'mongodb://localhost/dbc';
var monk = require('monk');

/**
 * Expose db
 */

module.exports = monk(db);