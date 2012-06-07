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
    xover: (dates,prices,ma1,ma2) ->     
      states = _.zip(ma1,ma2).map (a)-> a[0] > a[1]      
      position = 0      
      trades = states.reduce(
        (memo,e,i)->
          if(position == 1 && !e)
            position = 0
            t = memo[memo.length-1]
            t.closePrice = prices[i].toFixed(2)
            t.closeDate = dates[i]
            t.profit = (t.closePrice - t.openPrice).toFixed(2)
          if(position != 1 && e)
            position = 1
            memo.push(
              openPrice: prices[i].toFixed(2)
              openDate: dates[i]              
              )
          return memo
        ,[])
      
      #close out the last trade if it's still open
      if(position == 1)
        t = trades[trades.length-1]
        t.closePrice = prices[prices.length-1]
        t.closeDate = dates[prices.length-1]
        t.profit = (t.closePrice - t.openPrice).toFixed(2)
      return trades

$(document).ready ->
  stateManager.send('ready')
  view.append()
  view.fetch()



