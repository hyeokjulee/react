import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [usd, setUsd] = useState(0);
  const [idx, setIdx] = useState(0);
  const onChange = (event) => setUsd(event.target.value);
  const onSelect = (event) => setIdx(event.target.value);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <select onChange={onSelect}>
            {coins.map((coin, index) => (
              <option value={index} key={coin.id}>
                {coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD
              </option>
            ))}
          </select>
          <div>
            <label htmlFor="usd">USD</label>
            <input value={usd} id="usd" type="number" onChange={onChange} />
          </div>
          <div>
            <label htmlFor={coins[idx].id}>{coins[idx].symbol}</label>
            <input
              value={usd / coins[idx].quotes.USD.price}
              id={coins[idx].id}
              type="number"
              disabled
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
