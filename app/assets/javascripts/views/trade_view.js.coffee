window.Backtest.TradeView = Ember.View.extend(
  templateName: 'templates/trade'
  classNameBindings: 'content.direction'
	mouseEnter: (evt) ->
    id = @get('content').id
    $('#path'+id).addClass('selected')

  mouseLeave: (evt) ->
    id = @get('content').id
    $('#path'+id).removeClass('selected')
)