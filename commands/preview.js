exports.command = function(siteUrl, bundleUrl, callback) {
    var client = this;
    var bundleUrl = bundleUrl || 'http://localhost:8080';

    console.log('Previewing ' + siteUrl + ' using ' + bundleUrl);

    return client.url('http://preview.mobify.com')
        .waitForElementPresent('#id_url', 10000)
        .setValue('#id_url', siteUrl, function(){
            this.clearValue('#id_site_folder', function(){
                this.setValue('#id_site_folder', bundleUrl, function(){
                    this.click('#authorize', function(){
                        client.waitForPageToBeMobified(10000, function(result){
                            if (typeof callback === 'function') {
                                callback.call(client);
                            }
                        });
                    });
                });
            });
        });

};
