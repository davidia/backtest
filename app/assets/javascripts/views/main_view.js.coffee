
window.Backtest.MainView = Ember.View.extend(
  templateName: 'templates/mainview'
  controller: null
  symbolBinding: 'controller.symbol'
  
  didInsertElement: -> $('form').submit( ->false)

  ma1: Ember.computed( (key, value) ->
    if arguments.length == 1
      @mas[0]
    else
      if !isNaN(v=parseInt(value))
        @set("mas",[v , @mas[1]])
  ).property('mas.@each')

  ma2: Ember.computed( (key, value) ->
    if arguments.length == 1
      @mas[1]
    else
      if !isNaN(v=parseInt(value))
        @set("mas",[@mas[0],v])
  ).property('mas.@each')



  masBinding: 'controller.mas'

  
  tradesBinding: 'controller.trades'
  capitalBinding: 'controller.capital'
  yearsBinding: 'controller.years'
  

  sliding:false
 
  profit: Ember.computed( ->
    trades = this.get('trades')
    capital = this.get('capital')
    if ! trades? then return null
    return Math.round( trades.reduce((s,t) ->         
        s * (1 + t.return)
      ,capital) - capital)
  ).property('trades.@each.profit','capital') 

  profitPercent: Ember.computed( ->
    profit = this.get('profit')
    capital = this.get('capital')
    return if profit? then (100*profit/capital).toFixed(1) + "%" else ""
  ).property('profit','capital') 

  tradeCount: Ember.computed( ->
    trades = this.get('trades')
    if ! trades? then return null
    return trades.length
  ).property('trades.@each') 

  profitPerTrade: Ember.computed( ->
    tradeCount = this.get('tradeCount')
    profit = this.get('profit')
    return  if profit? then (profit / tradeCount).toFixed(2) else ""
  ).property('profit','tradeCount') 
   
  showTrades: ->
    view = Backtest.TradeListView.create(
      controller: @controller
      tradesBinding: 'controller.trades'
    ).appendTo('#tradeList')

  fetch: () -> this.get('controller').fetch()
)