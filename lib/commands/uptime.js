"use strict";

module.exports = {
  match: /uptime/,
  onMessage: function(params) {
    var self = this
    //request to twitch api
    var request = require('request')
      , moment = require('moment')

    var url = 'https://api.twitch.tv/kraken/streams/' + params.streamerName + '/?oauth_token=' + params.token
    console.log(url)
    request(url, function(err, response, body) {
      if (err) {
        console.warn('ERROR API REQUEST', err)
        return
      }
      if (response.statusCode === 200) {
        try {
          var content = JSON.parse(body)
          //console.log(content)
          if (content.stream === null) {
            self.say(params.channelName, 'Channel is offline')
          } else {
            var createdAt = moment(content.stream.created_at)
              , duration = moment.duration(moment().diff(createdAt))
              , seconds = Math.floor(duration.asSeconds())

            var hours = Math.floor(seconds / 3600)
              , minutes = Math.floor((seconds % 3600) / 60)
            seconds = seconds % 60

            self.say(params.channelName, 'Channel is online since ' + hours + 'h ' + minutes + 'm ' + seconds + 's')
          }
        } catch(err) {
          console.warn('Parse error:', err)
        }
      }
    })
  }
}
