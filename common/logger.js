const winston = require('winston');
const winstonDayliRotateFile = require('winston-daily-rotate-file');
const config = require('config');
const schedule = require('node-schedule');
const fs = require('fs');

var transports = [];

// Use Console and File in development
if (process.env.NODE_ENV == 'development') {
	transports.push(new (winston.transports.Console)({
		level: config.logger.console.level,
		handleExceptions: config.logger.console.handleExceptions,
		colorize: true
	}));
	transports.push(new (winston.transports.DailyRotateFile)({
		level: config.logger.file.level,
		filename: config.logger.file.filename,
		datePattern: config.logger.file.datepattern,
		handleExceptions: config.logger.file.handleExceptions,
		timestamp: function () { return formatDate(new Date()) },
		json: false
	}));
}

// Use File only in production
if (process.env.NODE_ENV == 'production') {
	transports.push(new (winston.transports.DailyRotateFile)({
		level: config.logger.file.level,
		filename: config.logger.file.filename,
		datePattern: config.logger.file.datepattern,
		handleExceptions: config.logger.file.handleExceptions,
		timestamp: function () { return formatDate(new Date()) },
		json: false
	}));
}

var logger = new (winston.Logger)({
	transports: transports,
	exitOnError: config.logger.exitOnError
});

var stream = {
	write: function (message, encoding) {
		logger.info(message);
	}
};

module.exports = logger;
module.exports.stream = stream;

function formatDate(date, format) {
	if (!format) format = 'YYYY-MM-DD hh:mm:ss.SSS';
	format = format.replace(/YYYY/g, date.getFullYear());
	format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
	format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
	format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2));
	format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
	format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
	if (format.match(/S/g)) {
		var milliSeconds = ('00' + date.getMilliseconds()).slice(-3);
		var length = format.match(/S/g).length;
		for (var i = 0; i < length; i++) format = format.replace(/S/, milliSeconds.substring(i, i + 1));
	}
	return format;
}

// 起動した時間から、1日おきにログファイルを一定数になるまで削除する。
schedule.scheduleJob('0 0 0 * * *', function () {
	deleteLogFile(config.maxNumberOfLogFile)
});

/**
 *  deleteLogFile 
 *    ログファイルの数がmaxNumberOfLogFile以上ある場合、ログファイルを削除します。
 *    ログファイルの数がmaxNumberOfLogFileになるまで、日付の古いログファイルから削除します。
 *    
 *  @param {integer} maxNumberOfLogFile (保持するファイル数)
 *  @return {void}
 */
function deleteLogFile(maxNumberOfLogFile) {
	let mode = (function () {
		switch (process.env.NODE_ENV) {
			case 'production': return 'prod';
			case 'development': return 'dev';
		}
	}());

	let deleteFilesNames = fs.readdirSync('./logs/' + mode);
	if (deleteFilesNames.length <= maxNumberOfLogFile) {
		return;
	}
	deleteFilesNames.sort(function (a, b) {
		if (a > b) return -1;
		if (a < b) return 1;
		return 0;
	});

	for (let i = maxNumberOfLogFile; i < deleteFilesNames.length; i++) {
		let deleteFilePath = `./logs/${mode}/${deleteFilesNames[i]}`
		fs.unlink(deleteFilePath, function (err) {
			if (err) {
				logger.warn(err);
			} else {
				logger.info(`Log file deleted ${deleteFilePath}`);
			}
		})
	}
}