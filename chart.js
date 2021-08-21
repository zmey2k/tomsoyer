let params={};

function addUs(){
    params.country='us';
};

function addUk(){
    params.country='uk';
};

function addAr(){
    params.country='ar';
};

function addDe(){
    params.country='de';
};

function addAllPlatforms(){
    params.platform='Allplatforms';
};

function addiOS(){
    params.platform='iOS';
};

function addAndroid(){
    params.platform='Android';
};

function addAllNetworks(){
  params.network='Allnetworks';
};

function addFacebook(){
  params.network='Facebook';
};

function addAdmob(){
  params.network='AdMob';
};

function addUnity(){
  params.network='Unity';
};

function addIronSource(){
  params.network='IronSource';
};

function addChartboost(){
  params.network='Chartboost';
};

function addAppLovin(){
  params.network='AppLovin';
};

function addother(){
  params.network='other';
};

function Execute(){
    //------------------------1. PREPARATION------------------------//
    //-----------------------------SVG------------------------------// 
    const width = 1000;
    const height = 350;
    const margin = 5;
    const padding = 5;
    const adj = 40;
    // we are appending SVG first
    d3.selectAll("svg").remove();
    const svg = d3.select("#chart")
        .append("svg")
        .attr("viewBox", "-"
             + adj + " -"
             + adj + " "
            + (width + adj *3) + " "
            + (height + adj*2))
        //.style("padding", padding)
        .style("margin", margin)
        .classed("svg-content", true);

    //-----------------------------DATA-----------------------------//
    const timeConv = d3.timeParse("%Y-%m-%d");

    let dataset = d3.csv("./csv_for_site/"+params.country+params.platform+params.network+".csv");
    dataset.then(function(data) {
        var slices = data.columns.slice(1).map(function(id) {
            return {
                id: id,
                values: data.map(function(d){
                    return {
                        date: timeConv(d.date),
                        measurement: +d[id]
                    };
                })
            };
        });

    //----------------------------SCALES----------------------------//
    const xScale = d3.scaleTime().range([0,width]);
    const yScale = d3.scaleLinear().rangeRound([height, 0]);
    xScale.domain(d3.extent(data, function(d){
        return timeConv(d.date)}));
    yScale.domain([(0), d3.max(slices, function(c) {
        return d3.max(c.values, function(d) {
            return d.measurement + 4; });
            })
        ]);

    //-----------------------------AXES-----------------------------//
    const yaxis = d3.axisLeft()
        .ticks((slices[0].values).length/5)
        .scale(yScale)
        .tickFormat(d3.format(",.0f")); //making axisticks format

    const xaxis = d3.axisBottom()
        .ticks(d3.timeDay.every(1))
        .tickFormat(d3.timeFormat("%d-%m-%y"))
        .scale(xScale);

    //----------------------------LINES-----------------------------//
    const line = d3.line()
        .x(function(d) { return xScale(d.date); })
        .y(function(d) { return yScale(d.measurement); }); 

    //-------------------------2. DRAWING---------------------------//
    //-----------------------------AXES-----------------------------//
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(30," + height + ")")
        .call(xaxis)
        .selectAll("text")
            .attr("x", -5)
            .attr("dy",".35em")
            .attr("transform","rotate(-90)")
            .style("text-anchor","end");

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(30,0)")
        .call(yaxis)
        .append("text")
        .attr("dy", ".75em")
        .attr("y", 6)
        .style("text-anchor", "end");

    //----------------------------LINES-----------------------------//
    const lines = svg.selectAll("lines")
        .data(slices)
        .enter()
        .append("g")

        lines.append("path")
        .attr("transform", "translate(30,0)")
        .attr("d", function(d) { return line(d.values); });

        // lines.append("text")
        // .attr("class","serie_label")
        // .datum(function(d) {
        //     return {
        //         id: d.id,
        //         value: d.values[d.values.length - 1]}; })
        // .attr("transform", function(d) {
        //         return "translate(" + (xScale(d.value.date) + 10)  
        //         + "," + (yScale(d.value.measurement) + 5 ) + ")"; })
        // .attr("x", 5);
        

    })
};