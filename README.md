# Goxtick

Simple node.js event emitter for the [MtGox websocket API](https://en.bitcoin.it/wiki/MtGox/API/Streaming).

Note: This implementation is based on socket.io-client. If you prefer a stream based API (which you should do) use [goxstream](https://github.com/ralphtheninja/goxstream) instead.

## Usage

Just require and call the function with a currency you want to track, e.g. `'USD'` for US Dollar 
and `'SEK'` for Swedish Krona.

```js
var ticker = require('goxtick')('USD')
```

Emits `'ticker'` for ticker data:
```js
ticker.on('ticker', function (data) {
  console.log('ticker data:', data)
})
```

The ticker data has the following format. All objects are similar to `'high'`. An important property is `'now'`, which
holds the unix time in microseconds and can be use as an identifier.

```js
{
    "high": {
        "value": "115.84000"
      , "value_int": "11584000"
      , "display": "$115.84000"
      , "display_short": "$115.84"
      , "currency": "USD"
    }
  , "low": {}
  , "avg": {}
  , "vwap": {}
  , "vol": {}
  , "last_local": {}
  , "last_orig": {}
  , "last_all": {}
  , "last": {}
  , "buy": {}
  , "sell": {}
  , "item": "BTC"
  , "now": "1368096380598414"
}
```

Emits `'depth'` for depth data:

```js
ticker.on('depth', function (data) {
  console.log('depth data:', data)
})
```

The depth data has the following format:

```js
{
    "price": "92"
  , "type": 2
  , "type_str": "bid"
  , "volume": "14.28693815"
  , "price_int": "9200000"
  , "volume_int": "1428693815"
  , "item": "BTC"
  , "currency": "USD"
  , "now": "1368097807984368"
  , "total_volume_int": "84559126689"
}
```

## License

MIT