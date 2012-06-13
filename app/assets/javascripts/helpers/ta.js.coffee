window.Backtest.TALib =
  sma: (data,period) ->
      workingSet = [];
      results = [];
      for n in data
        workingSet.push(n)
        if(workingSet.length > period)
          workingSet.shift()
        results.push( (workingSet.reduce (s,t) -> s + t) /workingSet.length )
      return results
    xover: (burnin,dates,prices,ma1,ma2,long = true,short = false) ->  
      id = 0   
      states = _.zip(ma1,ma2).map((a) -> if a[0] > a[1] then 1 else -1 )
      position = 0      
      trades = states.reduce(
        (memo,e,i)=>
          if i < burnin then return memo
          if(position != 0 && position != e)
            position = 0
            t = memo[memo.length-1]
            t.close(i,dates,prices)            
          if (position == 0 && (if e == 1 then long else short))
            position = e
            t = Backtest.Trade.create()   
            t.open(id++,(if e == 1 then "Buy" else "Sell"),i,dates,prices)        
            memo.push(t)
          return memo
        ,[])
      
      #close out the last trade if it's still open
      if(position != 0)
        t = trades[trades.length-1]
        t.close(prices.length-1,dates,prices)            
      return trades
