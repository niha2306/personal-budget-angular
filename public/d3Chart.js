let values=[], labels=[];

const createD3Chart = () => {
    const width = 700;
    const height = 450;
	const radius = Math.min(width, height) / 2;

    const svg = d3.select("#d3Chart")
      .append("svg")
      .append("g")

    svg.append("g").attr("class", "slices");
    svg.append("g").attr("class", "labels");
    svg.append("g").attr("class", "lines");
    svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    const arc = d3.svg.arc()
	.outerRadius(radius * 0.8)
	.innerRadius(radius * 0.4);

    const outerArc = d3.svg.arc()
	.innerRadius(radius * 0.9)
	.outerRadius(radius * 0.9);

    const pie = d3.layout.pie().sort(null).value((data) => {
		return data.value;
	});

    const key = (labeldata) => { 
        return labeldata.data.label; 
    };

    const generateData = () => {
        const labell = color.domain();
        return labell.map((label, i) => {
            return { label: label, value: Math.random()}
        });
    }

    var color = d3.scale.ordinal()
	.domain(labels)
	.range([
        '#ffcd56',
        '#ff6384',
        '#36a2eb',
        '#fd6b19',
        '#67bf7d',
        '#e0891d',
        '#e01dd3',
        '#6b5f6b'
    ]);

    const change = (data) => {

        var slice = svg.select(".slices").selectAll("path.slice")
            .data(pie(data), key);

        slice.enter()
		    .insert("path")
		    .style("fill", (d) => { return color(d.data.label); })
		    .attr("class", "slice");

        slice.transition().duration(1000)
		    .attrTween("d", (d) => {
		    	this._current = this._current || d;
		    	var interpolate = d3.interpolate(this._current, d);
		    	this._current = interpolate(0);
		    	return function(t) {
		    		return arc(interpolate(t));
		    	};
		    })
        slice.exit().remove();

        const text = svg.select(".labels").selectAll("text")
		    .data(pie(data), key);

	    text.enter()
	    	.append("text")
	    	.attr("dy", ".35em")
	    	.text(function(d) {
	    		return d.data.label;
	    	});
	
	    const  midAngle = (d) => {
	    	return d.startAngle + (d.endAngle - d.startAngle)/2;
	    }

	    text.transition().duration(1000)
	    	.attrTween("transform", function(d) {
	    		this._current = this._current || d;
	    		var interpolate = d3.interpolate(this._current, d);
	    		this._current = interpolate(0);
	    		return function(t) {
	    			var d2 = interpolate(t);
	    			var pos = outerArc.centroid(d2);
	    			pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
	    			return "translate("+ pos +")";
	    		};
	    	})
	    	.styleTween("text-anchor", function(d){
	    		this._current = this._current || d;
	    		var interpolate = d3.interpolate(this._current, d);
	    		this._current = interpolate(0);
		    	return function(t) {
		    		var d2 = interpolate(t);
		    		return midAngle(d2) < Math.PI ? "start":"end";
		    	};
		    });

	    text.exit().remove();

	    const polyline = svg.select(".lines").selectAll("polyline")
	    	.data(pie(data), key);
            
	    polyline.enter()
	    	.append("polyline");

	    polyline.transition().duration(1000)
	    	.attrTween("points", function(d){
	    		this._current = this._current || d;
	    		var interpolate = d3.interpolate(this._current, d);
	    		this._current = interpolate(0);
	    		return function(t) {
	    			var d2 = interpolate(t);
	    			var pos = outerArc.centroid(d2);
	    			pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
	    			return [arc.centroid(d2), outerArc.centroid(d2), pos];
	    		};			
	    	});
	
	    polyline.exit().remove();
    }
    change(generateData());
}

function getBudget() {
    axios.get('http://localhost:3000/budget')
    .then(function (res) {
        for (var i = 0; i < res.data.mybudget.length; i++) {
            values[i] = res.data.mybudget[i].budget;
            labels[i] = res.data.mybudget[i].title;
        }
        createD3Chart();
    });
}
getBudget();