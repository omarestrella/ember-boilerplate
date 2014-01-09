Ember.Router.map(function () {
    this.resource('index', { path: '/' }, function () {
        this.route('page', { path: 'page' });
    });
});
