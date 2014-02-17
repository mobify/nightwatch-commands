var util = require('util'),
    events = require('events');

function CommandAction() {
  events.EventEmitter.call(this);
  this.selectors = null;
}

util.inherits(CommandAction, events.EventEmitter);
CommandAction.prototype.command = function(selectors) {
    var self = this;

    this.selectors.forEach(function(selector) {
        self.element.call(self.client, 'css selector', selector, function(result) {
            if (result.status === 0) {
                console.log('success');
            } else {
                console.log('error');
            }
        });
    });
};

module.exports = CommandAction;
