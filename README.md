# 加密货币行情监控
本项目是监控单个或多个token价格波动，发生波动后推送消息到[钉钉](https://open.dingtalk.com/document/robots/custom-robot-access)上。


## 监控单个行情波动
```javascript
new MarketPrice().watchTicker("huobi", "NT/USDT", 3)
```

## 监控多个行情波动
> 有的交易所不支持`watchTickers`函数调用。
```javascript
new MarketPrice().watchTickers(
    "binance",
    {
        "BTC/USDT": 0.5,
        "ETH/USDT": 0.5
    }
)
```

## 添加机器人推送
> 修改为企业微信推送，可以在设置通过微信接受企业微信推送消息。如何添加机器人和设置请自行搜索.如果常用钉钉可以按照下面修改。
+ 修改`.env.template`文件为`.env`。
+ 添加[钉钉群机器人](https://open.dingtalk.com/document/robots/custom-robot-access)，把自己的ID输入到`DINGDING_MARKET_BOT`后面。

## 监控链上地址变动
```js
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


const erc20 = new Erc20("rps或者wss节点");
erc20.transfer(nextype);
```

## 部署 
启动命令使用`nodejs`中的[pm2](https://www.npmjs.com/package/pm2)来管理服务。
```sh
pm2 start main.js --name markets
```
