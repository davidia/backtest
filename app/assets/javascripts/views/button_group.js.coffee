# window.Backtest.ButtonGroupView = Ember.View.extend(
#   controller: null
#   valueBinding: 'controller.years'  
#   # content: [1,2,3,4,5]
#   # itemViewClass: Ember.View.extend(
#   #   template: Ember.Handlebars.compile("{{content}}")
#   #   tagName: 'button'
#   #   classNames: ['my-class', 'btn']
#   #   )
#   classNames: ['btn-group']
# )

window.Backtest.ButtonView = Ember.View.extend(
  tagName: 'button'
  classNames: ['btn']
  templateName: 'templates/button'

  click: (evt) -> @get('parentView').set("years",@val)
  # yearsChanged: Ember.observer( ->
  #    years = @get('parentView').get("years",@val)
  #    if(years == @val)
  #     $().addClass('active')
  #  , 'parentView.years')

)


