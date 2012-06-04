require 'open-uri'

class BacktestController < ApplicationController
  def index
  end

  #http://ichart.finance.yahoo.com/table.csv?s=GRPN&d=5&e=3&f=2012&g=d&a=10&b=4&c=2011&ignore=.csv
  def yahoo_url sym
    "http://ichart.finance.yahoo.com/table.csv?s=" + sym + "&d=5&e=3&f=2012&g=d&a=10&b=4&c=2011&ignore=.csv"
  end

  def closes
    symbol = params[:symbol]
    period = params[:period]
    dates = []
    prices = []
    rows = open(yahoo_url symbol).readlines
    rows.drop(1).each { |row| 
      elems = row.chomp.split(',')
      dates << elems[0]
      prices << elems[6].to_f     
    }

    render json: {dates: dates,prices: prices}
  end
end
