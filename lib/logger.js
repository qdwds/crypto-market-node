const { createLogger, format, transports } = require("winston");
const moment = require('moment-timezone');
const DailyRotateFile = require('winston-daily-rotate-file');



const combine = (
    format.simple(),
    format.printf(({ level, message, timestamp }) =>  `${timestamp}: ${level}: ${message}`)
)


const log = createLogger({
    format: format.combine(
        format.timestamp({ format: () => moment().tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss') }),
        combine
    ),
    level: 'debug', // 设置最低输出级别为info
    transports: [
        new transports.Console({ 
            format: format.combine(
                format.colorize(), 
                combine
            ),
        }), 
 
        new DailyRotateFile({
            filename: `logs/%DATE%-run.log`,
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '10m', // 每个日志文件的最大大小
            maxFiles: '10', // 保留10个日志文件
            rotationFormat: true, // 启用自定义递增格式
            level: 'info', // 只记录 info 及以上级别的日志
          })
    ],
});



module.exports.log = log 