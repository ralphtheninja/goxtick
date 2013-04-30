#!/usr/bin/env node

var EventEmitter = require('events').EventEmitter
var sockio       = require('socket.io-client')

module.exports = function (currency) {
  // TODO: not set or invalid -> default as 'USD'
  if (!currency) currency = 'USD'

  var emitter = new EventEmitter()
  var sock = sockio.connect('https://socketio.mtgox.com/mtgox')

  sock.on('connect', function () {
    console.log('connected to mtgox')
    sock.on('message', function (data) {
      if ('private' === data.op) {
        var type = data['private']
        emitter.emit(type, data[type])
      }
    })
  })

  return emitter
}


if (!module.parent) {
  var ticker = module.exports()
  ticker.on('ticker', function (data) {
    console.log('ticker data:', data)
  })
  ticker.on('depth', function (data) {
    console.log('depth data:', data)
  })
}
