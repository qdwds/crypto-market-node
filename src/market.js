const { pro } = require("ccxt");
const { marketPriceApi } = require("../api/index");
const { log } = require("../lib/logger")

class MarketPrice {

    oldSymbols = {};
    oldSymbol = {};

    constructor() { }

    /**
     * 监控多个价格波动
     * @param {*} tokens {"BTC/USDT": 1"} 
     */
    async watchTickers(cex, tokens) {

        const exchange = new pro[cex]()

        log.info(`${cex}交易所【${Object.keys(tokens)}】开始监控价格波动!`);
        while (true) {
            try {
                // 可 监控多个token行情波动
                const newSymbols = await exchange.watchTickers(Object.keys(tokens));

                if (Object.keys(this.oldSymbols).length > 0) {
                    for (const symbol in this.oldSymbols) {

                        // 这笔交易的波动率
                        let amplitude = (1 - this.oldSymbols[symbol].last / newSymbols[symbol].last) * 100;

                        if (amplitude >= tokens[symbol] || amplitude <= -tokens[symbol]) {

                            // 24小时波动
                            const percentage = newSymbols[symbol].percentage.toFixed(2);

                            // 波动价格
                            const floatPrice = amplitude * this.oldSymbols[symbol].last

                            const data = {
                                symbol: symbol,  //  代币符号
                                status: newSymbols[symbol].last > this.oldSymbols[symbol].last ? "上涨" : "下跌",
                                amplitude: amplitude.toFixed(2),    //  瞬时波动率（单笔交易）
                                floatPrice: floatPrice.toFixed(2),  //  波动价格
                                percentage, //  24小时涨幅
                                price: newSymbols[symbol].last    //  // 现在价格
                            }

                            marketPriceApi(data);
                            log.info(`${symbol} 行情推送！`)
                        }
                    }

                }
                this.oldSymbol = newSymbols;
            } catch (error) {
                log.error(`${this.cex} ${error}`)
            }
        }
    }

    /**
     * 监控单个Token
     * @param {*} symbol 监控代币符号
     * @param {*} ratio 波动率(百分比)
     */
    async watchTicker(cex, symbol, ratio) {
        const exchange = new pro[cex]()

        log.info(`${cex}交易所【${symbol}】开始监控价格波动!`);

        while (true) {
            try {
                // 可 监控多个token行情波动
                const newSymbol = await exchange.watchTicker(symbol);

                if (Object.keys(this.oldSymbol).length > 0) {

                    // 这笔交易的波动率
                    let amplitude = (1 - this.oldSymbol.last / newSymbol.last) * 100;

                    if (amplitude >= ratio || amplitude <= -ratio) {

                        // 24小时波动
                        const percentage = newSymbol.percentage.toFixed(2);

                        // 波动价格
                        const floatPrice = amplitude * this.oldSymbol.last

                        const data = {
                            symbol: symbol,  //  代币符号
                            status: newSymbol.last > this.oldSymbol.last ? "上涨" : "下跌",
                            amplitude: amplitude.toFixed(2),    //  瞬时波动率（单笔交易）
                            floatPrice: floatPrice.toFixed(2),  //  波动价格
                            percentage, //  24小时涨幅
                            price: newSymbol.last    //  // 现在价格
                        }

                        marketPriceApi(data)
                        log.info(`${symbol} 行情推送！`)
                    }

                }
                this.oldSymbol = newSymbol;
            } catch (error) {
                log.error(`${cex} ${symbol} ${error}`)
            }
        }

    }
}
module.exports = {
    MarketPrice
}