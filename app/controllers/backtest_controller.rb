require 'open-uri'

class BacktestController < ApplicationController
  def index
  end

  #http://ichart.finance.yahoo.com/table.csv?s=GRPN&d=5&e=3&f=2012&g=d&a=10&b=4&c=2011&ignore=.csv
  def yahoo_url sym,years
    today = Date.today    
    month = today.month - 1
    day   = today.day - 1
    year  = today.year
    startyear = year - years.to_i
    
    "http://ichart.finance.yahoo.com/table.csv?s=%s&d=%d&e=%d&f=%d&g=d&a=%d&b=%d&c=%d&ignore=.csv" %
    [sym,month,day,year,month,day,startyear]
  end

  def closes
    symbol = params[:symbol]
    years = params[:years]
    dates = []
    prices = []
    rows = open(yahoo_url(symbol,years)).readlines
    rows.drop(1).each { |row| 
      elems = row.chomp.split(',')
      dates << elems[0]
      prices << elems[6].to_f     
    }

    render json: {dates: dates,prices: prices}
  end
end
