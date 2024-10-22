
window.Backtest.JQWidget = Em.Mixin.create(
  didInsertElement: ->
    options = @_gatherOptions()
    @_gatherEvents options
    ui = jQuery.ui[@get("uiType")](options, @get("element"))
    @set "ui", ui

  willDestroyElement: ->
    ui = @get("ui")
    if ui
      observers = @_observers
      for prop of observers
        @removeObserver prop, observers[prop]  if observers.hasOwnProperty(prop)
      ui._destroy()

  _gatherOptions: ->
    uiOptions = @get("uiOptions")
    options = {}
    uiOptions.forEach ((key) ->
      options[key] = @get(key)
      observer = ->
        value = @get(key)
        @get("ui")._setOption key, value

      @addObserver key, observer
      @_observers = @_observers or {}
      @_observers[key] = observer
    ), this
    options

  _gatherEvents: (options) ->
    uiEvents = @get("uiEvents") or []
    self = this
    uiEvents.forEach (event) ->
      callback = self[event]
      if callback
        options[event] = (event, ui) ->
          callback.call self, event, ui
)

window.Backtest.SliderView = Em.View.extend(window.Backtest.JQWidget,
  uiType: "slider"
  min: 1
  max: 100 
  range: true
  #softMin: null
  uiOptions: ["values", "min", "max","range" ]
  uiEvents: [ "slide","start","stop" ]  
  tagName: "div"
  sliding: false

  didInsertElement: ->
    this._super()
    h = $('.ui-slider-handle')
    h.first().addClass('m0-handle')
    h.last().addClass('m1-handle')

  start: ( event, ui ) -> @set('sliding',true)
  stop: ( event, ui ) -> @set('sliding',false)



  slide: ( event, ui ) ->
    v = ui.values 
    # softMin = @get('softMin')
    # if(softMin && v <= softMin )
    #   v=softMin
    @set('values',v)
)

