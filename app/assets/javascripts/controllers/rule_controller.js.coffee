window.Backtest.ruleController = Ember.Object.create(
	fetch: ()-> 
				t = this
				$.get('closes',symbol: this.get('symbol'),(data)->					
					prices = data['prices']
					ma = t.sma(prices,t.get('period'))
					g = d3.select("#graph").append("svg:svg").attr("width", "100%").attr("height", "100%");
					x = d3.scale.linear().domain([0,prices.length ]).range([0, 600])
					y = d3.scale.linear().domain([Math.min.apply(null, prices), Math.max.apply(null, prices)]).range([0, 300])
					line = d3.svg.line().x((d,i)->return x(i)).y((d)->return y(d))		
					g.append("svg:path").attr("d", line(prices))		
					g.append("svg:path").attr("d", line(ma))
					)
	sma: (data,period) ->
      workingSet = [];
      results = [];
      console.log(data)
      console.log(period)
      for n in data
      	workingSet.push(n)
      	if(workingSet.length > period)
      		workingSet.shift()
      	results.push( (workingSet.reduce (s,t) -> s + t) /workingSet.length )
      return results
	symbol: "GRPN"
	period: 3
)

# g.selectAll("line").data
		# 
		# yAxis = d3.svg.axis().scale(y).orient('left').tickSize(5).tickPadding(10);
		# g.append('svg:g').attr('class', 'yTick').call(yAxis)


