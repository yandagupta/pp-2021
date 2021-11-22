import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
function App() {
  const [data, setData] = useState([]);
  // eslint-disable-next-line
  useEffect(async () => {
    const result = await axios(
      'http://localhost:3001/articles',
    );
    setData(result.data);
  }, []);

  return (

    <div className="App">
      <ul>
        {data.map(item => (
          <li key={item.ID}>
            <a href={'/'}>{item.title}</a>
          </li>
        ))}
      </ul>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello World
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
