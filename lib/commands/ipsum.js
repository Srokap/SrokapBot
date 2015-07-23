"use strict";

module.exports = {
  match: /ipsum/,
  onMessage: function(params) {
    console.log('CALLED IPSUM', params)
  }
}
