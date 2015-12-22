/** 
 * Data retrival from Patently Clear API
 */

var fs = require('fs');
var PatentlyClear = require('patentlyclear')

var p

var key = fs.readFileSync("apikey.txt").toString();
console.log(key);

pc = new PatentlyClear(key);

pc.getById('US20140000001', function(err,data) {
	debugger;
	p = data;
	console.log(p)
	console.log("Finished")
	});
