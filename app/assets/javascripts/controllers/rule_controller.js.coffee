

window.Backtest.ruleController = Ember.Object.create(
  fetch: ->       
    $.get('closes',{symbol: this.get('symbol'),years: this.get('years')},(data)=>
      @prices = data['prices']
      @rawdates = data['dates']

      parse = d3.time.format("%Y-%m-%d").parse;
      @dates = @rawdates.map(parse)
         
      @redraw()
    )

  redraw: ->
    @createMA i for i in [0,1]
    @drawChart()    
    @drawMa i for i in [0,1]
    @simulate()


  visibleCount: -> Math.round(251 * @get('years'))
  
  visible: (arr) ->    
    end = arr.length
    start = arr.length - @visibleCount() + 1
    arr.slice(start,end)


  burnIn: -> @ma[1]

  
  maSeries: [null,null]

  createMA: (index) ->    
    @maSeries[index] = window.TA.sma(@prices,@ma[index])

  rawToVis: (i) -> i - (@prices.length - @visibleCount() + 1)


  drawChart: ->
    d3.select("svg").remove()
    w0 = 960
    h0 = 300
    m = [20, 30, 20, 30]
    w = w0 - m[1] - m[3]
    h = h0 - m[0] - m[2]
    
    visibleDates = @visible(@dates)
    visiblePrices = @visible @prices

    g = d3.select("#graph").append("svg:svg").attr("width", w0).attr("height", h0)
      .append("svg:g").attr("transform", "translate(" + m[3] + "," + m[0] + ")");
    xScale = d3.time.scale().domain([visibleDates[0],visibleDates[visibleDates.length-1]]).range([0, w])
    
    all = visiblePrices.concat(@visible(@maSeries[0]),@visible(@maSeries[1]))

    mx = _.max(all);
    mn = _.min(all);

    rng = mx-mn
    margin = rng * 0.1
    yScale = d3.scale.linear().domain([mx+margin,mn-margin]).nice().range([0, h])
    
    
    @line = (offset=0) -> d3.svg.line().x((d,i)->xScale(visibleDates[offset+i])).y((d)->yScale(d))    
    
    yAxis = d3.svg.axis().scale(yScale).ticks(6).orient("left");
    xAxis = d3.svg.axis().scale(xScale).tickSize(-h).tickSubdivide(true)

    g.append("svg:g").attr("class", "y axis").attr("transform", "translate(" + 0 + ",0)").call(yAxis);
    g.append("svg:g").attr("class", "x axis").attr("transform", "translate(0,"+h+")").call(xAxis);    
    g.append("svg:path").attr("d", @line()(visiblePrices))    
    @graph=g

  drawMa: (index) ->
    mapath = d3.select("path.ma"+index)
    if(mapath)
      mapath.remove()    
    @graph.append("svg:path").attr("d", @line()(@visible(@maSeries[index]))).attr("class", "ma" + index)      

  drawTrade: (trade) ->
    visiblePrices = @visible(@prices)
    oi = @rawToVis trade.openIndex    

    @graph.append("svg:path").attr("d", @line(oi)(@prices.slice(trade.openIndex,trade.closeIndex+1)),trade.openIndex).attr("class", "trade " + trade.direction.toLowerCase())      

  simulate: ->
    trades = window.TA.xover(@burnIn(),@rawdates,@prices,@maSeries[0],@maSeries[1],@get('long'),@get('short'))    
    trades = trades.filter( (t) => (@prices.length - t.openIndex) < @visibleCount() )
    @set('trades',trades)
    d3.selectAll("path.trade").remove()
    @drawTrade trade for trade in trades

          
  symbol: "MCD"
  capital: 10000
  trades: null
  
  long: true
  short: true

  longShortChanged: Ember.observer( ->
      @simulate() 
    ,"long", "short" ) 
    
  

  ma: [10, 85]

  mas: Ember.computed( (key,value)->
    if arguments.length == 1
      @ma
    else
      (if(value[i] != @ma[i]) then @setMa(i,value[i])) for i in [0,1]
    )
  
  years: 1
  yearsChanged: Ember.observer( ->
      @redraw()
  ,"years" ) 

  setMa: (index,value) ->
    @ma[index] = value
    @createMA index
    @drawMa index for index in [0,1]
    window.clearTimeout()
    window.setTimeout(@simulate.bind(this),100)    
)

