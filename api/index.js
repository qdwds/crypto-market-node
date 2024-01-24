const axios = require("axios");
const { log } = require("../lib/logger")
const { config } = require("dotenv");
config();


/**
 * 市场价格推送接口
 * @param {*} data 
 */
const lookMarketPriceApi = async ({ symbol, status, floatPrice, amplitude, percentage, price }) => {

    axios({
        url: `https://oapi.dingtalk.com/robot/send?access_token=${process.env.DINGDING_MARKET_BOT}&timestamp=${Date.now()}&secret=${process.env.CHE_DINGDING_BOT_SECRET}`,
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        data: {
            "text": {
                "content": `${symbol}: ${status}${amplitude}%(${floatPrice}$)，现价${price}$，24H涨跌${percentage}% . `
            },
            "msgtype": "text",
            "at": {
                "isAtAll": true
            }
        }
    })
        .then(res => {
            if (res.data.errcode) log.error(res.data.errmsg);
        })
        .catch(err => {
            log.error(err)
        })
}
/**
 * 区块链上 钱包地址变动 推送到钉钉
 * @param {*} address 
 */
const blockChainDingApi = async ({symbol, user, type, amount}) => {
    try {
       await axios({
            url: `https://oapi.dingtalk.com/robot/send?access_token=${process.env.BLOCKCHAIN_DING_TOKEN}`,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                "msgtype": "text",
                "text": {
                    "content": 
                        symbol + "：监控地址变动通知!!!\n" + 
                        "用户：" + user + "\n" + 
                        "类型：" + type + "\n" + 
                        "额度：" + amount + "\n" 
       
                      
                },
                "at":{
                    "isAtAll": true
                }
            }
        })
        
    } catch (error) {
        log.error(`钉钉接口错误：${error}`)
    }
}


module.exports = {
    lookMarketPriceApi,
    blockChainDingApi
}
