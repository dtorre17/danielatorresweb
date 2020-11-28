
// set the dimensions and margins of the graph
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
    .style("font-size", 15)
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
    .style("font-size", 15)
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