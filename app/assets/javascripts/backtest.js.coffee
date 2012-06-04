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
      console.log(data)
      console.log(period)
      for n in data
      	workingSet.push(n)
      	if(workingSet.length > period)
      		workingSet.shift()
      	results.push( (workingSet.reduce (s,t) -> s + t) /workingSet.length )
      return results
    xover: (s1,s2) ->
    	changes    	    
    	states = _.zip(s1,s2).map (a)-> a[0] > a[1]
    	s = states.shift
    	i = 1
    	states.reduce(
    		(memo,e,i)->
    			if(s != e)
    				s=e
    				memo.push(
    					cross: s
    					index: i
    					)
    		,[])
    	
console.log(view)
jQuery( ->
  stateManager.send('ready');
  view.append()
);

