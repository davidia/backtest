

window.Backtest.MainView = Ember.View.extend({
  templateName: 'templates/mainview'
  controller: null
  symbolBinding: 'controller.symbol'
  periodBinding: 'controller.period'
  fetch: () -> this.get('controller').fetch()
});