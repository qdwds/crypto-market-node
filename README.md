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

## 添加钉钉群机器人
+ 修改`.env.template`文件为`.env`。
+ 添加[钉钉群机器人](https://open.dingtalk.com/document/robots/custom-robot-access)，把自己的ID输入到`DINGDING_MARKET_BOT`后面。
## 部署 
启动命令使用`nodejs`中的[pm2](https://www.npmjs.com/package/pm2)来管理服务。
```sh
pm2 start main.js --name markets
```