var path = require('path');
var site = require(path.join(path.resolve('./'), '/tests/integration/site.json'));

exports.command = function(callback) {
  var client = this;
  var bundleUrl = site.bundleUrl || 'http://localhost:8080';

  return client.url('http://preview.mobify.com')
    .waitForElementPresent('#id_url', 10000)
    .setValue('#id_url', site.siteUrl, function() {
      this.clearValue('#id_site_folder', function() {
        this.setValue('#id_site_folder', bundleUrl, function() {
          this.click('#authorize', function() {
            client.waitForPageToBeMobified(10000, function(result) {
              if (typeof callback === 'function') {
                callback.call(client, result);
              }
            });
          });
        });
      });
    });
};
