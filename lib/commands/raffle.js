"use strict";

var users = []

setInterval(function() {
  console.log('USERS IN RAFFLE', users)
  users = []
}, 60 * 5 * 1000)

module.exports = {
  match: /raffle/,
  onMessage: function(params) {
    if (users.indexOf(params.from) === -1) {
      console.log('ADDED USER TO RAFFLE', params.from)
      users.push(params.from)
    }
  }
}
