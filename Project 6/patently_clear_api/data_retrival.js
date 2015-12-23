/** 
 * Data retrival from Patently Clear API
 */

var fs = require('fs');
var PatentlyClear = require('patentlyclear')
var jsonfile = require('jsonfile')


var results = []
var key = fs.readFileSync("apikey.txt").toString();
console.log(key);

pc = new PatentlyClear(key);

var query = {assignee : "National"};

function all_results() {
    debugger
    
    var hits
    hits = 0
    do {
        pc.search(query, function(err, data) {
          
          query.scroll_id = data.scroll_id;
          results = results.concat(data);
          
          jsonfile.writeFile("output.json", results, {spaces: 2}, function (err) {
          console.error(err)
          });
                  
          // Get number of objects from each query
          hits = data["total"]
          console.log(hits)
      });
    }
    while(hits > 0);
  };

/*
pc.search(query, function(err,data) {
  query.scroll_id = data.scroll_id;
  results = results.concat(data);
  debugger;
  console.log(data);
  });
*/


function single_result() {
   
  console.log("Single Query Working");
  
  pc.search(query, function(err,data) {
    query.scroll_id = data.scroll_id;
    debugger
    results = results.concat(data);
    })
  };



  
function test_counter() {
  var i = 0
  do {
      text = "The number is " + i;
      console.log(text);
      i++;
  }
  while (true);
};

all_results()