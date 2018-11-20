"use strict"
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const config = require('config')
const logger = require('./common/logger')
const app = express()

app.use(morgan(config.morgan.format, { "stream": logger.stream }))
app.use(bodyParser.text({ limit: '50mb', type: 'application/json' }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS')
	res.header('Access-Control-Max-Age', '86400')
	next()
})
app.options('*', function (req, res) {
	res.sendStatus(200)
})

// Utilsロード
require('./utils/stringUtils')


app.use('/messenger', require('./brains/adaptor'))

module.exports = app