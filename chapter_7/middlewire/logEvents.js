const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const path = require("path");
const fsPromise = require("fs").promises;

const logEvents = async (msg,logName) => {
    const dateTime = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    const logItem = `${dateTime}\t${uuid()}\t${msg}\n`;
    try {
        if (!fs.existsSync(path.join(__dirname,'..', 'logs'))) {
            await fsPromise.mkdir(path.join(__dirname,'..', 'logs'));
        }
        await fsPromise.appendFile(path.join(__dirname,'..', 'logs', logName), logItem)
    } catch (err) {
        console.error(err)
    }
}

const logger=async(req,res,next)=>{
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`,'reqFile.txt');
    next();
}

const errLogger=async(error,req,res,next)=>{
    logEvents(`${error.name}\t${error.message}`,'errLogFile.txt');
    res.status(500).send(error.message);
}
module.exports = {logEvents,logger,errLogger};
