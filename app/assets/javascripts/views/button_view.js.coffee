window.Backtest.ButtonView = Ember.View.extend(
  didInsertElement: ->
    if @get('val') == @get('parentView').get('years')
      @set('active',true)

  classNameBindings: 'active'
  classNames: ['btn']
  tagName: 'button'
  
  templateName: 'templates/button'
  click: (evt) -> @get('parentView').set("years",@val)
)


