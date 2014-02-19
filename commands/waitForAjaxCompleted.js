var Protocol = require('nightwatch/lib/selenium/protocol.js'),
    util = require('util'),
    events = require('events');

function CommandAction() {
  events.EventEmitter.call(this);
};

util.inherits(CommandAction, events.EventEmitter);
CommandAction.prototype.command = function(timeout, callback) {
  var self = this;
  var start = new Date().getTime();
  var timeout = timeout || 10000;

  if (arguments.length === 1 && arguments[0] === 'function') {
      console.log(callback)
      callback = arguments[0];
  }

  (function checkIfComplete(){

      Protocol.actions.execute.call(self, 'return Mobify.evaluatedData', function(result){
        if (result.status === 0 && !!result.value){
          var now = new Date().getTime();
          var msg = 'AJAX call completed after ' +
            (now - start) + ' milliseconds.';

          // Returns the timing message
          self.client.assertion(true, result.value, 0, msg, true);

          if (callback) {
            callback.call(self.client, result.value);
          }

          self.emit('complete');

        } else if (now - start < timeout) {
            setTimeout(function(){
              checkIfComplete();
            }, 500)
          } else {
            var msg = "Timed out while waiting for page to be Mobified after "
              + timeout + " milliseconds.";
          }
      });
    })();

  return this;
}

module.exports = CommandAction;
