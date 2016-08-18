(function () {
  "use strict";
  window.FourthWall = window.FourthWall || {};

  FourthWall.Info = Backbone.Model.extend({

    initialize: function () {
      this.on('change:sha', function () {
        this.fetch();
      }, this);
    },

    url: function () {
      var url;
      if(this.get('repo')){
        url = [
          this.get('baseUrl'),
          this.get('repo'),
          'merge_requests'
        ].join('/');
      } else {
        return [
          this.get('baseUrl'),
          this.get('userName'),
          this.get('repo'),
          'pulls',
          this.get('pullId')
        ].join('/');
      }
      return url;
    },

    fetch: function() {
      return FourthWall.overrideFetch.call(this, this.get('baseUrl'));
    }
  });

}());
