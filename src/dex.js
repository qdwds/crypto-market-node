

const { Contract, WebSocketProvider, formatUnits, JsonRpcProvider } = require('ethers');
const { log } = require("../lib/logger")
const { blockChainDingApi } = require("../api/index")





/**
 * ERC20 链上监控
 */
class Erc20 {

    static provider = null;


    constructor(url) {
        if (url.includes("wss")) {
            this.provider = new WebSocketProvider(url);
        } else if (url.includes("http")) {
            this.provider = new JsonRpcProvider(url)
        } else {
            return console.error("URL ERROR.")
        }
    }


    /**
     * 监听链上转移事件
     * @param {*} token 
     */
    transfer(token) {
        log.info(`开始监控 ${token.symbol} Transfer 事件.`);
        const contract = new Contract(token.contract, ['event Transfer(address indexed from, address indexed to, uint256 value)'], this.provider);

        
        contract.on("Transfer", (from, to, amount, event) => {
            console.log(from, to,amount);
            for (const ls of token.list) {
                // 转入 转出 监控
                if (from == ls.address) {
                    blockChainDingApi({
                        symbol: token.symbol,
                        user: ls.user,
                        type: "转出",
                        amount: formatUnits(amount).replace(/(\.\d{2})\d*$/, '$1'),
                    })
                } else if (to == ls.address) {
                    blockChainDingApi({
                        symbol: token.symbol,
                        user: ls.user,
                        type: "转入",
                        amount: formatUnits(amount).replace(/(\.\d{2})\d*$/, '$1'),
                    })

                }
            }

        })
    }
}



module.exports = {
    Erc20
}
