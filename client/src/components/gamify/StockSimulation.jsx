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
    <div className="min-h-screen p-6 bg-teal-950" 
    // style={{ backgroundColor: '#33372C' }}
    >
  <div className="max-w-7xl mx-auto space-y-6">
    {/* Header Section */}
    <div className="rounded-xl p-6 bg-teal-900 " 
    // style={{ backgroundColor: '#FF885B' }}
    >
      <h1 className="text-3xl font-bold text-white mb-6">Stock Market Simulation</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          className="rounded-lg p-2 bg-white/10 text-white border border-white/20"
          placeholder="Enter stock symbol (e.g., AAPL)"
        />
        <select
          value={timeInterval}
          onChange={(e) => setTimeInterval(e.target.value)}
          className="rounded-lg p-2 bg-white/10 text-white border border-white/20"
        >
          <option value="1min">1 Minute</option>
          <option value="5min">5 Minutes</option>
          <option value="15min">15 Minutes</option>
          <option value="30min">30 Minutes</option>
          <option value="60min">60 Minutes</option>
        </select>
        <button 
          onClick={fetchStockData}
          className="rounded-lg p-2 font-semibold transition-colors duration-200"
          style={{ backgroundColor: '#FF885B', color: '#FFE5CF' }}
        >
          Refresh Data
        </button>
      </div>
    </div>

    {/* Main Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Chart Section */}
      <div className="lg:col-span-8 rounded-xl p-6" style={{ backgroundColor: '#A0C878' }}>
        <Line data={chartData} options={{
          ...chartOptions,
          plugins: {
            ...chartOptions.plugins,
            legend: {
              ...chartOptions.plugins.legend,
              labels: { color: '#143D60' }
            }
          },
          scales: {
            y: {
              grid: { color: 'rgba(20,61,96,0.2)' },
              ticks: { color: '#143D60' }
            },
            x: {
              grid: { color: 'rgba(20,61,96,0.2)' },
              ticks: { color: '#143D60' }
            }
          }
        }} />
      </div>

      {/* Trading Section */}
      <div className="lg:col-span-4 space-y-6">
        <div className="rounded-xl p-6" style={{ backgroundColor: '#DDEB9D' }}>
          <h3 className="text-xl font-semibold text-black mb-4">Trading</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-black mb-2">Quantity</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                className="w-full rounded-lg p-2 bg-white/10 text-black border border-black/20"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={buyShares}
                className="p-2 rounded-lg font-semibold text-white transition-opacity duration-200 hover:opacity-90"
                style={{ backgroundColor: '#557C56' }}
              >
                Buy
              </button>
              <button 
                onClick={sellShares}
                className="p-2 rounded-lg font-semibold text-white transition-opacity duration-200 hover:opacity-90"
                style={{ backgroundColor: '#27667B' }}
              >
                Sell
              </button>
            </div>
          </div>
        </div>

        {/* Portfolio Status */}
        <div className="rounded-xl p-6" style={{ backgroundColor: '#A0C878' }}>
          <h3 className="text-xl font-semibold text-white mb-4">Portfolio Status</h3>
          <div className="grid gap-4">
            <div className="p-4 rounded-lg bg-white/10">
              <p className="text-white/60">Current Price</p>
              <p className="text-2xl font-bold text-white">${currentPrice?.toFixed(2)}</p>
            </div>
            <div className="p-4 rounded-lg bg-white/10">
              <p className="text-white/60">Portfolio Value</p>
              <p className="text-2xl font-bold text-white">${portfolioValue.toFixed(2)}</p>
            </div>
            <div className="p-4 rounded-lg bg-white/10">
              <p className="text-white/60">Cash Available</p>
              <p className="text-2xl font-bold text-white">${wallet.toFixed(2)}</p>
            </div>
            <div className="p-4 rounded-lg bg-white/10">
              <p className="text-white/60">Shares Owned</p>
              <p className="text-2xl font-bold text-white">{shares}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Company Info */}
      {stockInfo && (
        <div className="lg:col-span-12 rounded-xl p-6" style={{ backgroundColor: '#557C56' }}>
          <h3 className="text-xl font-semibold text-white mb-4">Company Information</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2 text-white">
              <p className="font-medium">Name: {stockInfo.Name}</p>
              <p className="text-white/70">{stockInfo.Description}</p>
            </div>
            <div className="space-y-2 text-white">
              <p>Sector: {stockInfo.Sector}</p>
              <p>Industry: {stockInfo.Industry}</p>
              <p>Market Cap: {stockInfo.MarketCapitalization}</p>
              <p>P/E Ratio: {stockInfo.PERatio}</p>
            </div>
          </div>
        </div>
      )}

      {/* Transaction History */}
      <div className="lg:col-span-12 rounded-xl p-6" style={{ backgroundColor: '#27667B' }}>
        <h3 className="text-xl font-semibold text-white mb-4">Transaction History</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-white/60 border-b border-white/10">
                <th className="text-left p-4">Type</th>
                <th className="text-left p-4">Shares</th>
                <th className="text-left p-4">Price</th>
                <th className="text-left p-4">Total</th>
                <th className="text-left p-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index} className="text-white border-b border-white/10">
                  <td className="p-4">{transaction.type}</td>
                  <td className="p-4">{transaction.shares}</td>
                  <td className="p-4">${transaction.price.toFixed(2)}</td>
                  <td className="p-4">${transaction.total.toFixed(2)}</td>
                  <td className="p-4">{transaction.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>




  );
};

export default StockSimulation;




