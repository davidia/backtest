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





# Loading the app...
# things to do
# 1. connect to window history for keeping URL up to date

History = window.History
  # return false  unless History.enabled
History.Adapter.bind window, "statechange", ->
State = History.getState()
History.log State.data, State.title, State.url
  
vars = {}
hashes = window.location.href.slice(window.location.href.indexOf("?") + 1).split("&")
i = 0    
while i < hashes.length
  hash = hashes[i].split("=")
  k = hash[0]
  v = hash[1]    
    
  if v.indexOf(',') > -1
    v = v.split(',').map((x) ->
        parseInt(x)
      )
  else if !isNaN(parseInt v)
    v = parseInt(v)  
  if v == 'true' then v = true
  if v == 'false' then v = false  
  vars[k] = v
  i++

for key,value in vars
  delete vars.key unless (Backtest.RuleController.params.indexOf(key) != -1 and value)

c = Backtest.RuleController.create(vars)

# Create the main view

view = Backtest.MainView.create(
  controller: c
)

$(document).ready ->
  view.appendTo('#main')
  view.fetch()
  



