

window.Backtest.ruleController = Ember.Object.create(
  fetch: ()->       
        $.get('closes',symbol: this.get('symbol'),(data)=>
          ta = window.TA
          prices = data['prices'].reverse()
          parse = d3.time.format("%Y-%m-%d").parse;
          rawdates = data['dates'].reverse()
          dates = rawdates.map(parse)
          ma = ta.sma(prices,this.get('period'))
          this.set('trades',ta.xover(rawdates,prices,ma))

          w0 = 960
          h0 = 300
          m = [20, 30, 20, 30]
          w = w0 - m[1] - m[3]
          h = h0 - m[0] - m[2]
          
          d3.select("svg").remove()

          g = d3.select("#graph").append("svg:svg").attr("width", w0).attr("height", h0)
            .append("svg:g").attr("transform", "translate(" + m[3] + "," + m[0] + ")");
          x = d3.time.scale().domain([dates[0],dates[dates.length-1] ]).range([0, w])
          mx = Math.max.apply(null, prices)
          mn = Math.min.apply(null, prices)
          rng = mx-mn
          margin = rng * 0.1

          y = d3.scale.linear().domain([mx+margin,mn-margin]).nice().range([0, h])
          line = d3.svg.line().x((d,i)->return x(dates[i])).y((d)->return y(d))    
          
          yAxis = d3.svg.axis().scale(y).ticks(6).orient("left");
          xAxis = d3.svg.axis().scale(x).tickSize(-h).tickSubdivide(true)

          g.append("svg:g").attr("class", "y axis").attr("transform", "translate(" + 0 + ",0)").call(yAxis);
          g.append("svg:g").attr("class", "x axis").attr("transform", "translate(0,"+h+")").call(xAxis);
          
          g.append("svg:path").attr("d", line(prices))    
          g.append("svg:path").attr("d", line(ma)).attr("class", "ma")
          )
  symbol: "GRPN"
  capital: 10000
  trades: null
  period: 10
)
