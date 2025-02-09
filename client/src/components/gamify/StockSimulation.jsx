




import React, { useState, useEffect } from 'react';
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

const StockSimulation = ({ wallet, setWallet }) => {
  const commonStocks = [
    { symbol: 'AAPL', name: 'Apple Inc.' },
    { symbol: 'MSFT', name: 'Microsoft Corporation' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.' },
    { symbol: 'META', name: 'Meta Platforms Inc.' },
    { symbol: 'TSLA', name: 'Tesla Inc.' },
    { symbol: 'NVDA', name: 'NVIDIA Corporation' },
    { symbol: 'JPM', name: 'JPMorgan Chase & Co.' },
    { symbol: 'WMT', name: 'Walmart Inc.' },
    { symbol: 'KO', name: 'The Coca-Cola Company' }
  ];

  const [stockData, setStockData] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(100);
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
  
  const API_KEY = 'BYAAMCG2XCFBLI6V';

  const getCompanyMockData = (symbol) => {
    const mockCompanyData = {
      'AAPL': {
        Name: 'Apple Inc.',
        Description: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. The company offers iPhone, Mac, iPad, and Wearables, Home and Accessories.',
        Sector: 'Technology',
        Industry: 'Consumer Electronics',
        MarketCapitalization: '2.5T',
        PERatio: '28.5'
      },
      'MSFT': {
        Name: 'Microsoft Corporation',
        Description: 'Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide. The company operates through cloud computing, software licensing, and hardware manufacturing.',
        Sector: 'Technology',
        Industry: 'Software Infrastructure',
        MarketCapitalization: '2.8T',
        PERatio: '32.1'
      },
      'GOOGL': {
        Name: 'Alphabet Inc.',
        Description: 'Alphabet Inc. provides various products and platforms in the areas of search, advertising, operating systems, enterprise, and hardware. The company operates through Google Services, Google Cloud, and Other Bets.',
        Sector: 'Technology',
        Industry: 'Internet Content & Information',
        MarketCapitalization: '1.9T',
        PERatio: '25.8'
      },
      'AMZN': {
        Name: 'Amazon.com Inc.',
        Description: 'Amazon.com Inc. is a leading e-commerce and cloud computing company. It operates through e-commerce, AWS cloud services, and innovative technology solutions.',
        Sector: 'Consumer Cyclical',
        Industry: 'Internet Retail',
        MarketCapitalization: '1.75T',
        PERatio: '30.2'
      },
      'META': {
        Name: 'Meta Platforms Inc.',
        Description: 'Meta Platforms Inc. (formerly Facebook) builds technologies that help people connect, find communities, and grow businesses. The company focuses on social media, virtual reality, and the metaverse.',
        Sector: 'Technology',
        Industry: 'Internet Content & Information',
        MarketCapitalization: '1.2T',
        PERatio: '27.3'
      },
      'DEFAULT': {
        Name: `${symbol} Corporation`,
        Description: `${symbol} is a publicly traded company operating in various sectors. The company focuses on innovation and growth in its market segments.`,
        Sector: 'Technology',
        Industry: 'General Technology',
        MarketCapitalization: '500B',
        PERatio: '25.0'
      }
    };

    return mockCompanyData[symbol] || mockCompanyData['DEFAULT'];
  };

  const generateMockData = () => {
    const mockData = [];
    const basePrice = 100;
    const now = new Date();
    
    for (let i = 0; i < 50; i++) {
      const time = new Date(now - (i * 60000));
      const randomChange = (Math.random() - 0.5) * 2;
      const price = basePrice + (randomChange * 10);
      
      mockData.unshift({
        time: time.toISOString(),
        price: parseFloat(price.toFixed(2))
      });
    }
    
    return mockData;
  };

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const fetchWithRetry = async (url, retries = 3, delayMs = 2000) => {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await axios.get(url);
        if (response.data['Note']) {
          throw new Error('API call frequency limit reached');
        }
        return response;
      } catch (err) {
        if (i === retries - 1) throw err;
        await delay(delayMs);
      }
    }
  };

  const fetchStockData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetchWithRetry(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${timeInterval}&apikey=${API_KEY}`
      );

      if (response.data['Note']) {
        setError('API rate limit reached. Using simulated data.');
        const mockData = generateMockData();
        setStockData(mockData);
        setCurrentPrice(mockData[mockData.length - 1].price);
        return;
      }

      const timeSeriesData = response.data[`Time Series (${timeInterval})`];
      if (!timeSeriesData) {
        setError(`Using simulated data for ${symbol}`);
        const mockData = generateMockData();
        setStockData(mockData);
        setCurrentPrice(mockData[mockData.length - 1].price);
        return;
      }

      const formattedData = Object.entries(timeSeriesData).map(([time, values]) => ({
        time,
        price: parseFloat(values['4. close'])
      })).reverse();

      setStockData(formattedData);
      setCurrentPrice(formattedData[formattedData.length - 1].price);
    } catch (err) {
      setError(`Using simulated data: ${err.message}`);
      const mockData = generateMockData();
      setStockData(mockData);
      setCurrentPrice(mockData[mockData.length - 1].price);
    } finally {
      setLoading(false);
    }
  };

  const fetchCompanyInfo = async () => {
    try {
      setLoading(true);
      const mockData = getCompanyMockData(symbol);
      setStockInfo(mockData);
      setError('Using simulated company data.');
    } catch (err) {
      const mockData = getCompanyMockData(symbol);
      setStockInfo(mockData);
      setError('Using simulated company data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (symbol) {
      setStockInfo(getCompanyMockData(symbol));
      fetchStockData();
      fetchCompanyInfo();
    }
  }, [symbol]);

  useEffect(() => {
    const portfolioInterval = setInterval(() => {
      setPortfolioValue(wallet + (shares * currentPrice));
      updateProfitLoss();
    }, 1000);

    return () => clearInterval(portfolioInterval);
  }, [wallet, shares, currentPrice]);

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

  const updateProfitLoss = () => {
    const initialValue = 1000;
    const currentValue = wallet + (shares * currentPrice);
    setProfitLoss(currentValue - initialValue);
  };

  const chartData = {
    labels: stockData.map(data => new Date(data.time).toLocaleTimeString()),
    datasets: [
      {
        label: `${symbol} Stock Price`,
        data: stockData.map(data => data.price),
        borderColor: 'rgb(200, 60, 19)',
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
    <div className="p-4 max-w-9xl mx-auto bg-teal-950 min-h-screen font-satoshi ">

<h2 className="text-6xl text-centre font-satoshi font-bold mb-4 text-amber-100">Stock Market Simulation</h2>
      {error && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
          <p>{error}</p>
        </div>
      )}
      
      
      <div className="bg-teal-800 p-4 rounded-lg mb-4">
        <h3 className='text-white font-bold pb-2'>Search Stock</h3>
        <div className="grid grid-cols-3 gap-4">
          <select
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="bg-teal-600 text-white p-2 rounded w-full"
          >
            {commonStocks.map((stock) => (
              <option key={stock.symbol} value={stock.symbol}>
                {stock.symbol} - {stock.name}
              </option>
            ))}
          </select>
          <select
            value={timeInterval}
            onChange={(e) => setTimeInterval(e.target.value)}
            className="bg-teal-600 text-white p-2 rounded"
          >
            <option value="1min">1 Minute</option>
            <option value="5min">5 Minutes</option>
            <option value="15min">15 Minutes</option>
            <option value="30min">30 Minutes</option>
            <option value="60min">60 Minutes</option>
          </select>
          <button 
            onClick={fetchStockData}
            className="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-500"
          >
            Refresh Data
          </button>
        </div>
      </div>



      <div className="grid grid-cols-3 gap-4 mb-9">
        <div className="col-span-2 ">
          <div className="bg-lime-500 p-4 rounded-lg h-96 text-white">
            <Line className='text-white' data={chartData} options={chartOptions} />
          </div>

          <div className="bg-teal-800 p-4 rounded-lg mt-4 mb-2">
        <h3 className="text-lg font-semibold text-white mb-2">Company Information</h3>
        <div className="grid grid-cols-2 gap-4 text-white">
          <div>
            <p><span className="text-gray-300">Name:</span> {stockInfo?.Name}</p>
            <p className="text-sm text-gray-300 mt-2">{stockInfo?.Description}</p>
          </div>
          <div className="space-y-2">
            <p><span className="text-gray-300">Sector:</span> {stockInfo?.Sector}</p>
            <p><span className="text-gray-300">Industry:</span> {stockInfo?.Industry}</p>
            <p><span className="text-gray-300">Market Cap:</span> {stockInfo?.MarketCapitalization}</p>
            <p><span className="text-gray-300">P/E Ratio:</span> {stockInfo?.PERatio}</p>
          </div>
        </div>
      </div>


        </div>
        
        
        <div className="space-y-10">
          <div className="bg-yellow-100 p-5 pb-9 rounded-lg">
            <h3 className="text-lg font-semibold text-stone-900 mb-4">Trading</h3>
            <div className="space-y-4">
              <label className="block text-stone-900">Quantity</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                className="w-full p-2 rounded bg-amber-600 text-white"
              />
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={buyShares}
                  className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-600"
                >
                  Buy
                </button>
                <button 
                  onClick={sellShares}
                  className="bg-teal-800 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Sell
                </button>
              </div>
            </div>
          </div>

          <div className="bg-lime-500 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-stone-900 mb-4">Portfolio Status</h3>
            <div className="space-y-2">
              <div>
                <p className="text-gray-950">Current Price</p>
                <p className="text-xl font-bold text-stone-800">${currentPrice?.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-gray-950">Portfolio Value</p>
                <p className="text-xl font-bold text-stone-800">${portfolioValue.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-gray-950">Cash Available</p>
                <p className="text-xl font-bold text-stone-800">${wallet.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-gray-950">Shares Owned</p>
                <p className="text-xl font-bold text-stone-800">{shares}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

     

      <div className="bg-amber-600/80 p-4 rounded-lg mt-0">
        <h3 className="text-lg font-semibold text-white mb-4">Transaction History</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-white">
            <thead>
              <tr className="text-left">
                <th className="p-2">Type</th>
                <th className="p-2">Shares</th>
                <th className="p-2">Price</th>
                <th className="p-2">Total</th>
                <th className="p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index} className="border-t ">
                  <td className="p-2">{transaction.type}</td>
                  <td className="p-2">{transaction.shares}</td>
                  <td className="p-2">${transaction.price.toFixed(2)}</td>
                  <td className="p-2">${transaction.total.toFixed(2)}</td>
                  <td className="p-2">{transaction.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StockSimulation;


