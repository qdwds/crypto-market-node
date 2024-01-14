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



module.exports = {
    lookMarketPriceApi
}
