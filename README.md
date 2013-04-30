# Goxtick

Simple node.js event emitter for the [MtGox websocket API](https://en.bitcoin.it/wiki/MtGox/API/Streaming)

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
    high: { value: '149.08000',
            value_int: '14908000',
            display: '$149.08000',
            display_short: '$149.08',
            currency: 'USD' },
    low: { /* */ },
    avg: { /* */ },
    vwap: { /* */ },
    vol: { /* */ },
    last_local: { /* */ },
    last_orig: { /* */ },
    last_all: { /* */ },
    last: { /* */ },
    buy: { /* */ },
    sell: { /* */ },
    item: 'BTC',
    now: '1367323067813653'
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
    price: '144.99',
    type: 1,
    type_str: 'ask',
    volume: '0',
    price_int: '14499000',
    volume_int: '0',
    item: 'BTC',
    currency: 'USD',
    now: '1367323067011457',
    total_volume_int: '1041040000'
}
```

## License

MIT
