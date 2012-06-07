

window.Backtest.ruleController = Ember.Object.create(
  fetch: ()->       
        $.get('closes',{symbol: this.get('symbol'),years: this.get('years')},(data)=>

          

          ta = window.TA
          prices = data['prices'].reverse()
          parse = d3.time.format("%Y-%m-%d").parse;
          rawdates = data['dates'].reverse()
          dates = rawdates.map(parse)

          @simulate = ->
            ma1 = ta.sma(prices,this.get('ma1'))
            ma2 = ta.sma(prices,this.get('ma2'))  
            @set('trades',ta.xover(rawdates,prices,ma1,ma2))
          
          @simulate()
          
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

          @drawMa = (name) ->
            period = @get(name)
            ma = ta.sma(prices,period)
            g.append("svg:path").attr("d", line(ma)).attr("class", name)

          
          yAxis = d3.svg.axis().scale(y).ticks(6).orient("left");
          xAxis = d3.svg.axis().scale(x).tickSize(-h).tickSubdivide(true)

          g.append("svg:g").attr("class", "y axis").attr("transform", "translate(" + 0 + ",0)").call(yAxis);
          g.append("svg:g").attr("class", "x axis").attr("transform", "translate(0,"+h+")").call(xAxis);
          
          g.append("svg:path").attr("d", line(prices))    

          @drawMa "ma1"
          @drawMa "ma2"
                    
          )
  symbol: "GRPN"
  capital: 10000
  trades: null
  ma1: 7
  ma2: 15
  years: 1
 
  ma1Changed: Ember.observer( () ->
      @simulate()
      mapath = d3.select(".ma1")
      if(mapath)
        mapath.remove()
        @drawMa "ma1"
    ,'ma1')

  ma2Changed: Ember.observer( () ->
      @simulate()
      mapath = d3.select(".ma2")
      if(mapath)
        mapath.remove()
        @drawMa "ma2"
    ,'ma2')

)

