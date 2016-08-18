(function () {
  "use strict";
  window.FourthWall = window.FourthWall || {};

  FourthWall.MasterStatus = FourthWall.Status.extend({
    url: function () {
      var url;
      if (this.get('repo')) {
        url = [this.get('baseUrl'),
          this.get('repo'),
          'repository',
          'commits',
          'master'
        ].join('/');
      } else {
        url = [
          this.get('baseUrl'),
          this.get('userName'),
          this.get('repo'),
          'statuses',
          'master'
        ].join('/');
      }
    return url;
    }
  });
}());
