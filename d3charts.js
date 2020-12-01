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
   widthHom = 460 - marginHom.left - marginHom.right,
   heightHom = 500 - marginHom.top - marginHom.bottom;


// append the svg object to the body of the page
var homicide = d3.select("#policehomicides")
 .append("svg")
   .attr("width", widthHom + marginHom.left + marginHom.right)
   .attr("height", heightHom + marginHom.top + marginHom.bottom)
 .append("g")
   .attr("transform",
         "translate(" + marginHom.left + "," + marginHom.top + ")");

// X axis
var xHom = d3.scaleBand()
 .range([ 0, widthHom ])
 .domain(blackHomRates.map(function(d) { return d.group; }))
 .padding(0.2);
homicide.append("g")
 .attr("transform", "translate(0," + heightHom + ")")
 .call(d3.axisBottom(xHom))
 .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)" );


// Add Y axis
var yHom = d3.scaleLinear()
 .domain([0, 45])
 .range([ heightHom, 0]);
homicide.append("g")
 .attr("class", "myYaxis")
 .call(d3.axisLeft(yHom));

// A function that create / update the plot for a given variable:
function update_h(data_h) {

 var u = homicide.selectAll("rect")
   .data(data_h)

 u
   .enter()
   .append("rect")
   .merge(u)
   .transition()
   .duration(1000)
     .attr("x", function(d) { return xHom(d.group); })
     .attr("y", function(d) { return yHom(d.value); })
     .attr("width", xHom.bandwidth())
     .attr("height", function(d) { return heightHom - yHom(d.value); })
     .attr("fill", "#69b3a2")
}
// Initialize the plot with the first dataset
update_h(allHomRates)

// Eduardo's graph
var marginF = {top: 30, right: 30, bottom: 70, left: 60},
    widthF = 460 - marginF.left - marginF.right,
    heightF = 400 - marginF.top - marginF.bottom;

// append the svg object to the body of the page
var svg = d3.select("#ethnicityBreakdown")
  .append("svg")
    .attr("width", widthF + marginF.left + marginF.right)
    .attr("height", heightF + marginF.top + marginF.bottom)
  .append("g")
    .attr("transform",
          "translate(" + marginF.left + "," + marginF.top + ")");

// Initialize the X axis
var xF = d3.scaleBand()
  .range([ 0, widthF ])
  .padding(0.2);
var xAxis = svg.append("g")
  .attr("transform", "translate(0," + heightF + ")")

// Initialize the Y axis
var yF = d3.scaleLinear()
  .range([ heightF, 0]);
var yAxis = svg.append("g")
  .attr("class", "myYaxis")


// A function that create / update the plot for a given variable:
function update_f(selectedVar) {

  // Parse the Data
  d3.csv("https://raw.githubusercontent.com/eaguila6/dataStructures/master/ethnicity_value.csv", function(data) {

    // X axis
    xF.domain(data.map(function(d) { return d.group; }))
    xAxis.transition().duration(1000).call(d3.axisBottom(xF))

    // Add Y axis
    yF.domain([0, d3.max(data, function(d) { return +d[selectedVar] }) ]);
    yAxis.transition().duration(1000).call(d3.axisLeft(yF));

    // variable u: map data to existing bars
    var u = svg.selectAll("rect")
      .data(data)

    // update bars
    u
      .enter()
      .append("rect")
      .merge(u)
      .transition()
      .duration(1000)
        .attr("x", function(d) { return xF(d.group); })
        .attr("y", function(d) { return yF(d[selectedVar]); })
        .attr("width", xF.bandwidth())
        .attr("height", function(d) { return heightF - yF(d[selectedVar]); })
        .attr("fill", "#69b3a2")
  })

}
// Initialize plot
update_f('Total')

//end eduardo's graph



// set the dimensions and margins of the calendar
var marginCal = {top: 20, right: 50, bottom: 90, left: 50},
  widthCal = 750 - marginCal.left - marginCal.right,
  heightCal = 400 - marginCal.top - marginCal.bottom;

// append the svg object to the body of the page
var cal = d3.select("#sqf_cal")
.append("svg")
  .attr("width", widthCal + marginCal.left + marginCal.right)
  .attr("height", heightCal + marginCal.top + marginCal.bottom)
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
    .attr("transform", "translate(0," + heightCal + ")")
    .call(d3.axisBottom(x).tickSize(0))
    .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)" )
    .select(".domain").remove()


  // Build Y scales and axis:
  var y = d3.scaleBand()
    .range([ heightCal, 0 ])
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
      .style("position-relative")
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

// Add subtitle to graph
cal.append("text")
        .attr("x", 0)
        .attr("y", -5)
        .attr("text-anchor", "left")
        .style("font-size", "14px")
        .style("fill", "grey")
        .style("max-width", 400)
        .text("Hover over each block to see that month's summary of stop-and-frisks in NYC");





var margin_ag = {top: 10, right: 30, bottom: 155, left: 65},
    width = 460 - margin_ag.left - margin_ag.right,
    height = 400 - margin_ag.top - margin_ag.bottom;
// append the svg object to the body of the page
var age_race = d3.select("#age_race")
  .append("svg")
    .attr("width", width + margin_ag.left + margin_ag.right)
    .attr("height", height + margin_ag.top + margin_ag.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin_ag.left + "," + margin_ag.top + ")");

// get the data
d3.csv("https://raw.githubusercontent.com/mfleming99/data-host/master/tmp.csv", function(data) {

  // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
  var myGroups = d3.map(data, function(d){return d.group;}).keys()
  var myVars = d3.map(data, function(d){return d.variable;}).keys()

  // Build X scales and axis:
  var x_ag = d3.scaleBand()
    .range([ 0, width ])
    .domain(myGroups)
    .padding(0.1);
  age_race.append("g")
    .style("font-size", 12)
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x_ag).tickSize(0))
    .selectAll("text")
    .attr("dx", "-4.0em")
    .attr("transform", "rotate(-30)")
    .select(".domain").remove()


  // Build Y scales and axis:
  var y_ag = d3.scaleBand()
    .range([ height, 0 ])
    .domain(myVars)
    .padding(0.05);
  age_race.append("g")
    .style("font-size", 12)
    .call(d3.axisLeft(y_ag).tickSize(0))
    .select(".domain").remove()

  // Build color scale
  var myColor = d3.scaleLog()
  .domain([1,100000])
  .range(["white", "red"])


  // create a tooltip
  var tooltip = d3.select("#age_race")
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
      .html("The number of " + d.group + " victims aged <br>" + d.variable +" is: " + d.value)
      .style("position-absolute")
      // .style("left", (d3.mouse(this)[0]) + "px")
      // .style("top", (d3.mouse(this)[1]-1000) + "px")
      // .attr("dy", "+15em")

  }
  var mouseleave = function(d) {
    tooltip
      .style("opacity", 0)
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 0.8)
  }

  // add the squares
  age_race.selectAll()
    .data(data, function(d) {return d.group+':'+d.variable;})
    .enter()
    .append("rect")
      .attr("x", function(d) { return x_ag(d.group) })
      .attr("y", function(d) { return y_ag(d.variable) })
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("width", x_ag.bandwidth() )
      .attr("height", y_ag.bandwidth() )
      .style("fill", function(d) { return myColor(d.value)} )
      .style("stroke-width", 4)
      .style("stroke", "none")
      .style("opacity", 0.8)
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)
})

// Add title to graph
age_race.append("text")
        .attr("x", 0)
        .attr("y", -50)
        .attr("text-anchor", "left")
        .style("font-size", "22px")
        .text("A d3.js heatmap");

// Add subtitle to graph
age_race.append("text")
        .attr("x", 0)
        .attr("y", -20)
        .attr("text-anchor", "left")
        .style("font-size", "14px")
        .style("fill", "grey")
        .style("max-width", 400)
        .text("A short description of the take-away message of this chart.");


var width_rm = 450
    height_rm = 450
    margin_rm = 40

//white
var data1_rm = "https://raw.githubusercontent.com/mfleming99/data-host/master/white_deaths.geojson.json"
//black
var data2_rm = "https://raw.githubusercontent.com/mfleming99/data-host/master/black_deaths.geojson.json"

//asian
var data3_rm = "https://raw.githubusercontent.com/mfleming99/data-host/master/asian_deaths.geojson.json"
//Native american
var data4_rm = "https://raw.githubusercontent.com/mfleming99/data-host/master/n_amr_deaths.geojson.json"
//hispanic
var data5_rm = "https://raw.githubusercontent.com/mfleming99/data-host/master/hispn_deaths.geojson.json"

var color_rm = d3.scaleLog()
.domain([1,100000])
.range(["white", "red"])


var svg_rm = d3.select("#map_race")
  .append("svg")
    .attr("width", width_rm)
    .attr("height", height_rm)

// Map and projection
var projection = d3.geoMercator()
    .scale(350) // This is the zoom
    .translate([850, 440]); // You have to play with these values to center your map

// Path generator
var path = d3.geoPath()
    .projection(projection)


// Load external data and boot
function update(external_data) {
  d3.json(external_data, function(data_m){

    // Draw the map
    svg_rm.append("g")
        .selectAll("path")
        .data(data_m.features)
        .enter()
        .append("path")
            .attr("d", path)
            .attr('fill', function(d){ return(color_rm(d.properties.deaths)) })
            .attr("stroke", "white")




    // Add the labels
    svg_rm.append("g")
        .selectAll("labels")
        .data(data_m.features)
        .enter()
        .append("text")
          .attr("x", function(d){return path.centroid(d)[0]})
          .attr("y", function(d){return path.centroid(d)[1]})
          .text(function(d){ return d.properties.iso3166_2})
          .attr("text-anchor", "middle")
          .attr("alignment-baseline", "central")
          .style("font-size", 11)
          .style("fill", "white")
  })
}
update(data1_rm)














var margin_pp = {top: 0, right: 20, bottom: 30, left: 180},
  width_pp = 450 - margin_pp.left - margin_pp.right,
  height_pp = 450 - margin_pp.top - margin_pp.bottom;

// append the svg object to the body of the page
var svg_pp = d3.select("#policies_corr")
.append("svg")
  .attr("width", width_pp + margin_pp.left + margin_pp.right)
  .attr("height", height_pp + margin_pp.top + margin_pp.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin_pp.left + "," + margin_pp.top + ")");

//Read the data
d3.csv("https://raw.githubusercontent.com/mfleming99/data-host/master/force_policies_corr.csv", function(data) {

  // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
  var myGroups_pp = d3.map(data, function(d){return d.group;}).keys()
  var myVars_pp = d3.map(data, function(d){return d.variable;}).keys()

  // Build X scales and axis:
  var x_pp = d3.scaleBand()
    .range([ 0, width_pp ])
    .domain(myGroups_pp)
    .padding(0.05);
  svg_pp.append("g")
    .style("font-size", 10)
    .attr("transform", "translate(0," +235+")")
    .call(d3.axisBottom(x_pp).tickSize(0))
    // .call(g => g.select(".domain").remove())

    .selectAll("text")
    .attr("text-anchor", "end")

    // .attr("dx", "-10.0em")

    .attr("transform", "rotate(-45)")

    .select(".domain").remove()

  // Build Y scales and axis:
  var y_pp = d3.scaleBand()
    .range([ height, 0 ])
    .domain(myVars_pp)
    .padding(0.05);
  svg_pp.append("g")
    .style("font-size", 10)
    .call(d3.axisLeft(y_pp).tickSize(0))
    .selectAll("text")
    // .attr("dx", "-10.0em")
    .attr("transform", "rotate(-45)")
    .select(".domain").remove()


  // Build color scale
  var myColor = d3.scaleSequential()
    .interpolator(d3.interpolateInferno)
    .domain([0,1])

  // create a tooltip
  var tooltip_pp = d3.select("#policies_corr")
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
    tooltip_pp
      .style("opacity", 1)
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1)
  }
  var mousemove = function(d) {
    tooltip_pp
      .html("The correlation between " + d.group + "<br> and " + d.variable + " is: " + d.value)
      .style("position-relative")
      // .style("left", (d3.mouse(this)[0]+70) + "px")
      // .style("top", (d3.mouse(this)[1]) + "px")
  }
  var mouseleave = function(d) {
    tooltip_pp
      .style("opacity", 0)
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 0.8)
  }

  // add the squares
  svg_pp.selectAll()
    .data(data, function(d) {return d.group+':'+d.variable;})
    .enter()
    .append("rect")
      .attr("x", function(d) { return x_pp(d.group) })
      .attr("y", function(d) { return y_pp(d.variable) })
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("width", x_pp.bandwidth() )
      .attr("height", y_pp.bandwidth() )
      .style("fill", function(d) { return myColor(d.value)} )
      .style("stroke-width", 4)
      .style("stroke", "none")
      .style("opacity", 0.8)
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)
})

// Add title to graph
svg_pp.append("text")
        .attr("x", 0)
        .attr("y", -50)
        .attr("text-anchor", "left")
        .style("font-size", "22px")

// Add subtitle to graph
svg_pp.append("text")
        .attr("x", 0)
        .attr("y", -20)
        .attr("text-anchor", "left")
        .style("font-size", "14px")
        .style("fill", "grey")
        .style("max-width", 400)


var width_arms = 400
    height_arms = 400
    margin_arms = 40

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width_arms, height_arms) / 2 - margin_arms

// append the svg object to the div called 'my_dataviz'
var svg_arms = d3.select("#pie_arms")
  .append("svg")
    .attr("width", width_arms)
    .attr("height", height_arms)
  .append("g")
    .attr("transform", "translate(" + width_arms / 2 + "," + height_arms / 2 + ")");

// create 2 data_set
//white
var data1_arms = {Gun: 1478, Knife: 357, Other:442, Unarmed:146}
//black
var data2_arms = {Gun: 772, Knife: 150, Other:209, Unarmed:124}

//asian
var data3_arms = {Gun: 36, Knife: 28, Other:20, Unarmed:7}
//Native american
var data4_arms = {Gun: 41, Knife: 17, Other:10, Unarmed:4}
//hispanic
var data5_arms = {Gun: 455, Knife: 156, Other:198, Unarmed:63}



// set the color scale
var color_arms = d3.scaleOrdinal()
  .domain(["a", "b", "c", "d", "e", "f"])
  .range(["#4e79a7","#f28e2c","#e15759","#76b7b2","#59a14f","#edc949"]); 

// A function that create / update the plot for a given variable:
function update_arms(data_arms) {

  // Compute the position of each group on the pie:
  var pie = d3.pie()
    .value(function(d) {return d.value; })
    .sort(function(a, b) { console.log(a) ; return d3.ascending(a.key, b.key);} ) // This make sure that group order remains the same in the pie chart
  var data_ready = pie(d3.entries(data_arms))
var arcGenerator = d3.arc()
  .innerRadius(0)
  .outerRadius(radius)

  // map to data
  var u_arms = svg_arms.selectAll("path")
    .data(data_ready)
svg_arms.selectAll("mySlices").data(data_ready).enter().selectAll('text').remove()
  // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
  u_arms
    .enter()
    .append('path')
    .merge(u_arms)
    .transition()
    .duration(1000)
    .attr('d', arcGenerator)
    .attr('fill', function(d){ return(color_arms(d.data.key)) })
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .style("opacity", 1)
svg_arms
  .selectAll('mySlices')
  .data(data_ready)
  .enter()
  .append('text')
  .text(function(d){ return  d.data.key})
  .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
  .style("text-anchor", "middle")
  .style("font-size", 17)


  // remove the group that is not present anymore
  u_arms
    .exit()
    .remove()

}

// Initialize the plot with the first dataset
update_arms(data1_arms)


// eduardo's death by age

// set the dimensions and margins of the graph
var marginD = {top: 10, right: 30, bottom: 30, left: 60},
    widthD = 460 - marginD.left - marginD.right,
    heightD = 400 - marginD.top - marginD.bottom;

// append the svg object to the body of the page
var svg_d = d3.select("#deathsByAge")
  .append("svg")
    .attr("width", widthD + marginD.left + marginD.right)
    .attr("height", heightD + marginD.top + marginD.bottom)
  .append("g")
    .attr("transform",
          "translate(" + marginD.left + "," + marginD.top + ")");

//Read the data
d3.csv("https://raw.githubusercontent.com/eaguila6/dataStructures/master/deathsByAge.csv", function(data) {


  // group the data: I want to draw one line per group
  var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
    .key(function(d) { return d.name;})
    .entries(data);

  // Add X axis --> it is a date format
  var xD = d3.scaleLinear()
    .domain(d3.extent(data, function(d) { return d.year; }))
    .range([ 0, widthD ]);
  svg_d.append("g")
    .attr("transform", "translate(0," + heightD + ")")
    .call(d3.axisBottom(xD).ticks(5));

  // Add Y axis
  var yD = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return +d.n; })])
    .range([ heightD, 0 ]);
  svg_d.append("g")
    .call(d3.axisLeft(yD));
//////////////////////////////////////////////////////////////

// This allows to find the closest X index of the mouse:
 var bisect = d3.bisector(function(d) { return d.year; }).left;

 // Create the circle that travels along the curve of chart
 var focus = svg_d
   .append('g')
   .append('circle')
     .style("fill", "none")
     .attr("stroke", "black")
     .attr('r', 8.5)
     .style("opacity", 0)

 // Create the text that travels along the curve of chart
 var focusText = svg_d
   .append('g')
   .append('text')
     .style("opacity", 0)
     .attr("text-anchor", "left")
     .attr("alignment-baseline", "middle")

 // // Add the line
 // svg
 //   .append("path")
 //   .datum(data)
 //   .attr("fill", "none")
 //   .attr("stroke", "steelblue")
 //   .attr("stroke-width", 1.5)
 //   .attr("d", d3.line()
 //     .x(function(d) { return x(d.x) })
 //     .y(function(d) { return y(d.y) })
 //     )
 //

 // // Create a rect on top of the svg area: this rectangle recovers mouse position
 // svg
 //   .append('rect')
 //   .style("fill", "none")
 //   .style("pointer-events", "all")
 //   .attr('width', width)
 //   .attr('height', height)
 //   .on('mouseover', mouseover)
 //   .on('mousemove', mousemove)
 //   .on('mouseout', mouseout);

//
 // What happens when the mouse move -> show the annotations at the right positions.
 function mouseover() {
   focus.style("opacity", 1)
   focusText.style("opacity",1)
 }

 function mousemove() {
   // recover coordinate we need
   var x0 = xD.invert(d3.mouse(this)[0]);
   var i = bisect(data, x0, 1);
   selectedData = data[i]
   focus
     .attr("cx", xD(selectedData.x))
     .attr("cy", yD(selectedData.y))
   focusText
     .html("x:" + selectedData.x + "  -  " + "y:" + selectedData.y)
     .attr("x", xD(selectedData.x)+15)
     .attr("y", yD(selectedData.y))
   }

  // color palette
  var res = sumstat.map(function(d){ return d.key }) // list of group names
  var color = d3.scaleOrdinal()
    .domain(res)
    .range(["#76b7b2","#af7aa1","#ff9da7","#9c755f","#bab0ab"])

  // Draw the line
  svg_d.selectAll(".line")
      .data(sumstat)
      .enter()
      .append("path")
        .attr("fill", "none")
        .attr("stroke", function(d){ return color(d.key) })
        .attr("stroke-width", 1.5)
        .attr("d", function(d){
          return d3.line()
            .x(function(d) { return xD(d.year); })
            .y(function(d) { return yD(+d.n); })
            (d.values)
        })

})

//end eduardo's death by age

//overtime proportional
var marginP = {top: 10, right: 100, bottom: 30, left: 40},
    widthP = 460 - marginP.left - marginP.right,
    heightP = 400 - marginP.top - marginP.bottom;

// append the svg object to the body of the page
var svg_p = d3.select("#deathsOverTimeProportional")
  .append("svg")
    .attr("width", widthP + marginP.leftP + marginP.right)
    .attr("height", heightP + marginP.top + marginP.bottom)
  .append("g")
    .attr("transform",
          "translate(" + marginP.left + "," + marginP.top + ")");

//Read the data
d3.csv("https://raw.githubusercontent.com/eaguila6/dataStructures/master/deathsOverTimeProportional.csv", function(data) {

    // List of groups (here I have one group per column)
    var allGroup = ["White", "Black", "Latino", "Asian", "Native"]

    // add the options to the button
      d3.select("#selectButton")
      .selectAll('myOptions')
     	.data(allGroup)
      .enter()
    	.append('option')
      .text(function (d) { return d; }) // text showed in the menu
      .attr("value", function (d) { return d; }) // corresponding value returned by the button


    // Add X axis --> it is a date format
    var xP = d3.scaleLinear()
      .domain([0,19])
      .range([ 0, widthP ]);
    svg_p.append("g")
      .attr("transform", "translate(0," + heightP + ")")
      .call(d3.axisBottom(xP));

    // Add Y axis
    var yP = d3.scaleLinear()
      .domain( [0,0.55])
      .range([ heightP, 0 ]);
    svg_p.append("g")
      .call(d3.axisLeft(yP));

    // Initialize line with group a
    var lineP = svg_p
      .append('g')
      .append("path")
        .datum(data)
        .attr("d", d3.line()
          .x(function(d) { return xP(+d.time) })
          .y(function(d) { return yP(+d.White) })
        )
        .attr("stroke", "black")
        .style("stroke-width", 4)
        .style("fill", "none")
    
    var dotP = svg_p
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
        .attr("cx", function(d) { return xP(+d.time) })
        .attr("cy", function(d) { return yP(+d.White) })
        .attr("r", 4.5)
        .style("fill", "#69b3a2")

    // A function that update the chart
    function update_p(selectedGroup) {

      // Create new data with the selection?
      var dataFilter = data.map(function(d){return {time: d.time, value:d[selectedGroup]} })

      // Give these new data to update line
      lineP
          .datum(dataFilter)
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return xP(+d.time) })
            .y(function(d) { return yP(+d.value) })
          )
      dotP
        .data(dataFilter)
        .transition()
        .duration(1000)
          .attr("cx", function(d) { return xP(+d.time) })
          .attr("cy", function(d) { return yP(+d.value) })
    }

    // When the button is changed, run the updateChart function
    d3.select("#selectButton").on("change", function(d) {
        // recover the option that has been chosen
        var selectedOption = d3.select(this).property("value")
        // run the updateChart function with this selected option
        update_p(selectedOption)
    })

})

//end of overtime proportional

//total time
// set the dimensions and margins of the graph
var marginT = {top: 10, right: 100, bottom: 30, left: 40},
    widthT = 460 - marginT.left - marginT.right,
    heightT = 400 - marginT.top - marginT.bottom;

// append the svg object to the body of the page
var svg_t = d3.select("#deathsOverTimeTotal")
  .append("svg")
    .attr("width", widthT + marginT.left + marginT.right)
    .attr("height", heightT + marginT.top + marginT.bottom)
  .append("g")
    .attr("transform",
          "translate(" + marginT.left + "," + marginT.top + ")");

//Read the data
d3.csv("https://raw.githubusercontent.com/eaguila6/dataStructures/master/deathsOverTimeTotal.csv", function(data) {

    // List of groups (here I have one group per column)
    var allGroup = ["Total", "White", "Black", "Latino", "Asian", "Native"]

    // add the options to the button
    d3.select("#selectButtonTot")
      .selectAll('myOptions')
     	.data(allGroup)
      .enter()
    	.append('option')
      .text(function (d) { return d; }) // text showed in the menu
      .attr("value", function (d) { return d; }) // corresponding value returned by the button

    // Add X axis --> it is a date format
    var xT = d3.scaleLinear()
      .domain([0,19])
      .range([ 0, widthT ]);
    svg_t.append("g")
      .attr("transform", "translate(0," + heightT + ")")
      .call(d3.axisBottom(xT));

    // Add Y axis
    var yT = d3.scaleLinear()
      .domain( [0,1750])
      .range([ heightT, 0 ]);
    svg_t.append("g")
      .call(d3.axisLeft(yT));

    // Initialize line with group a
    var lineT = svg_t
      .append('g')
      .append("path")
        .datum(data)
        .attr("d", d3.line()
          .x(function(d) { return xT(+d.time) })
          .y(function(d) { return yT(+d.Total) })
        )
        .attr("stroke", "black")
        .style("stroke-width", 4)
        .style("fill", "none")

    // Initialize dots with group a
    var dotT = svg_t
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
        .attr("cx", function(d) { return xT(+d.time) })
        .attr("cy", function(d) { return yT(+d.Total) })
        .attr("r", 4.5)
        .style("fill", "#69b3a2")


    // A function that update the chart
    function update_t(selectedGroup) {

      // Create new data with the selection?
      var dataFilter = data.map(function(d){return {time: d.time, value:d[selectedGroup]} })

      // Give these new data to update line
      lineT
          .datum(dataFilter)
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return xT(+d.time) })
            .y(function(d) { return yT(+d.value) })
          )
      dotT
        .data(dataFilter)
        .transition()
        .duration(1000)
          .attr("cx", function(d) { return xT(+d.time) })
          .attr("cy", function(d) { return yT(+d.value) })
    }

    // When the button is changed, run the updateChart function
    d3.select("#selectButtonTot").on("click", function(d) {
        // recover the option that has been chosen
        var selectedOption = d3.select(this).property("value")
        // run the updateChart function with this selected option
        update_t(selectedOption)
    })

})

//end total time