"use strict"
const express = require('express')
const co = require('co')
const router = express.Router()

const messenger = require('../messenger')
const logger = require('../common/logger')
const fs = require('fs');

let apiKey;
let secretKey;
let hostname;
let developer;
let domain;

// if (process.env.NODE_ENV == 'development') {
// 	// 開発環境用の値を定義
// 	apiKey = `2b5fb073f6d0d16632c9ae1ebb15ee7ac5148ed8065be9a5d2c806c3f85ec690`
// 	secretKey = `796dc95e61755e4fee210a00c79134680fafd2b78a737642841d10d125fd2bd4`
// 	hostname = `172.16.13.30:9080`
// 	developer = `a@kasori-ko.lakeel.com`
// 	domain = `@kasori-ko.lakeel.com`
// } else if (process.env.NODE_ENV == 'production') {
// 本番環境用の値を定義
apiKey = `bcf4291764dd4ca5075ff64613d34c2ece97a4ed9b71970259282f08694cc632`
secretKey = `e6ddba4bd17bc5f9c4bd3e8b3e61f48246d23e9550c26f087abb5af46a1a1b02`
hostname = `lmlai.lakeel.com`
developer = `kasori-ko@xmpp.legendapl.com`
domain = `@xmpp.legendapl.com`

// 本番環境用の値を定義
// apiKey = `00f305a955468f41d74cfdb68d2776a353e5d88ab26f90fcae76914fbd6f6bac`
// secretKey = `58acea07d13e15767e25e848ccba945deb994490ebaf9a2b514a81e280476603`
// hostname = `lmlai.lakeel.com`
// developer = `kasori-ko@xmpp.legendapl.com`
// domain = `@xmpp.legendapl.com`
// }

router.post('/send', function (req, res) {
	let messageJson;
	try {
		messageJson = JSON.parse(req.body)
	} catch (e) {
		res.status = 400
		res.json({ error: 'JSON parse error. Check request body.' })
	}
	co(function* () {
		let bot = new messenger.Client(hostname, apiKey, secretKey)
		console.log(yield bot.sendMessage(developer, `
		「${messageJson.message}」
		`.dedent()))
		res.status = 200
		res.json({ message: 'OK' })

	}).catch(err => logger.error("UserSearch : " + err))
})

router.get('/talks', function (req, res) {

	co(function* () {

		let kasori = new messenger.Client(hostname, `1737b3658fb89cf9a2ac029e034176aa30ca84465084f0442ad9955f00fa43d4`, `9ed64bfc535e424d354b00ba5c54556035a7884402d3c1a8861a77c119c0f660`)
		let talks = yield kasori.getTalks(`?force=true`)
		res.status = 200
		res.json(talks)
		// sqliteService.insertHistory(messageJson.replyToJid, messageJson.userName, messageJson.data)
	}).catch(err => logger.error("UserSearch : " + err))

})

router.get('/messages/:to', function (req, res) {

	co(function* () {

		let to = req.params.to

		let kasori = new messenger.Client(hostname, `1737b3658fb89cf9a2ac029e034176aa30ca84465084f0442ad9955f00fa43d4`, `9ed64bfc535e424d354b00ba5c54556035a7884402d3c1a8861a77c119c0f660`)
		let messages = yield kasori.receiveMessage(to, `?force=true`)
		res.status = 200
		res.json(messages)
		// sqliteService.insertHistory(messageJson.replyToJid, messageJson.userName, messageJson.data)
	}).catch(err => logger.error("UserSearch : " + err))

})
module.exports = router


router.get('/', function (req, res) {
	res.status = 200
	res.json({ message: `ok` })
})