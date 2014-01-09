var underscore = Ember.String.underscore;
var classify = Ember.String.classify;
var get = Ember.get;

function classFactory (klass) {
    return {
        create: function(injections) {
            if (typeof klass.extend === 'function') {
                return klass.extend(injections);
            } else {
                return klass;
            }
        }
    };
}

function normalizeName (name) {
    return Ember.String.underscore(name);
}

function resolve (details) {
    var module;

    var name = details.fullNameWithoutType;
    var moduleName = name + '/' + details.type;
    var normalizedName = normalizeName(moduleName);

    try {
        module = require(normalizedName, null, null, true);
    } catch (e) {
        return this._super(details);
    }

    if (module && module.default) {
        module = module.default;
    } else if (module === undefined) {
        throw new Error('Coule not locate "' + details.fullName + '"');
    } else {}

    return module;
}

var Resolver = Ember.DefaultResolver.extend({
    parseName: function (fullName) {
        var nameParts = fullName.split(':'),
            type = nameParts[0],
            fullNameWithoutType = nameParts[1],
            name = fullNameWithoutType,
            namespace = get(this, 'namespace'),
            root = namespace;

        return {
            fullName: fullName,
            type: type,
            fullNameWithoutType: fullNameWithoutType,
            name: name,
            root: root,
            resolveMethodName: 'resolve' + classify(type)
        };
    },

    resolveOther: resolve,
    resolveView: resolve,
    resolveController: resolve
});

export default Resolver;