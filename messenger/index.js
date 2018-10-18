const cryptoJs = require('crypto-js');
const fs = require('fs');
const request = require('request');

let protcol = `https://`

module.exports.Client = class Client {
	constructor(hostname, apiKey, secretKey) {
		this.hostname = hostname;
		this.apiKey = apiKey;
		this.secretKey = secretKey;
	}

	sendMessage(toJid, message) {
		let requestUri = `/api/1.0/talks/${toJid}/messages`;
		let uri = `${protcol}${this.hostname}${requestUri}`;
		let body = {};
		body.body = message;
		let timestamp = new Date().toISOString();
		let forEncodeString = `${uri}\n${this.apiKey}\n${timestamp}\n${JSON.stringify(body)}`;
		let signature = createSignature(forEncodeString, this.secretKey);

		let settings = {
			async: true,
			crossDomain: true,
			url: uri,
			headers: {
				'content-type': `application/json`,
				'x-lakeel-api-key': this.apiKey,
				'x-lakeel-timestamp': timestamp,
				'x-lakeel-signature': signature
			},
			processData: false,
			body: JSON.stringify(body)
		};
		return new Promise(function (resolve, reject) {
			request.post(settings, function (error, res, body) {
				if (!error) {
					console.log(requestUri)
					console.log(res.body)
					resolve(JSON.parse(res.body));
				} else {
					reject(error);
				}
			});
		});
	}

	sendFileFromPath(toJid, filePath, fileName) {
		let requestUri = `/api/1.0/files/${toJid}`;
		let uri = `${protcol}${this.hostname}${requestUri}`;
		let binary = fs.readFileSync(filePath)
		let buffer = new Buffer(binary, 'binary').toString('base64')
		let wordArray = cryptoJs.enc.Base64.parse(buffer.toString())
		let file = cryptoJs.enc.Base64.stringify(wordArray)
		let body = {};
		body.file = file;
		body.name = fileName;
		let timestamp = new Date().toISOString()
		let forEncodeString = `${uri}\n${this.apiKey}\n${timestamp}\n${JSON.stringify(body)}`;
		let signature = createSignature(forEncodeString, this.secretKey)
		let settings = {
			async: true,
			crossDomain: true,
			url: uri,
			headers: {
				'content-type': `application/json`,
				'x-lakeel-api-key': this.apiKey,
				'x-lakeel-timestamp': timestamp,
				'x-lakeel-signature': signature
			},
			processData: false,
			body: JSON.stringify(body)
		}
		return new Promise(function (resolve, reject) {
			request.post(settings, function (error, res, body) {
				if (!error) {
					resolve(JSON.parse(res.body))
				} else {
					reject(error)
				}
			});
		});
	}

	sendFileFromBinary(toJid, binary, fileName) {
		let requestUri = `/api/1.0/files/${toJid}`;
		let uri = `${protcol}${this.hostname}${requestUri}`;
		let buffer = new Buffer(binary, 'binary').toString('base64')
		let wordArray = cryptoJs.enc.Base64.parse(buffer.toString())
		let file = cryptoJs.enc.Base64.stringify(wordArray)
		let body = {};
		body.file = file;
		body.name = fileName;
		let timestamp = new Date().toISOString()
		let forEncodeString = `${uri}\n${this.apiKey}\n${timestamp}\n${JSON.stringify(body)}`;
		let signature = createSignature(forEncodeString, this.secretKey)
		let settings = {
			async: true,
			crossDomain: true,
			url: uri,
			headers: {
				'content-type': `application/json`,
				'x-lakeel-api-key': this.apiKey,
				'x-lakeel-timestamp': timestamp,
				'x-lakeel-signature': signature
			},
			processData: false,
			body: JSON.stringify(body)
		};
		return new Promise(function (resolve, reject) {
			request.post(settings, function (error, res, body) {
				if (!error) {
					resolve(JSON.parse(res.body))
				} else {
					reject(error)
				}
			});
		});
	}

	receiveMessage(toJid, params) {
		let requestUri = `/api/1.0/talks/${toJid}/messages${params}`;
		let uri = `${protcol}${this.hostname}${requestUri}`;
		let timestamp = new Date().toISOString()
		let forEncodeString = `${uri}\n${this.apiKey}\n${timestamp}\n`;
		let signature = createSignature(forEncodeString, this.secretKey)
		let settings = {
			async: true,
			crossDomain: true,
			url: uri,
			headers: {
				'content-type': `application/json`,
				'x-lakeel-api-key': this.apiKey,
				'x-lakeel-timestamp': timestamp,
				'x-lakeel-signature': signature
			},
			processData: false
		};
		return new Promise(function (resolve, reject) {
			request.get(settings, function (error, res, body) {
				if (!error) {
					resolve(JSON.parse(res.body));
				} else {
					reject(error);
				}
			});
		});
	}

	getTalks(params) {
		let requestUri = `/api/1.0/talks${params}`;
		let uri = `${protcol}${this.hostname}${requestUri}`;
		let timestamp = new Date().toISOString()
		let forEncodeString = `${uri}\n${this.apiKey}\n${timestamp}\n`;
		let signature = createSignature(forEncodeString, this.secretKey)
		let settings = {
			async: true,
			crossDomain: true,
			url: uri,
			headers: {
				'content-type': `application/json`,
				'x-lakeel-api-key': this.apiKey,
				'x-lakeel-timestamp': timestamp,
				'x-lakeel-signature': signature
			},
			processData: false
		};
		return new Promise(function (resolve, reject) {
			request.get(settings, function (error, res, body) {
				if (!error) {
					resolve(JSON.parse(res.body));
				} else {
					reject(error);
				}
			});
		});
	}

	createRoom(ownerJid, users, roomName) {
		let requestUri = `/api/1.0/talks${params}`;
		let uri = `${protcol}${this.hostname}${requestUri}`;
		let body = {};
		body.name = roomName;
		let owner = {};
		owner.jid = ownerJid;
		body.owner = owner;
		body.users = users;
		let timestamp = new Date().toISOString();
		let forEncodeString = `${uri}\n${this.apiKey}\n${timestamp}\n${JSON.stringify(body)}`;
		let signature = createSignature(forEncodeString, this.secretKey);
		let settings = {
			async: true,
			crossDomain: true,
			url: uri,
			headers: {
				'content-type': `application/json`,
				'x-lakeel-api-key': this.apiKey,
				'x-lakeel-timestamp': timestamp,
				'x-lakeel-signature': signature
			},
			processData: false,
			body: JSON.stringify(body)
		};
		return new Promise(function (resolve, reject) {
			request.post(settings, function (error, res, body) {
				if (!error) {
					resolve(JSON.parse(res.body));
				} else {
					reject(error);
				}
			});
		});
	}

	getPresence(targetJid) {
		let requestUri = `/api/1.0/presences/${targetJid}`;
		let uri = `${protcol}${this.hostname}${requestUri}`;
		let timestamp = new Date().toISOString()
		let forEncodeString = `${uri}\n${this.apiKey}\n${timestamp}\n`
		let signature = createSignature(forEncodeString, this.secretKey);
		let settings = {
			async: true,
			crossDomain: true,
			url: uri,
			headers: {
				'content-type': `application/json`,
				'x-lakeel-api-key': this.apiKey,
				'x-lakeel-timestamp': timestamp,
				'x-lakeel-signature': signature
			},
			processData: false
		};
		return new Promise(function (resolve, reject) {
			request.get(settings, function (error, res, body) {
				if (!error) {
					resolve(JSON.parse(res.body));
				} else {
					reject(error);
				}
			});
		});
	}

	sendActionMessage(toJid, message, type, actions) {
		let requestUri = `/api/1.0/talks/${toJid}/messages/buttons`;
		let uri = `${protcol}${this.hostname}${requestUri}`;
		let body = {};
		body.body = message;
		body.type = type;
		body.actions = actions;
		let timestamp = new Date().toISOString();
		let forEncodeString = `${uri}\n${this.apiKey}\n${timestamp}\n${JSON.stringify(body)}`;
		let signature = createSignature(forEncodeString, this.secretKey);
		let settings = {
			async: true,
			crossDomain: true,
			url: uri,
			headers: {
				'content-type': `application/json`,
				'x-lakeel-api-key': this.apiKey,
				'x-lakeel-timestamp': timestamp,
				'x-lakeel-signature': signature
			},
			processData: false,
			body: JSON.stringify(body)
		};
		return new Promise(function (resolve, reject) {
			request.post(settings, function (error, res, body) {
				if (!error) {
					resolve(JSON.parse(res.body));
				} else {
					reject(error);
				}
			});
		});
	}

	sendCarouselMessage(toJid, message, panels) {
		let requestUri = `/api/1.0/talks/${toJid}/messages/carousel`;
		let uri = `${protcol}${this.hostname}${requestUri}`;
		let body = {};
		body.body = message;
		body.panels = panels;
		let timestamp = new Date().toISOString();
		let forEncodeString = `${uri}\n${this.apiKey}\n${timestamp}\n${JSON.stringify(body)}`;
		let signature = createSignature(forEncodeString, this.secretKey);
		let settings = {
			async: true,
			crossDomain: true,
			url: uri,
			headers: {
				'content-type': `application/json`,
				'x-lakeel-api-key': this.apiKey,
				'x-lakeel-timestamp': timestamp,
				'x-lakeel-signature': signature
			},
			processData: false,
			body: JSON.stringify(body)
		};
		return new Promise(function (resolve, reject) {
			request.post(settings, function (error, res, body) {
				if (!error) {
					resolve(JSON.parse(res.body));
				} else {
					reject(error);
				}
			});
		});
	}

	changeLock(targetJid, locked) {
		let requestUri = `/api/1.0/users/${targetJid}/lock`;
		let uri = `${protcol}${this.hostname}${requestUri}`;
		let body = {};
		body.locked = locked;
		let timestamp = new Date().toISOString();
		let forEncodeString = `${uri}\n${this.apiKey}\n${timestamp}\n${JSON.stringify(body)}`;
		let signature = createSignature(forEncodeString, this.secretKey);
		let settings = {
			async: true,
			crossDomain: true,
			url: uri,
			headers: {
				'content-type': `application/json`,
				'x-lakeel-api-key': this.apiKey,
				'x-lakeel-timestamp': timestamp,
				'x-lakeel-signature': signature
			},
			processData: false,
			body: JSON.stringify(body)
		};
		return new Promise(function (resolve, reject) {
			request.put(settings, function (error, res, body) {
				if (!error) {
					resolve(JSON.parse(res.body));
				} else {
					reject(error);
				}
			});
		});
	}

	changePassword(targetJid, password, forced) {
		let requestUri = `/api/1.0/users/${targetJid}/password`;
		let uri = `${protcol}${this.hostname}${requestUri}`;
		let body = {};
		body.password = password;
		body.forced = forced;
		let timestamp = new Date().toISOString();
		let forEncodeString = `${uri}\n${this.apiKey}\n${timestamp}\n${JSON.stringify(body)}`;
		let signature = createSignature(forEncodeString, this.secretKey);
		let settings = {
			async: true,
			crossDomain: true,
			url: uri,
			headers: {
				'content-type': `application/json`,
				'x-lakeel-api-key': this.apiKey,
				'x-lakeel-timestamp': timestamp,
				'x-lakeel-signature': signature
			},
			processData: false,
			body: JSON.stringify(body)
		};
		return new Promise(function (resolve, reject) {
			request.put(settings, function (error, res, body) {
				if (!error) {
					resolve(JSON.parse(res.body));
				} else {
					reject(error);
				}
			});
		});
	}

	resetPassword(targetJid) {
		let requestUri = `/api/1.0/users/${targetJid}/password/reset`;
		let uri = `${protcol}${this.hostname}${requestUri}`;
		let timestamp = new Date().toISOString();
		let forEncodeString = `${uri}\n${this.apiKey}\n${timestamp}\n`;
		let signature = createSignature(forEncodeString, this.secretKey);
		let settings = {
			async: true,
			crossDomain: true,
			url: uri,
			headers: {
				'content-type': `application/json`,
				'x-lakeel-api-key': this.apiKey,
				'x-lakeel-timestamp': timestamp,
				'x-lakeel-signature': signature
			},
			processData: false
		};
		return new Promise(function (resolve, reject) {
			request.put(settings, function (error, res, body) {
				if (!error) {
					resolve(JSON.parse(res.body));
				} else {
					reject(error);
				}
			});
		});
	}

	getUser(targetJid) {
		let requestUri = `/api/1.0/users/${targetJid}`;
		let uri = `${protcol}${this.hostname}${requestUri}`;
		let timestamp = new Date().toISOString();
		let forEncodeString = `${uri}\n${this.apiKey}\n${timestamp}\n`;
		let signature = createSignature(forEncodeString, this.secretKey);
		let settings = {
			async: true,
			crossDomain: true,
			url: uri,
			headers: {
				'content-type': `application/json`,
				'x-lakeel-api-key': this.apiKey,
				'x-lakeel-timestamp': timestamp,
				'x-lakeel-signature': signature
			},
			processData: false
		}
		return new Promise(function (resolve, reject) {
			request.get(settings, function (error, res, body) {
				if (!error) {
					resolve(JSON.parse(res.body));
				} else {
					reject(error);
				}
			});
		});
	}
}

function createSignature(forEncodeString, secretKey) {
	let hash = cryptoJs.HmacSHA256(forEncodeString, secretKey)
	let signature = cryptoJs.enc.Base64.stringify(hash)
	return signature
}