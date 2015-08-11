module.exports = {
  fire: function (eventName, eventData) {
    var customEvent = new CustomEvent(eventName, {
      detail: eventData
    });
    setTimeout(function() {
      window.dispatchEvent(customEvent);
    });
  },
  on: function (eventName, callback) {
    window.addEventListener(eventName, callback);
  },
  off: function (eventName, callback) {
    window.removeEventListener(eventName, callback);
  }
};
