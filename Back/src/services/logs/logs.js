const winston = require("winston");

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.prettyPrint()
    ),
    transports: [
        new winston.transports.File({ filename: "combined.log" }),
    ],
});

/**
 * Function to add a log to the log file
 * @param {string} level - Level of the log (error, warn, info, verbose, debug, silly)
 * @param {string} message - Message of the log (ex: "User created")
 * @param {string} source - Source of the log (ex: users.js)    
 */
function addLog(level, message, source){ 
    const query = ({
        level: level, // error, warn, info, verbose, debug, silly (Source : https://www.npmjs.com/package/winston) 
        message: message, // message de log (ex: "Utilisateur créé")
        source: source // source du log (ex: users.js)
    });
    logger.log(query);
}

module.exports = {
    addLog
}