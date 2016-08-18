(function () {
  "use strict";
  window.FourthWall = window.FourthWall || {};

  FourthWall.Status = Backbone.Model.extend({

    initialize: function () {
      this.on('change:sha', function () {
        this.fetch();
      }, this);
    },

    url: function () {
      var url;
      if (this.get('repo')) {
        url = [
          this.get('baseUrl'),
          this.get('repo'),
          'repository',
          'commits',
          'master'
        ].join('/');
      } else
      url = [
        this.get('baseUrl'),
        this.get('userName'),
        this.get('repo'),
        'statuses',
        this.get('sha')
      ].join('/');

      return url;
    },

    fetch: function() {
      return FourthWall.overrideFetch.call(this, this.get('baseUrl'));
    },

    parse: function (response) {
      if (!response.length) {
        return;
      }
      var data = response[0];
      data.created_at = moment(data.created_at);
      data.failed = data.state !== 'success' && data.state !== 'pending';
      return data;
    }
  });
}());
