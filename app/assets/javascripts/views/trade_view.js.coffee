window.Backtest.TradeView = Ember.View.extend(
  templateName: 'templates/trade'
	mouseEnter: (evt) ->
    id = @get('content').id
    $('#path'+id).addClass('selected')

  mouseLeave: (evt) ->
    id = @get('content').id
    $('#path'+id).removeClass('selected')
)