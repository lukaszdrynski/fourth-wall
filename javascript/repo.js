(function () {
  "use strict";
  window.FourthWall = window.FourthWall || {};

  FourthWall.Repo = Backbone.Model.extend({
    defaults: {
      'baseUrl': 'https://api.github.com/repos',
      'glBaseUrl': 'http://10.196.60.5/api/v3/projects'
    },

    initialize: function () {
      var url = this.get('repo') ? this.get('glBaseUrl') : this.get('baseUrl');
      this.master = new FourthWall.MasterStatus({
        baseUrl: url,
        repo: this.get('repo')
      });

      this.master.on('change:failed', function () {
        this.trigger('change');
      }, this);

      this.pulls = new FourthWall.Pulls([], {
        baseUrl: this.get('baseUrl'),
        userName: this.get('userName'),
        repo: this.get('repo'),
        important: this.get('important')
      });

      this.merge_requests = new FourthWall.Pulls([], { //FIXME: dynamic var?
        baseUrl: this.get('glBaseUrl'),
        repo: this.get('repo'),
        important: this.get('important')
      });

      this.merge_requests.on('reset add remove', function () {
        this.trigger('change');
      }, this);
    },

    fetch: function () {
      if (this.get('repo')){
        this.merge_requests.fetch();
      } else {
        this.pulls.fetch();
      }
      this.master.fetch();
    }
  });
}());
