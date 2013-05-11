var EventEmitter = require('events').EventEmitter
var sockio       = require('socket.io-client')

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

module.exports.currencies = function () {
  return [
      'USD'
    , 'AUD'
    , 'CAD'
    , 'CHF'
    , 'CNY'
    , 'DKK'
    , 'EUR'
    , 'GBP'
    , 'HKD'
    , 'JPY'
    , 'NZD'
    , 'PLN'
    , 'RUB'
    , 'SEK'
    , 'SGD'
    , 'THB'
  ]
}

if (!module.parent && !process.browser) {
  var ticker = module.exports('USD')
  ticker.on('ticker', function (data) {
    console.log('ticker data:', data)
  })
  ticker.on('depth', function (data) {
    console.log('depth data:', data)
  })
}
