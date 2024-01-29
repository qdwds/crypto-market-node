const axios = require("axios");
const { log } = require("../lib/logger")


/**
 * 市场价格推送接口
 * @param {*} data 
 */
const marketPriceApi = ({ symbol, status, floatPrice, amplitude, percentage, price }) => {
    try {
        axios({
            url: `https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=${process.env.WEIXIN_MARKETS_KEY}`,
            method: "POST",
            data: {
                "text": {
                    "content": `${symbol}: ${status}${amplitude}%(${floatPrice}$)，现价${price}$，24H涨跌${percentage}% . `,
                    // "mentioned_mobile_list":["@all"]
                },
                "msgtype": "text",
            }
        })
    } catch (error) {
        log.error(`${symbol}价格推送：${error}`)
    }
}

/**
 * 区块链上 钱包地址变动
 * @param {*} address 
 */
const AddressMonitoringApi = ({ symbol, name, type, amount }) => {
    try {
        axios({
            url: `https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=${process.env.WEIXIN_ADDRESS_KEY}`,
            method: "POST",
            data: {
                "text": {
                    "content":
                        symbol + "：监控地址变动通知!!!\n" +
                        "用户：" + name + "\n" +
                        "类型：" + type + "\n" +
                        "额度：" + amount + "个NT"
                    // "mentioned_mobile_list":["@all"]
                },
                "msgtype": "text",
            }
        })
    } catch (error) {
        log.error(`${symbol}地址推送：${error}`)
    }
}


module.exports = {
    marketPriceApi,
    AddressMonitoringApi,
}
