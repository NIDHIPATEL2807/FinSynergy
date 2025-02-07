import React, { useState } from 'react';

const StockTicker = () => {
  const [stocks] = useState([
    { symbol: 'AAPL', price: '175.84', change: '+2.34' },
    { symbol: 'GOOGL', price: '2934.65', change: '-1.23' },
    { symbol: 'MSFT', price: '338.11', change: '+1.56' },
    { symbol: 'AMZN', price: '3456.78', change: '+4.21' }
  ]);

  return (
    <div className="bg-gray-900 text-white py-2 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {stocks.map((stock, index) => (
          <div key={index} className="mx-8">
            <span className="font-bold">{stock.symbol}</span>
            <span className="mx-2">${stock.price}</span>
            <span className={stock.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}>
              {stock.change}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockTicker;
