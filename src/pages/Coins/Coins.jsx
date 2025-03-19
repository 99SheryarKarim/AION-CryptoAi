"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import "../Coins/Coins.css"

const Coins = () => {
  const [activeTab, setActiveTab] = useState("crypto")
  const [activeStockTab, setActiveStockTab] = useState("tech")
  const [cryptoData, setCryptoData] = useState([])
  const [techStocks, setTechStocks] = useState([])
  const [oilGasStocks, setOilGasStocks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [retry, setRetry] = useState(0)

  // Tech stock symbols
  const techSymbols = [
    "AAPL",
    "MSFT",
    "GOOGL",
    "AMZN",
    "META",
    "NVDA",
    "TSLA",
    "ADBE",
    "CRM",
    "INTC",
    "AMD",
    "PYPL",
    "NFLX",
    "CSCO",
    "ORCL",
    "IBM",
    "QCOM",
    "UBER",
    "SHOP",
    "SNAP",
  ]

  // Oil and Gas stock symbols
  const oilGasSymbols = [
    "XOM",
    "CVX",
    "COP",
    "BP",
    "SHEL",
    "TTE",
    "SLB",
    "EOG",
    "PXD",
    "OXY",
    "MPC",
    "PSX",
    "VLO",
    "KMI",
    "WMB",
    "ET",
    "ENB",
    "HAL",
    "BKR",
    "DVN",
  ]

  // Generate a consistent color based on stock symbol
  const getStockColor = (symbol) => {
    // Simple hash function to generate a color
    let hash = 0
    for (let i = 0; i < symbol.length; i++) {
      hash = symbol.charCodeAt(i) + ((hash << 5) - hash)
    }

    // Convert to hex color
    let color = "#"
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff
      color += ("00" + value.toString(16)).substr(-2)
    }

    return color
  }

  // Fetch cryptocurrency data
  const fetchCryptoData = async (retries = 3) => {
    try {
      console.log("Fetching crypto data...")
      setLoading(true)

      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false",
      )

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()

      if (!Array.isArray(data) || data.length === 0) {
        throw new Error("Invalid or empty data received.")
      }

      setCryptoData(data)
      setLoading(false)
      setError(null)
    } catch (err) {
      console.error("Error fetching crypto data:", err.message)

      if (retries > 0) {
        console.log(`Retrying in 2 seconds... (${3 - retries + 1}/3)`)
        setTimeout(() => fetchCryptoData(retries - 1), 2000)
      } else {
        setError("Failed to fetch cryptocurrency data. Please try again later.")
        setLoading(false)
      }
    }
  }

  // Fetch stock data (mock data for demonstration)
  // In a real application, you would use a stock API like Alpha Vantage or Yahoo Finance
  const fetchStockData = async () => {
    try {
      setLoading(true)

      // Simulating API call with mock data
      // This would be replaced with actual API calls in production
      const mockTechStocks = techSymbols.map((symbol, index) => ({
        id: `tech-${index}`,
        symbol: symbol,
        name: getTechStockName(symbol),
        current_price: Math.random() * 1000 + 50,
        price_change_percentage_24h: Math.random() * 10 - 5,
        color: getStockColor(symbol),
      }))

      const mockOilGasStocks = oilGasSymbols.map((symbol, index) => ({
        id: `oil-${index}`,
        symbol: symbol,
        name: getOilGasStockName(symbol),
        current_price: Math.random() * 200 + 20,
        price_change_percentage_24h: Math.random() * 8 - 4,
        color: getStockColor(symbol),
      }))

      setTechStocks(mockTechStocks)
      setOilGasStocks(mockOilGasStocks)
      setLoading(false)
      setError(null)
    } catch (err) {
      console.error("Error fetching stock data:", err.message)
      setError("Failed to fetch stock data. Please try again later.")
      setLoading(false)
    }
  }

  // Helper function to get tech stock names
  const getTechStockName = (symbol) => {
    const names = {
      AAPL: "Apple Inc.",
      MSFT: "Microsoft Corp.",
      GOOGL: "Alphabet Inc.",
      AMZN: "Amazon.com Inc.",
      META: "Meta Platforms Inc.",
      NVDA: "NVIDIA Corp.",
      TSLA: "Tesla Inc.",
      ADBE: "Adobe Inc.",
      CRM: "Salesforce Inc.",
      INTC: "Intel Corp.",
      AMD: "Advanced Micro Devices",
      PYPL: "PayPal Holdings Inc.",
      NFLX: "Netflix Inc.",
      CSCO: "Cisco Systems Inc.",
      ORCL: "Oracle Corp.",
      IBM: "IBM Corp.",
      QCOM: "Qualcomm Inc.",
      UBER: "Uber Technologies Inc.",
      SHOP: "Shopify Inc.",
      SNAP: "Snap Inc.",
    }
    return names[symbol] || symbol
  }

  // Helper function to get oil & gas stock names
  const getOilGasStockName = (symbol) => {
    const names = {
      XOM: "Exxon Mobil Corp.",
      CVX: "Chevron Corp.",
      COP: "ConocoPhillips",
      BP: "BP plc",
      SHEL: "Shell plc",
      TTE: "TotalEnergies SE",
      SLB: "Schlumberger Ltd.",
      EOG: "EOG Resources Inc.",
      PXD: "Pioneer Natural Resources",
      OXY: "Occidental Petroleum",
      MPC: "Marathon Petroleum",
      PSX: "Phillips 66",
      VLO: "Valero Energy Corp.",
      KMI: "Kinder Morgan Inc.",
      WMB: "Williams Companies Inc.",
      ET: "Energy Transfer LP",
      ENB: "Enbridge Inc.",
      HAL: "Halliburton Co.",
      BKR: "Baker Hughes Co.",
      DVN: "Devon Energy Corp.",
    }
    return names[symbol] || symbol
  }

  // Fetch data based on active tab
  useEffect(() => {
    if (activeTab === "crypto") {
      fetchCryptoData()
    } else {
      fetchStockData()
    }
  }, [activeTab, retry])

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  // Handle stock tab change
  const handleStockTabChange = (tab) => {
    setActiveStockTab(tab)
  }

  // Get current stock data based on active stock tab
  const getCurrentStockData = () => {
    return activeStockTab === "tech" ? techStocks : oilGasStocks
  }

  // Render stock icon
  const renderStockIcon = (stock) => {
    return (
      <div className="stock-icon" style={{ backgroundColor: stock.color }}>
        {stock.symbol.substring(0, 2)}
      </div>
    )
  }

  return (
    <div className="market-section">
      {/* <motion.h1
        className="market-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Market Data
      </motion.h1> */}

      {/* Main Tabs */}
      <div className="market-tabs">
        <motion.button
          className={`tab-button ${activeTab === "crypto" ? "active" : ""}`}
          onClick={() => handleTabChange("crypto")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Cryptocurrencies
        </motion.button>
        <motion.button
          className={`tab-button ${activeTab === "stocks" ? "active" : ""}`}
          onClick={() => handleTabChange("stocks")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Stocks
        </motion.button>
      </div>

      {/* Stock Sub-Tabs (only visible when stocks tab is active) */}
      <AnimatePresence>
        {activeTab === "stocks" && (
          <motion.div
            className="stock-tabs"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className={`stock-tab-button ${activeStockTab === "tech" ? "active" : ""}`}
              onClick={() => handleStockTabChange("tech")}
            >
              Top 20 Tech
            </button>
            <button
              className={`stock-tab-button ${activeStockTab === "oilgas" ? "active" : ""}`}
              onClick={() => handleStockTabChange("oilgas")}
            >
              Oil & Gas
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Section */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="loading-container"
          >
            <div className="loader"></div>
            <p className="loading-text">Fetching latest market data...</p>
          </motion.div>
        ) : error ? (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="error-container"
          >
            <p className="error-text">{error}</p>
            <motion.button
              className="retry-button"
              onClick={() => setRetry(retry + 1)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Retry
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key={activeTab + activeStockTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="market-table-wrapper"
          >
            <table className="market-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>{activeTab === "crypto" ? "Coin" : "Stock"}</th>
                  <th>Price</th>
                  <th>24h Change</th>
                </tr>
              </thead>
              <tbody>
                {(activeTab === "crypto" ? cryptoData : getCurrentStockData()).map((item, index) => {
                  const isPositive = item.price_change_percentage_24h >= 0

                  return (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.02 }}
                      whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                    >
                      <td>{index + 1}</td>
                      <td className="item-info">
                        {activeTab === "crypto" ? (
                          <img src={item.image || "/placeholder.svg"} alt={item.name} className="item-image" />
                        ) : (
                          renderStockIcon(item)
                        )}
                        <div className="item-details">
                          <span className="item-name">{item.name}</span>
                          {activeTab === "stocks" && <span className="item-symbol">{item.symbol}</span>}
                        </div>
                      </td>
                      <td>${item.current_price.toLocaleString()}</td>
                      <td className={isPositive ? "positive" : "negative"}>
                        <span className="change-indicator">{isPositive ? "↑" : "↓"}</span>
                        {Math.abs(item.price_change_percentage_24h).toFixed(2)}%
                      </td>
                    </motion.tr>
                  )
                })}
              </tbody>
            </table>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Coins

