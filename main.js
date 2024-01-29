const { MarketPrice } = require("./src/market")
const { Erc20 } = require("./src/dex");
const { config } = require("dotenv").config()
const nextype = {
    symbol: "NT",
    contract: "0xfbcf80ed90856AF0d6d9655F746331763EfDb22c",
    list: [
        {
            name: "NEXTYPE基金会",
            address: "0xBF957e1c121FA769580D29bF320Ee8BfF138Ad12"
        },
        {
            name: "NEXTYPE总矿池",
            address: "0x602a3ccF9E0800bfB9A27aaC8c3c8ce8E5758e0d"
        }
    ]
}


/**
* 监控链上地址变化
*/
const erc20 = new Erc20("https://bsc-dataseed.binance.org");
erc20.transfer(nextype);


// 开始监控价格波动
new MarketPrice().watchTicker("huobi", "NT/USDT", 3)

// new MarketPrice().watchTickers(
//     "binance",
//     {
//         "BTC/USDT": 0.5,
//         "ETH/USDT": 0.5
//     }
// )


