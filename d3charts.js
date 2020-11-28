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


// set the dimensions and margins of the calendar
var marginCal = {top: 80, right: 50, bottom: 100, left: 80},
  width = 750 - marginCal.left - marginCal.right,
  height = 400 - marginCal.top - marginCal.bottom;

// append the svg object to the body of the page
var cal = d3.select("#sqf_cal")
.append("svg")
  .attr("width", width + marginCal.left + marginCal.right)
  .attr("height", height + marginCal.top + marginCal.bottom)
.append("g")
  .attr("transform",
        "translate(" + marginCal.left + "," + marginCal.top + ")");

//Read the data
d3.csv("https://raw.githubusercontent.com/dtorre17/danielatorresweb/master/sqfdata.csv", function(data) {
  console.log(data)
  // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
  var myGroups = d3.map(data, function(d){return d.MONTH;}).keys()
  var myVars = d3.map(data, function(d){return d.YEAR;}).keys()

  // Build X scales and axis:
  var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(myGroups)
    .padding(0.05);
  cal.append("g")
    .style("font-size", 14)
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickSize(0))
    .selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)" )
    .select(".domain").remove()
    

  // Build Y scales and axis:
  var y = d3.scaleBand()
    .range([ height, 0 ])
    .domain(myVars)
    .padding(0.05);
  cal.append("g")
    .style("font-size", 14)
    .call(d3.axisLeft(y).tickSize(0))
    .select(".domain").remove()

  // Build color scale
  var myColor = d3.scaleSequential()
    .interpolator(d3.interpolateInferno)
    .domain([1,1000])

  // create a tooltip
  var tooltip = d3.select("#sqf_cal")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")

  // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
    tooltip
      .style("opacity", 1)
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1)
  }
  var mousemove = function(d) {
    tooltip
      .html("Stop-and-frisks recorded in <br>" + d.MONTH + " " +d.YEAR + " by racial description: <br>"
            + "BLACK:" + d.BLACK + "<br> BLACK HISPANIC:" + d.BLACKHISP + "<br> WHITE HISPANIC:"
            + d.WHITEHISP + "<br> WHITE:" + d.WHITE + "<br> ASIAN/PACF ISLANDER:" + d.ASIAN + "<br> TOTAL:" + d.TOTAL)
      .style("left", (d3.mouse(this)[0]+70) + "px")
      .style("top", (d3.mouse(this)[1]) + "px")
  }
  var mouseleave = function(d) {
    tooltip
      .style("opacity", 0)
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 0.8)
  }

  // add the squares
  cal.selectAll()
    .data(data, function(d) {return d.MONTH+':'+d.YEAR;})
    .enter()
    .append("rect")
      .attr("x", function(d) { return x(d.MONTH) })
      .attr("y", function(d) { return y(d.YEAR) })
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("width", x.bandwidth() )
      .attr("height", y.bandwidth() )
      .style("fill", function(d) { return myColor(d.BLACK)} )
      .style("stroke-width", 4)
      .style("stroke", "none")
      .style("opacity", 0.8)
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)
})

// Add title to graph
cal.append("text")
        .attr("x", 0)
        .attr("y", -50)
        .attr("text-anchor", "left")
        .style("font-size", "22px")
        .text("Number of people stopped monthly by NYPD with racial description");

// Add subtitle to graph
cal.append("text")
        .attr("x", 0)
        .attr("y", -20)
        .attr("text-anchor", "left")
        .style("font-size", "14px")
        .style("fill", "grey")
        .style("max-width", 400)
        .text("A short description of the take-away message of this chart.");