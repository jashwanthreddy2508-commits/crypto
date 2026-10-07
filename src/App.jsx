import { useEffect, useState } from 'react'
import Table from './table.jsx'
import './App.css'

function App() {
  const [coins, setCoins] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false',
        )

        if (!response.ok) {
          throw new Error('Failed to fetch cryptocurrency data')
        }

        const data = await response.json()
        setCoins(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(filter.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(filter.toLowerCase())
  )
const handlemarketcap = () => {
    const sortedCoins = [...filteredCoins].sort((a, b) => a.market_cap - b.market_cap)
    setCoins(sortedCoins)
  }
  
  const handlepercentchange = () => {
    const sortedCoins = [...filteredCoins].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
    setCoins(sortedCoins)
  }
  return (
    <div className="crypto-app">
      <div className="controls-bar">
        <div className="search-wrap">
          <input
            className="search-input"
            type="text"
            placeholder="Search cryptocurrency"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>

        <div className="toolbar">
          <button className="sort-button" type="button" onClick={handlemarketcap}>
            Sort by Market Cap
          </button>
          <button className="sort-button" type="button" onClick={handlepercentchange}>
            Sort by Percentage Change
          </button>
        </div>
      </div>
      <div className="table-wrapper">
        {filteredCoins.length > 0 ? (
          <table className="coin-table">
            <thead>
              <tr>
                <th scope="col">Coin</th>
                <th scope="col">Price</th>
                <th scope="col">24h Change (%)</th>
                <th scope="col">Total Supply</th>
                <th scope="col">Market Cap</th>
              </tr>
            </thead>
            <tbody>
              {filteredCoins.map((coin) => (
                <Table key={coin.id} coins={coin} />
              ))}
            </tbody>
          </table>
        ) : (
          <p className="empty-state">No coins found.</p>
        )}
      </div>
    </div>
  )
}

export default App
