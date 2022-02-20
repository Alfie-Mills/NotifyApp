const express = require('express')
const app = express()
require('dotenv').config()
const tools = require('./lib/helperFunctions')
const key = process.env.apikey
const port = 3000

app.set('trust proxy', true)

app.get('/', (req, res) => {
	res.send('Unauthorized Request');	
})

app.get('/notify', function(req, res) {
	res.send('Done.')
	
	tools.log(JSON.stringify({
		"ip": req.ip,
		"headers": req.headers,
		"query": req.query,
	}), 'access')

	tools.callTrigger( 'event', JSON.stringify(req.query), key )

});

app.listen(port, () => {
	tools.log(`Notify API listening on port ${port}`)
})