/*
Slopegraph Visualization modified for general use. Refer to internal git repo
for production version
*/

//Set SVG parameters for visualization
var json_file
var slopegraph_svg

var marginforDescriptionDiv = 40
var margin = {"left":60, "right":90, "top":40, "bottom": 40};
var header_height = 200
var height = window.innerHeight - margin.top - margin.bottom - header_height;
var width = 1900 - margin.left - margin.right;

//Array for all years standards are available
var years = [2013,2014,2015];

//Set Scales for visualization
var x_scale = d3.scale.linear()
                .domain([2013, 2015])
                .rangeRound([0,width]);

//YAxis hoisted for updates
var yAxis
var y_scale = d3.scale.linear()
                .rangeRound([height, 0]);
                

//Helper Functions

//Gets the part number of a string
function part_num_string(svg_element) {return d3.select(svg_element).datum()["key"].substring(0,12);}

function line_selector(part_num) {
  //Takes line element and returns selection of all other lines with same part number
  
  var part_num_lines = d3.selectAll(".unit_line")
                      .filter(function(d, i) {return d["key"].substring(0,12) === part_num})
  
  return part_num_lines
};


function units_mouseover_generator(part_num, part_num_lines) {
  //Takes part num and line selection and creates labels for total units
  var base_unit = json_file["part_attr"][part_num]["base_unit"]
  var units_array = []
  
  part_num_lines.data().forEach(function(d) {
    units_array.push({"year": d["x1"], "unit": base_unit + d["y1"]}, {"year": d["x2"], "unit": base_unit + d["y2"]})
  });
  
  if (part_num === "10393264-032") {
    //debugger
  }
  
  return units_array
};

function all_y(lines_array) {
  //Returns an array of all y values from input JSON
  y_values = []
  
  lines_array.forEach(function(d) {
    y_values.push(d["y1"], d["y2"])
  });
  
  return y_values
}

//Drawing Functions    
function draw_canvas(){
  
    //Adds svg and draws year lines
    slopegraph_svg = d3.select("#Slopegraph")
                        .append("svg")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                      .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
   
    slopegraph_svg.selectAll(".year_line")
                .data(years)
                .enter()
              .append("line")
                .attr("x1", function(d) {return x_scale(d);})
                .attr("x2", function(d) {return x_scale(d);})
                .attr("y1", 0)
                .attr("y2", height)
                .attr("class", "year_line")
    }
    
function draw_axes() {
    //Draws the axes for the years and unit
    var xAxis = d3.svg.axis()
          .scale(x_scale)
          .orient("top")
          .tickValues(years)
          .tickFormat(d3.format("d"))
    
    yAxis = d3.svg.axis()
          .scale(y_scale)
          .orient("right")
          
     
    slopegraph_svg.append("g")
                .attr("class", "xAxis")
                .attr("transform", "translate(-30,25)")
                .call(xAxis)
               .selectAll("text")
                 .attr("transform", "rotate(90)")

    slopegraph_svg.append("g")
                .attr("class", "yAxis")
                .attr("transform", "translate(" + (width) + ",0)")
                .call(yAxis)
                
    slopegraph_svg.select(".yAxis").append("text")
                .attr("transform", "translate(" + (55) + ",0)rotate(90)")
                .text("Units Change from baseline")
}
    
function remove_unit_lines(callback) {
    //Draws unit lines
    
    //Transitions lines to zero and delete
    slopegraph_svg.selectAll(".unit_line")
        .transition()
        .attr("y1", y_scale(0))
        .attr("y2", y_scale(0))
      .remove()
      
    //Set timeout for execution after transition above
    if (callback){
      setTimeout(callback, 1000)
    }
}
    
function draw_unit_lines(json_file) {
    
    //Transitions lines to zero and delete
    remove_unit_lines()
      
      
      slopegraph_svg.selectAll(".unit_line").data(json_file["units"])
       .enter().append("line")
        .attr("x1", function(d) {return x_scale(d["x1"])})
        .attr("x2", function(d) {return x_scale(d["x2"])})
        .attr("y1", y_scale(0))
        .attr("y2", y_scale(0))
        .attr("class", "unit_line")
        .attr("stroke", "black")
        .attr("opacity", .1)
      .on("mouseover", function() {
            var part_num = part_num_string(this)
            
            //Highlight parts line
            var part_lines = line_selector(part_num)
        
            //Add labels for units on top of each year line
            slopegraph_svg.selectAll(".Total_units")
              .data(units_mouseover_generator(part_num, part_lines))
            .enter()
              .append("text")
              .text(function(d) {return d["unit"] + " units";})
              .attr("class", "Total_units")
              .attr("x", function(d) {return x_scale(d["year"]);})
              .attr("y", -10)
              .attr("text-anchor", "middle");
              
            //Change text to include part number
            var desc = json_file["part_attr"][part_num]["desc"].substring(0,65)
            
            d3.select("#Title h3")
              .text(part_num + " - " + desc)
          })
      .on("mouseout", function(d) {  
              
             slopegraph_svg.selectAll(".Total_units").remove()
             
             d3.select("#Title h3")
              .text("Each line is a change in average part standard for a workcenter. Hover over lines for detail")
          })
        .transition()
          .attr("y1", function(d) {return y_scale(d["y1"]);})
          .attr("y2", function(d) {return y_scale(d["y2"]);})

         slopegraph_svg.select(".yAxis")
           .transition()
           .call(yAxis)
}
    
function create_graph(resource_name) {
  //Create slopegraph given resource name
  var json_path = "../data/" + resource_name + "_modified.json"
  
  d3.json(json_path, function(error, json) {
      //Load data and construct slopegraph
      json_file = json
      
      
      var max_y = d3.max(all_y(json_file["units"]), function(d) {return Math.abs(d)})
      y_scale.domain([-max_y, max_y])
      draw_unit_lines(json_file)
      
      }); 
}

//UI Elements
$("button").click(function() {
    //Get resource name and create callback to pass
    var resource_name = this.textContent;
    
    d3.selectAll(".active").classed("active", false)
    d3.select(this).classed("active", true)
    
    remove_unit_lines(function() {
        create_graph(resource_name);
      })
});

//Initialize graph
draw_canvas()
y_scale.domain([0,0])
draw_axes()
