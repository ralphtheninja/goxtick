#!/usr/bin/env node

var EventEmitter = require('events').EventEmitter
var sockio       = require('socket.io-client')

module.exports.currencies = function () {
  return {
      USD: 'USD'
    , AUD: 'AUD'
    , CAD: 'CAD'
    , CHF: 'CHF'
    , CNY: 'CNY'
    , DKK: 'DKK'
    , EUR: 'EUR'
    , GBP: 'GBP'
    , HKD: 'HKD'
    , JPY: 'JPY'
    , NZD: 'NZD'
    , PLN: 'PLN'
    , RUB: 'RUB'
    , SEK: 'SEK'
    , SGD: 'SGD'
    , THB: 'THB'
  }
}

module.exports = function (currency) {
  if (!currency || 'string' !== typeof currency)
    currency = 'USD'

  var emitter = new EventEmitter()
  var baseUrl = 'https://socketio.mtgox.com/mtgox'
  var sock = sockio.connect(baseUrl + '?Currency=' + currency)

  sock.on('connect', function () {
    sock.on('message', function (data) {
      if ('private' === data.op) {
        var type = data['private']
        emitter.emit(type, data[type])
      }
    })
  })

  emitter._socketio = sock

  return emitter
}


if (!module.parent) {
  var ticker = module.exports('USD')
  ticker.on('ticker', function (data) {
    console.log('ticker data:', data)
  })
  ticker.on('depth', function (data) {
    console.log('depth data:', data)
  })
}
