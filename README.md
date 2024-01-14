# 加密货币行情监控
本项目是监控单个或多个token价格波动，发生波动后推送消息到[钉钉](https://open.dingtalk.com/document/robots/custom-robot-access)上。

# 监控单个行情波动
```javascript
new MarketPrice().watchTicker("huobi", "NT/USDT", 3)
```

# 监控多个行情波动
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

## 部署 
```
pm2 start main.js
```