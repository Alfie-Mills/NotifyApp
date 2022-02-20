const express = require('express')
const app = express()
require('dotenv').config()

const tools = require('./lib/helperFunctions')
const key = process.env.apikey
const port = 3000


app.get('/', (req, res) => {
	res.send('Hello World!');	
})

app.get('/notify', function(req, res) {
	res.send(req.query)
	tools.callTrigger( 'event', JSON.stringify(req.query), key )
});


app.listen(port, () => {
	console.log(`Notify API listening on port ${port}`)
})