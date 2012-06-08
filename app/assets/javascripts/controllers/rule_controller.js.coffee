

window.Backtest.ruleController = Ember.Object.create(
  fetch: ->       
    $.get('closes',{symbol: this.get('symbol'),years: this.get('years')},(data)=>
      @prices = data['prices']
      @rawdates = data['dates']

      parse = d3.time.format("%Y-%m-%d").parse;
      @dates = @rawdates.map(parse)
            
      @drawChart()
      @createMA i for i in [0,1]
      @drawMa i for i in [0,1]
      @simulate()
    )


  maSeries: [null,null]
  createMA: (index) ->
    @maSeries[index] = window.TA.sma(@prices,@ma[index])


  drawChart: ->
    d3.select("svg").remove()
    w0 = 960
    h0 = 300
    m = [20, 30, 20, 30]
    w = w0 - m[1] - m[3]
    h = h0 - m[0] - m[2]
    
    g = d3.select("#graph").append("svg:svg").attr("width", w0).attr("height", h0)
      .append("svg:g").attr("transform", "translate(" + m[3] + "," + m[0] + ")");
    xScale = d3.time.scale().domain([@dates[0],@dates[@dates.length-1]]).range([0, w])
    
    mx = _.max(@prices);
    mn = _.min(@prices);

    rng = mx-mn
    margin = rng * 0.1
    yScale = d3.scale.linear().domain([mx+margin,mn-margin]).nice().range([0, h])
    
    @line = d3.svg.line().x((d,i)->xScale(@dates[i])).y((d)->yScale(d))    
    @l2   = (o)-> d3.svg.line().x((d,i)=>xScale(@dates[i+o])).y((d)->yScale(d))    

    yAxis = d3.svg.axis().scale(yScale).ticks(6).orient("left");
    xAxis = d3.svg.axis().scale(xScale).tickSize(-h).tickSubdivide(true)

    g.append("svg:g").attr("class", "y axis").attr("transform", "translate(" + 0 + ",0)").call(yAxis);
    g.append("svg:g").attr("class", "x axis").attr("transform", "translate(0,"+h+")").call(xAxis);    
    g.append("svg:path").attr("d", @line @prices )    
    @graph=g

  drawMa: (index) ->
    mapath = d3.select("path.ma"+index)
    if(mapath)
      mapath.remove()    
    @graph.append("svg:path").attr("d", @line @maSeries[index]).attr("class", "ma" + index)      

  drawTrade: (trade) ->
    @graph.append("svg:path").attr("d", @l2(trade.openIndex) @prices.slice(trade.openIndex,trade.closeIndex),trade.openIndex).attr("class", "trade " + trade.direction.toLowerCase())      

  simulate: ->
    trades = window.TA.xover(@rawdates,@prices,@maSeries[0],@maSeries[1],@get('long'),@get('short'))
    @set('trades',trades)
    d3.selectAll("path.trade").remove()
    @drawTrade trade for trade in trades

          
  symbol: "GRPN"
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

  setMa: (index,value) ->
    @ma[index] = value
    @createMA index
    @drawMa index
    window.clearTimeout()
    window.setTimeout(@simulate.bind(this),100)    
)

