var fs = require('fs');
var util = require('util');
var https = require('https');

function convertJsonToArray(json) {
	let array = [];
	for(var i in json)
	array.push([i, json [i]]);
	return array
}

function callTrigger(trigger, data, key){

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

function dateTime(){
	let date_ob = new Date();
	let date = ("0" + date_ob.getDate()).slice(-2);
	let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
	let year = date_ob.getFullYear();
	let hours = date_ob.getHours();
	let minutes = date_ob.getMinutes();
	let seconds = date_ob.getSeconds();

	return ("[ " + year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds + " ] ");
}

function log(d, log = "debug") {
	
	var log_file = fs.createWriteStream(__dirname + `/../log/${log}.log`,{flags: 'a'});
	var prepend = dateTime();
	log_file.write(util.format(prepend + d) + '\n');
};




module.exports = { 
	convertJsonToArray,
	callTrigger,
	log
}