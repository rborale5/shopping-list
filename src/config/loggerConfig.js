var fs = require('fs');
const VALID_LEVELS = ['fatal', 'error', 'warn', 'info', 'debug'];
const LOGLEVEL_FILEPATH = '/loglevel';
const {
    createLogger,
    format,
    transports
} = require('winston');
const {
    combine,
    timestamp,
    label,
    printf
} = format;

var loglevel = getLogLevel();

const _transports = {
    console: new transports.Console({
        level: loglevel,
        handleExceptions: true,
         prettyPrint: true,
        maxsize: 5242880,
        maxFiles: 5, 
        //filename: process.env.LOG_DIR + '/licensing-api/combined.log'
    })
}

const logFormat = format.printf(({
    level,
    message,
    label,
    timestamp
}) => {
    if (message && message.constructor === Object) {
        message = JSON.stringify(message, null, 4);
    }
    /**
     * [PID] [Log Level] : [message]
     */
    return `${timestamp} - [${process.pid}] [${level}] : ${message}`;
});

var logger = createLogger({
    format: combine(
        format.errors({
            stack: true
        }),
        format.prettyPrint(),
        format.splat(),
        format.simple(),
        timestamp(),
        logFormat
    ),
    transports: [
        _transports.console
    ],
});




function getLogLevel() {
    try {
        console.log('Reading log-level from file at path : ' + LOGLEVEL_FILEPATH)
        var level = fs.readFileSync(LOGLEVEL_FILEPATH, 'utf8').trim();
        if (VALID_LEVELS.indexOf(level) == -1) {
            console.warn('Invalid log level in file. Setting default level -> error')
            return 'error'
        } else {
            return level
        }
    } catch (error) {
        console.warn('File not found at ' + LOGLEVEL_FILEPATH + '. Setting default level -> error')
        return 'error'
    }
}

//check for LOGLEVEL dynamic change by watching on the file
fs.watchFile(LOGLEVEL_FILEPATH, function(curr, prev) {
    console.log('Detected log level change...');
    var newLevel = getLogLevel();
    _transports.console.level = newLevel

})

module.exports = logger;