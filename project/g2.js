var outerWidth = 1500;
      var outerHeight = 400;
      var margin = { left: 90, top: 86, right: 30, bottom: 30 };
      var barPadding = 0.4;

      var xColumn = "x";
      var yColumn = "y";

      var innerWidth  = outerWidth  - margin.left - margin.right;
      var innerHeight = outerHeight - margin.top  - margin.bottom;

      var svg = d3.select("body").append("svg")
        .attr("width",  outerWidth)
        .attr("height", outerHeight);
      var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      var xAxisG = g.append("g")
        .attr("transform", "translate(0," + innerHeight + ")");
        
      var yAxisG = g.append("g");
      
      ///.attr("transform", "translate("+innerwidth + "0,)");
      var xScale = d3.scale.ordinal().rangeBands([0, innerWidth-100], barPadding);
      var yScale = d3.scale.linear().range([innerHeight, 0]);

      var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
      var yAxis = d3.svg.axis().scale(yScale).orient("left");

      d3.json("output3.json", function (data) {

          xScale.domain(data.map(function (d) { return d[xColumn]; }));
          yScale.domain([0, d3.max(data, function (d) { return d[yColumn]; })]);

          xAxisG.call(xAxis);
          yAxisG.call(yAxis);

          var bars = g.selectAll("rect").data(data);
          bars.enter().append("rect")
          .attr("width", xScale.rangeBand())
          .attr("fill","#1f77b4");
          bars
          .attr("x", function (d) { return xScale(d[xColumn]); })
          .attr("y", function (d) { return yScale(d[yColumn]); })
          .attr("height", function (d) {
               return innerHeight - yScale(parseInt(d[yColumn]));
             
                         });
          bars.exit().remove();
      });

    /*  function type(d){
        d["cy"] = +d["cy"];
        return d;
      }*/
