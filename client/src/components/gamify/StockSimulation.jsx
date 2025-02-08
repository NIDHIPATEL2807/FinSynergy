import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import axios from 'axios';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StockSimulation = () => {
  const [stockData, setStockData] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(100);
  const [wallet, setWallet] = useState(1000);
  const [shares, setShares] = useState(0);
  const [symbol, setSymbol] = useState('AAPL');
  const [timeInterval, setTimeInterval] = useState('1min');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [portfolioValue, setPortfolioValue] = useState(1000);
  const [quantity, setQuantity] = useState(1);
  const [transactions, setTransactions] = useState([]);
  const [stockInfo, setStockInfo] = useState(null);
  const [priceHistory, setPriceHistory] = useState([]);
  const [profitLoss, setProfitLoss] = useState(0);
  
  const API_KEY = '044LC3E7E374VFT4';

  const fetchStockData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${timeInterval}&apikey=${API_KEY}`
      );

      const timeSeriesData = response.data[`Time Series (${timeInterval})`];
      if (!timeSeriesData) {
        throw new Error('No data available');
      }

      const formattedData = Object.entries(timeSeriesData).map(([time, values]) => ({
        time,
        price: parseFloat(values['4. close'])
      })).reverse();

      setStockData(formattedData);
      setCurrentPrice(formattedData[formattedData.length - 1].price);
    } catch (err) {
      setError('Failed to fetch stock data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCompanyInfo = async () => {
    try {
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${API_KEY}`
      );
      setStockInfo(response.data);
    } catch (err) {
      console.error('Failed to fetch company info:', err);
    }
  };

  useEffect(() => {
    fetchStockData();
    fetchCompanyInfo();
    // Update portfolio value every second
    const portfolioInterval = setInterval(() => {
      setPortfolioValue(wallet + (shares * currentPrice));
    }, 1000);

    return () => clearInterval(portfolioInterval);
  }, [symbol, timeInterval]);

  // Buy shares
  const buyShares = () => {
    const totalCost = currentPrice * quantity;
    if (wallet >= totalCost) {
      setWallet(prev => prev - totalCost);
      setShares(prev => prev + quantity);
      setTransactions(prev => [...prev, {
        type: 'BUY',
        shares: quantity,
        price: currentPrice,
        total: totalCost,
        date: new Date().toLocaleString(),
      }]);
      updateProfitLoss();
    } else {
      alert("Not enough funds!");
    }
  };

  // Sell shares
  const sellShares = () => {
    if (shares >= quantity) {
      const totalReturn = currentPrice * quantity;
      setWallet(prev => prev + totalReturn);
      setShares(prev => prev - quantity);
      setTransactions(prev => [...prev, {
        type: 'SELL',
        shares: quantity,
        price: currentPrice,
        total: totalReturn,
        date: new Date().toLocaleString(),
      }]);
      updateProfitLoss();
    } else {
      alert("Not enough shares to sell!");
    }
  };

  // Add function to calculate profit/loss
  const updateProfitLoss = () => {
    const initialValue = 1000; // Starting wallet amount
    const currentValue = wallet + (shares * currentPrice);
    setProfitLoss(currentValue - initialValue);
  };

  // Chart configuration
  const chartData = {
    labels: stockData.map(data => new Date(data.time).toLocaleTimeString()),
    datasets: [
      {
        label: `${symbol} Stock Price`,
        data: stockData.map(data => data.price),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.1)',
        fill: true,
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Stock Price Simulation',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-4">Stock Market Simulation</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Trading Dashboard</h3>
            <div className="space-y-2">
              <input
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                className="border p-2 rounded w-full"
                placeholder="Enter stock symbol (e.g., AAPL)"
              />
              <select
                value={timeInterval}
                onChange={(e) => setTimeInterval(e.target.value)}
                className="border p-2 rounded w-full"
              >
                <option value="1min">1 Minute</option>
                <option value="5min">5 Minutes</option>
                <option value="15min">15 Minutes</option>
                <option value="30min">30 Minutes</option>
                <option value="60min">60 Minutes</option>
              </select>
              <button 
                onClick={fetchStockData}
                className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
              >
                Refresh Data
              </button>
            </div>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Portfolio Status</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-600">Current Price</p>
                <p className="text-2xl font-bold">${currentPrice?.toFixed(2)}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-600">Portfolio Value</p>
                <p className="text-2xl font-bold">${portfolioValue.toFixed(2)}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-600">Cash Available</p>
                <p className="text-2xl font-bold">${wallet.toFixed(2)}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-600">Shares Owned</p>
                <p className="text-2xl font-bold">{shares}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <button 
            onClick={buyShares}
            className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
          >
            Buy Shares
          </button>
          <button 
            onClick={sellShares}
            className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
          >
            Sell Shares
          </button>
        </div>
      </div>

      {stockInfo && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h3 className="text-xl font-semibold mb-4">Company Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Name: {stockInfo.Name}</p>
              <p className="text-sm text-gray-600">{stockInfo.Description}</p>
            </div>
            <div>
              <p>Sector: {stockInfo.Sector}</p>
              <p>Industry: {stockInfo.Industry}</p>
              <p>Market Cap: {stockInfo.MarketCapitalization}</p>
              <p>P/E Ratio: {stockInfo.PERatio}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-xl font-semibold mb-4">Transaction History</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shares</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction, index) => (
                <tr key={index} className={transaction.type === 'BUY' ? 'text-green-600' : 'text-red-600'}>
                  <td className="px-6 py-4 whitespace-nowrap">{transaction.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{transaction.shares}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${transaction.price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${transaction.total.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{transaction.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-xl font-semibold mb-4">Performance Metrics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600">Total Profit/Loss</p>
            <p className={`text-2xl font-bold ${profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${profitLoss.toFixed(2)}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600">Return on Investment</p>
            <p className={`text-2xl font-bold ${profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {((profitLoss / 1000) * 100).toFixed(2)}%
            </p>
          </div>
        </div>
      </div>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default StockSimulation;
