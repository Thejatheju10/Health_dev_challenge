import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState([]);

  const handleSubmit = async () => {
    try {
      const data = JSON.parse(input);
      const result = await axios.post('https://<your-heroku-app>.herokuapp.com/bfhl', data);
      setResponse(result.data);
      setError(null);
    } catch (e) {
      setError('Invalid JSON or API Error');
      setResponse(null);
    }
  };

  const renderResponse = () => {
    if (!response) return null;

    const { numbers, alphabets, highest_alphabet } = response;

    const filteredData = {
      numbers: filter.includes('Numbers') ? numbers : [],
      alphabets: filter.includes('Alphabets') ? alphabets : [],
      highest_alphabet: filter.includes('Highest alphabet') ? highest_alphabet : []
    };

    return (
      <div>
        <h2>Response</h2>
        <pre>{JSON.stringify(filteredData, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>JSON Processor</h1>
      <textarea
        rows="10"
        cols="50"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Enter JSON here'
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <br />
      <label>
        <input
          type="checkbox"
          value="Numbers"
          onChange={(e) => setFilter([...filter, e.target.value])}
        />
        Numbers
      </label>
      <label>
        <input
          type="checkbox"
          value="Alphabets"
          onChange={(e) => setFilter([...filter, e.target.value])}
        />
        Alphabets
      </label>
      <label>
        <input
          type="checkbox"
          value="Highest alphabet"
          onChange={(e) => setFilter([...filter, e.target.value])}
        />
        Highest Alphabet
      </label>
      {renderResponse()}
    </div>
  );
}

export default App;
