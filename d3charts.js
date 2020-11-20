var margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// get the data
d3.csv("https://raw.githubusercontent.com/dtorre17/danielatorresweb/master/sample.csv", function(data) {
  console.log(data)
  // X axis: scale and draw:
  var x = d3.scaleLinear()
      .domain([0, 1000])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
      .range([0, width]);
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // set the parameters for the histogram
  var histogram = d3.histogram()
      .value(function(d) { return d.blackdeaths; })   // I need to give the vector of value
      .domain(x.domain())  // then the domain of the graphic
      .thresholds(x.ticks(70)); // then the numbers of bins

  // And apply this function to data to get the bins
  var bins = histogram(data);

  // Y axis: scale and draw:
  var y = d3.scaleLinear()
      .range([height, 0]);
      y.domain([0, d3.max(bins, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
  svg.append("g")
      .call(d3.axisLeft(y));

  // append the bar rectangles to the svg element
  svg.selectAll("rect")
      .data(bins)
      .enter()
      .append("rect")
        .attr("x", 1)
        .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
        .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
        .attr("height", function(d) { return height - y(d.length); })
        .style("fill", "#69b3a2")

});


// create a barplot with 3 variables
/*
PD, WhiteAnnualHomicideRate, BlackAnnualHomicideRate, AnnualHomicideRate
"Albuquerque Police Department",6.8,28.8,8.4
"Aurora Police Department",6.5,26.2,9.7
"Bakersfield Police Department",5.4,16.1,9.9
"Kansas City Police Department",4,17.9,8.7
"Oklahoma City Police Department",6.1,40,11.8
"Orlando Police Department",4.3,20.2,10.8
"Phoenix Police Department",8.5,24.7,11
"Reno Police Department",4.1,71.5,8.9
"Spokane Police Department",9,30.8,10.3
"St. Louis Metropolitan Police Department",3.2,32.9,17.9
"Stockton Police Department",6.4,21.3,8.3
"Tulsa Police Department",8.8,16.3,9.8
*/

// create 2 data_set
var blackHomRates = [
  {group: "Albuquerque PD", value: 28.8},
  {group: "Aurora PD", value: 26.2},
  {group: "Bakersfield PD", value: 16.1},
  {group: "Kansas City PD", value: 17.9},
  {group: "Oklahoma City PD", value: 40},
  {group: "Orlando PD", value: 20.2},
  {group: "Phoenix PD", value: 24.7},
  {group: "Reno PD", value: 71.5},
  {group: "Spokane PD", value: 30.8},
  {group: "St. Louis Metropolitan PD" , value: 32.9},
  {group: "Stockton PD", value: 21.3},
  {group: "Tulsa PD", value: 16.3}
];

var whiteHomRates = [
  {group: "Albuquerque PD", value: 6.8},
  {group: "Aurora PD", value: 6.5},
  {group: "Bakersfield PD", value: 5.4},
  {group: "Kansas City PD", value: 4},
  {group: "Oklahoma City PD", value: 6.1},
  {group: "Orlando PD", value: 4.3},
  {group: "Phoenix PD", value: 8.5},
  {group: "Reno PD", value: 4.1},
  {group: "Spokane PD", value: 9},
  {group: "St. Louis Metropolitan PD", value: 3.2},
  {group: "Stockton PD", value: 6.4},
  {group: "Tulsa PD", value: 8.8}
];

var allHomRates = [
  {group: "Albuquerque PD", value: 8.4},
  {group: "Aurora PD", value: 9.7},
  {group: "Bakersfield PD", value: 9.9},
  {group: "Kansas City PD", value: 8.7},
  {group: "Oklahoma City PD", value: 11.8},
  {group: "Orlando PD", value: 10.8},
  {group: "Phoenix PD", value: 11},
  {group: "Reno PD", value: 8.9},
  {group: "Spokane PD", value: 10.3},
  {group: "St. Louis Metropolitan PD", value: 17.9},
  {group: "Stockton PD", value: 8.3},
  {group: "Tulsa PD", value: 9.8}
];

// set the dimensions and margins of the graph
var marginHom = {top: 30, right: 30, bottom: 100, left: 60},
   width = 460 - marginHom.left - marginHom.right,
   height = 500 - marginHom.top - marginHom.bottom;

   
// append the svg object to the body of the page
var homicide = d3.select("#policehomicides")
 .append("svg")
   .attr("width", width + marginHom.left + marginHom.right)
   .attr("height", height + marginHom.top + marginHom.bottom)
 .append("g")
   .attr("transform",
         "translate(" + marginHom.left + "," + marginHom.top + ")");

// X axis
var xHom = d3.scaleBand()
 .range([ 0, width ])
 .domain(blackHomRates.map(function(d) { return d.group; }))
 .padding(0.2);
homicide.append("g")
 .attr("transform", "translate(0," + height + ")")
 .call(d3.axisBottom(xHom))
 .selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)" );


// Add Y axis
var yHom = d3.scaleLinear()
 .domain([0, 45])
 .range([ height, 0]);
homicide.append("g")
 .attr("class", "myYaxis")
 .call(d3.axisLeft(yHom));

// A function that create / update the plot for a given variable:
function update(data) {

 var u = homicide.selectAll("rect")
   .data(data)

 u
   .enter()
   .append("rect")
   .merge(u)
   .transition()
   .duration(1000)
     .attr("x", function(d) { return xHom(d.group); })
     .attr("y", function(d) { return yHom(d.value); })
     .attr("width", xHom.bandwidth())
     .attr("height", function(d) { return height - yHom(d.value); })
     .attr("fill", "#69b3a2")
}

// Initialize the plot with the first dataset
update(allHomRates)
