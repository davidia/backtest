# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/


//= require_tree ./models
//= require_tree ./controllers
//= require_tree ./views
//= require_tree ./helpers
//= require_tree ./templates
//= require_tree ./states
//= require_self

# Backtest.stateManager is useful for debugging,
#but don't use it directly in application code.
Backtest = window.Backtest
stateManager = Backtest.stateManager = Backtest.StateManager.create();
Backtest.initialize(stateManager);



view = Backtest.MainView.create(
  controller: Backtest.ruleController
)

class Trade
  constructor: (direction,i,d,p) ->
      @direction = direction
      @openPrice = p[i].toFixed(2)
      @openDate = d[i]              
      @openIndex = i  
      @sign = (if @direction == "Buy" then 1 else -1)
  close: (i,d,p) ->
    @closeIndex = i
    @closeData = d[i]
    @closePrice = p[i].toFixed(2)
    @profit = (@sign * (@closePrice - @openPrice)).toFixed(2)

window.TA =


  sma: (data,period) ->
      workingSet = [];
      results = [];
      for n in data
        workingSet.push(n)
        if(workingSet.length > period)
          workingSet.shift()
        results.push( (workingSet.reduce (s,t) -> s + t) /workingSet.length )
      return results
    xover: (dates,prices,ma1,ma2,long = true,short = false) ->     
      states = _.zip(ma1,ma2).map((a) -> if a[0] > a[1] then 1 else -1 )
      position = 0      
      trades = states.reduce(
        (memo,e,i)=>
          if(position != 0 && position != e)
            position = 0
            t = memo[memo.length-1]
            t.close(i,dates,prices)            
          if (position == 0 && (if e == 1 then long else short))
            position = e            
            memo.push(new Trade((if e == 1 then "Buy" else "Sell"),i,dates,prices))
          return memo
        ,[])
      
      #close out the last trade if it's still open
      if(position != 0)
        t = trades[trades.length-1]
        t.close(prices.length-1,dates,prices)            
      return trades

$(document).ready ->
  stateManager.send('ready')
  view.append()
  view.fetch()



