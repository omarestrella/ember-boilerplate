var es = require('event-stream');
var es6 = require('es6-module-transpiler');

module.exports = function (options) {
    if (!options) {
        options = {};
    }

    function transpile (file, cb) {
        if (file.isNull()) {
            return;
        }

        var contents = file.contents;
        var name = file.path.split('js/')[1].split('.js')[0]; // Maybe not the best?

        var compiler = new es6.Compiler(String(contents), name, options);
        file.contents = new Buffer(compiler.toAMD());

        cb(null, file);
    }

    return es.map(transpile);
};
