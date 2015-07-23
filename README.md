TwitchBot
=========

This is just a basic Twitch chat bot I wrote for fun.

Installation
------------

Tested with [NodeJS 0.12.x](https://nodejs.org/), might work on earlier versions, but no promises.

Usage
-----

You need a Twitch account to be used use this bot script. You might want to make sure tht this account has proper
rights to post in chat and not hit rate limit (by responding too often in chat).

To obtain authentication token, you may use [Twitch Chat OAuth Password Generator](http://twitchapps.com/tmi/) that's
recommended by [Twitch for IRC access](http://help.twitch.tv/customer/portal/articles/1302780-twitch-irc)

Run by calling from command line:

	node index.js
	
TODO
-----

- need to add outgoing messages buffer
	- there seems to be at least 1000ms delay needed when responding to self
	- theres 20 messages per 30s threshold that bans from channel for 8h
	- for mods, the limit is 100 messages per 30s per connection
	