"use strict";

var TwitchBot = require('./lib/index.js')

var config = require('./config.json')
  , token = 'oauth:' + config.token
  //, channelName = '#shaboozey'
  //, channelName = 'disguisedtoasths'
  , channelName = 'margaretkrohn'
  //, channelName = 'dexteritybonus'
  //, channelName = 'gaarabestshaman'

var bot = new TwitchBot(channelName, config.username, token)

bot.connect(function() {
  console.log('We\'re listening')
})
