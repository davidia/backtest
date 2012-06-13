Backtest.Trade = Ember.Object.extend(
  open: (id,direction,i,d,p) ->
      @id = id
      @direction = direction
      @openPrice = p[i].toFixed(2)
      @openDate = d[i]              
      @openIndex = i  
      @sign = (if @direction == "Buy" then 1 else -1)
  close: (i,d,p) ->
    @closeIndex = i
    @closeDate = d[i]
    @closePrice = p[i].toFixed(2)
    @profit = (@sign *  (@closePrice - @openPrice)).toFixed(2)    
    @return = @profit / @openPrice
    @prettyReturn = (100 * @return).toFixed(2)
  )
