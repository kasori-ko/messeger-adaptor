const sqlite = require('./db')
const db = sqlite.init('./db/bot.sqlite3')
const logger = require('../common/logger')

const TABLE_RAINY = 'Rainy'

// DBの初期化
module.exports.init = function () {
	let init = require('./init.js')
	init(db)
}

/**
 * ユーザ情報を登録します。
 * 新規登録専用。
 * @param {*} userJid 
 * @param {*} id 
 * @param {*} basic 
 */
module.exports.insertRainy = function (userJid, name) {
	logger.info('insertEntity', userJid, name)
	db.run(`INSERT INTO ${TABLE_RAINY} VALUES($userJid,$name,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)`, {
		$userJid: userJid,
		$name: name
	}, function (err) {
		if (err) {
			logger.error(err)
		}
	})
}

exports.getRainy = function (userJid) {
	return new Promise(function (resolve, reject) {
		db.get(`SELECT * FROM ${TABLE_RAINY} WHERE userJid = $userJid`,
			{
				$userJid: userJid
			},
			function (err, row) {
				if (err) {
					logger.error(err)
				}
				resolve(row)
			})
	})
}

exports.getRainyAll = function (callBack) {
	return new Promise(function (resolve, reject) {
		db.all(`SELECT * FROM ${TABLE_RAINY}`,
			function (err, rows) {
				if (err) {
					logger.error(err)
				}
				rows.forEach(function (row) {
					if (callBack) {
						callBack(row);
					}
				});
				resolve(rows)
			})
	})
}

exports.getRainyByHour = function (hourString, callBack) {
	return new Promise(function (resolve, reject) {
		db.all(`SELECT * FROM ${TABLE_RAINY} WHERE ${hourString} = 1`,
			function (err, rows) {
				if (err) {
					logger.error(err)
				}
				rows.forEach(function (row) {
					callBack(row);
				});
				resolve(rows)
			})
	})
}

exports.updateRainy = function (userJid, hourString) {
	return new Promise(function (resolve, reject) {
		db.get(`UPDATE ${TABLE_RAINY} SET ${hourString} = NOT ${hourString} WHERE userJid = $userJid`,
			{
				$userJid: userJid
			},
			function (err) {
				if (err) {
					logger.error(err)
				}
				resolve()
			})
	})
}

exports.deleteRainy = function (userJid) {
	db.run(`DELETE FROM ${TABLE_RAINY} WHERE userJid = $userJid`,
		{
			$userJid: userJid
		}
		, function (err) {
			if (err) {
				logger.error(err)
			}
		})
}