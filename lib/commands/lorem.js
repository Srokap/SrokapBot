"use strict";

module.exports = {
  match: /lorem/,
  onMessage: function(params) {
    console.log('CALLED LOREM', params)
  }
}
