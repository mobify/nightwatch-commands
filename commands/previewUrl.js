exports.command = function(siteUrl, bundleUrl, callback) {
    var client = this;
    var bundleUrl = bundleUrl || 'http://localhost:8080';

    console.log('Previewing ' + siteUrl + 'using ' + bundleUrl);

    return client.url('http://preview.mobify.com')
        .verify.elementPresent('#id_url')
            .setValue('#id_url', siteUrl, function(){
                this.clearValue('#id_site_folder', function(){
                    this.setValue('#id_site_folder', bundleUrl, function(){
                        this.click('#authorize', function(){
                            if (typeof callback === 'function') {
                                callback.call(client, result.value);
                            }
                        });
                    });
                })
            });

};
