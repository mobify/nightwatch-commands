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
  var timeout = 10000;

  if (arguments.length === 1 && arguments[0] === 'function') {
      console.log(callback)
      callback = arguments[0];
  }

  (function checkIfMobified(){
      var now = new Date().getTime();

      Protocol.actions.execute.call(self, 'return Mobify.evaluatedData', function(result){
        if (result.status === 0 && !!result.value){
          var timer = setTimeout(function() {
            var msg = 'Page was Mobified after ' +
              (now - start) + ' milliseconds.';

            // Returns the timing message
            self.assertion(true, !!result.value, false, msg, true);

            if (callback) {
              callback.call(self.client, result.value);
            }

            self.emit('complete');
          }, 2000);
        } else if (now - start < timeout) {
            setTimeout(function(){
              checkIfMobified();
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
