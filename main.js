const { default: ccxt } = require("ccxt")
const { MarketPrice } = require("./src/market")

// 开始监控价格波动
new MarketPrice().watchTicker("huobi", "NT/USDT", 3)

// new MarketPrice().watchTickers(
//     "binance",
//     {
//         "BTC/USDT": 0.5,
//         "ETH/USDT": 0.5
//     }
// )