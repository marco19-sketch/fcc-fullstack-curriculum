const { useState, useMemo } = React;

const exchangeRate = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.78,
  JPY: 156.7,
};

export function CurrencyConverter() {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("USD");

  const getAmount = useMemo(() => {
    console.log("conversion");
    return amount / exchangeRate[fromCurrency];
  }, [amount, fromCurrency]);

  const getConversion = getAmount * exchangeRate[toCurrency];

  return (
    <div>
      <h1>Currency Converter</h1>
      <h3>
        {fromCurrency} to {toCurrency} conversion
      </h3>
      <fieldset>
        <legend>Amount to Convert</legend>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
      </fieldset>
      <fieldset>
        <legend>From Currency</legend>
        <select
          value={fromCurrency}
          onChange={e => setFromCurrency(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
        </select>
      </fieldset>
      <fieldset>
        <legend>To Currency</legend>
        <select
          value={toCurrency}
          onChange={e => setToCurrency(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
        </select>
      </fieldset>
      <fieldset>
        <legend>Converted Amount</legend>
        <p>
          {fromCurrency && toCurrency
            ? `${getConversion.toFixed(2)} ${toCurrency}`
            : ""}
        </p>
      </fieldset>
    </div>
  );
}
