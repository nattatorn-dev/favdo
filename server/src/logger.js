var winston = require('winston')

var logger = new winston.Logger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      name: 'info-file',
      filename: 'general-info.log',
      level: 'info',
    }),
    new winston.transports.File({
      name: 'debug-file',
      filename: 'general-debug.log',
      level: 'debug',
    }),
  ],
})

export default logger
