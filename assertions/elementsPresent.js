/**
 * Checks if the given selectors are present and returns a list of missing selectors.
 *
 * ```
 *    this.demoTest = function (client) {
 *        browser.assert.elementsPresent('#x-root', '#x-head');
 *    };
 * ```
 *
 * @method attributeEquals
 * @param {string} selectors The selectors (CSS / Xpath) used to locate the elements, separated by commas.
 * @param {string} [message] Optional log message to display in the output. If missing, one is displayed by default.
 * @api assertions
 */

var util = require('util'),
    async = require('async');
exports.assertion = function(selectors, msg) {

    var self = this;
    var missing = [];
    var found = [];

    this.message = msg || util.format('Testing if the elements are present <%s>.', selectors);

    this.expected = function() {
        return selectors.split(',').length + ' elements';
    };

    this.pass = function(value) {
        return value === selectors.split(',').length;
    };

    this.value = function(result) {
        return parseInt(result);
    };

    this.command = function(callback) {

        async.each(selectors.split(','), checkElement, showResults);

        function showResults(err){
            if (missing.length){
                self.message = util.format('%s missing from page', missing.map(function(el){
                    return '<' + el + '>';
                }));
            }
            console.log('done', +new Date());
            return callback.call(self, found.length);
        }

        function checkElement(selector, cb) {
            selector = selector.trim();

            self.api.element.call(self, self.client.locateStrategy, selector, function(result) {
                var value;

                if (result.status === 0) {
                    value = result.value.ELEMENT;
                }

                if (value) {
                    found.push(selector);
                } else {
                    missing.push(selector);
                }
                console.log(selector, +new Date());
                cb();
            });
        }
    };

};
