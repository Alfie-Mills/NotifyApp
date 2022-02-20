function convertJsonToArray(json) {
	let array = [];
	for(var i in json)
	array.push([i, json [i]]);
	return array
}

function callTrigger(trigger, data, key){

	var https = require('https');

	var options = {
		host: 'maker.ifttt.com',
		path: `/trigger/${trigger}/json/with/key/${key}`,
		port: '443',
		method: 'POST',
		headers: {"Content-Type": "application/json; charset=utf-8"	}
	};

	var req = https.request(options);

	//This is the data we are posting, it needs to be a string or a buffer
	req.write(data);
	req.end();
}


module.exports = { 
	convertJsonToArray,
	callTrigger
}