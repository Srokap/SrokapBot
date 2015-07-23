"use strict";

module.exports = {
  match: /ping/,
  onMessage: function(params) {
    this.say(params.channelName, "Pong")
  }
}
