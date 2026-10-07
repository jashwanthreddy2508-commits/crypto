function Table({ coins }) {
  const price = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(coins.current_price || 0)

  const marketCap = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(coins.market_cap || 0)

  const percentChange = Number(coins.price_change_percentage_24h || 0)
  const changeClass = percentChange >= 0 ? 'positive' : 'negative'

  return (
    <tr className="coin-row">
      <td>
        <div className="coin-name">
          <img src={coins.image} alt={coins.name} />
          <div className="coin-meta">
            <span className="coin-symbol">{coins.symbol?.toUpperCase()}</span>
            <span>{coins.name}</span>
          </div>
        </div>
      </td>
      <td>{price}</td>
      <td className={changeClass}>
        {percentChange > 0 ? '+' : ''}
        {percentChange.toFixed(2)}%
      </td>
      <td>
        {new Intl.NumberFormat('en-US', {
          notation: 'compact',
          maximumFractionDigits: 2,
        }).format(coins.total_supply || 0)}
      </td>
      <td>{marketCap}</td>
    </tr>
  )
}

export default Table