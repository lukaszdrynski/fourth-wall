(function () {
  "use strict";
  window.FourthWall = window.FourthWall || {};

  FourthWall.Pulls = Backbone.Collection.extend({

    model: FourthWall.Pull,

    initialize: function (models, options) {
      this.baseUrl = options.baseUrl;
      this.userName = options.userName;
      this.repo = options.repo;
      this.important = options.important;
    },

    url: function () {
      var url;
      if (this.repo){
        url =  [
          this.baseUrl,
          this.repo,
          'merge_requests'
        ].join('/')+"?state=opened";
      } else {
        url = [
          this.baseUrl,
          this.userName,
          this.repo,
          'pulls'
        ].join('/');
      }

      return url;

    },

    fetch: function() {
      return FourthWall.overrideFetch.call(this, this.baseUrl);
    }
  });
}());
