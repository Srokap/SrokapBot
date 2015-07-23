"use strict";

module.exports = function(streamerName, login, token) {

  var irc = require('irc')

  var sendDelay = 1000
  var channelName = '#' + streamerName

  var client = new irc.Client('irc.twitch.tv', login, {
    channels: [channelName],
    userName: 'Srokap BOT',
    realName: 'Srokap BOT',
    port: 6667,
    password: token,
    //localAddress: null,
    debug: true,
    //showErrors: false,
    //autoRejoin: false,
    autoConnect: false,
    //channels: [],
    //secure: true,
    //selfSigned: false,
    //certExpired: false,
    //floodProtection: false,
    //floodProtectionDelay: 1000,
    //sasl: false,
    //stripColors: false,
    //channelPrefixes: "&#",
    //messageSplit: 512,
    //encoding: 'utf-8'
  })

  client.on('error', function(message) {
    console.log('error: ', message)
  })

//client.on('message', function (from, to, message) {
//  console.log(from + ' => ' + to + ': ' + message)
//})

//client.on('pm', function (from, message) {
//  console.log(from + ' => ME: ' + message)
//})

  var messageHandlers = require('./commands/')()
  console.log(messageHandlers)

  client.on('message' + channelName, function (from, message) {
    console.log(from + ' => ' + channelName + ': ' + message)

    // iterate commands and stop on first match

    if (from === 'twitchnotify') {
      //messages from Twitch
      if (message.match(/(.*) just subscribed!/)) {

        var matches = /(.*) just subscribed!/.exec(message)
        client.say(channelName, "We have new subscriber: " + matches[1] + " sbzyCommunity sbzyManleee sbzyCommunity sbzyManleee")
      }
    } else if(message[0] === '!') {

      var command = message.substr(1)

      var params = {
        streamerName: streamerName,
        channelName: channelName,
        login: login,
        token: token,
        from: from,
        command: command,
        message: message,
      }

      var matchCount = 0

      messageHandlers.forEach(function(handler) {
        if (handler.match instanceof RegExp) {
          if (handler.match.test(command)) {
            console.log('Matched', command)
            if (handler.onMessage instanceof Function) {
              matchCount++
              setTimeout(function() {
                handler.onMessage.call(client, params)
              }, sendDelay)
            } else {
              console.warn('Invalid handler callback', handler)
            }
          }
        } else {
          console.warn('Invalid handler regexp', handler)
        }
      })

      //if (matchCount === 0) {
      //  setTimeout(function() {
      //    client.say(channelName, "I'm just a dumb bot and don't understand your command.")
      //  }, sendDelay)
      //}

      //console.log('Command', message)
      //setTimeout(function(){
      //  client.say(channelName, "Im too dumb bot to get commands yet sbzyChimp")
      //}, 1000)
    }
    //twitchnotify => #shaboozey: TheBadgersCave just subscribed!
  })

  client.on('join' + channelName, function(nick, message) {
    if (nick === login) {
      console.log('WE JOINED')
      // we just joined the channel

      //setInterval(function() {
      //  console.log('SENT MESSAGE')
      //  client.say(channelName, "I'm a bot! sbzyChimp")
      //}, 30000)
    } else {
      console.log('USER JOINED', nick)
    }
  })

  client.on('quit', function (nick, reason, channels, message) {
    console.log('QUIT', nick, reason, channels, message)
  })

  return {
    connect: function(callback) {
      client.connect(function(){
        console.log('CONNECTED')
        setImmediate(callback)
      })
    },
    client: client
  }
}