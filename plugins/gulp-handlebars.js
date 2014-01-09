var es = require('event-stream');
var hbs = require('ember-template-compiler');

module.exports = function (options) {
    if (!options) {
        options = {};
    }

    function compile (file, cb) {
        var contents = file.contents;
        var compiled = hbs.precompile(String(contents)).toString();
        var name = file.path.split('templates/')[1].split('.hbs')[0]; // I'm lazy...
        file.contents = new Buffer('Ember.TEMPLATES["' + name + '"] = Ember.Handlebars.template(' + compiled + ');');

        cb(null, file);
    }

    return es.map(compile);
};
