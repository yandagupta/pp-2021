import React, { useState, useEffect } from "react";
// eslint-disable-next-line
import axios from "axios";
import {Row, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    const [articles, setArticles] = useState([]);
    useEffect(
        async function() {
          await axios.get('http://localhost:3001/articles')
            .then(function (response) {
                // handle success
                console.log(response);
                setArticles(response.data)
            })
        },
        [],
    );

  return (
    <div className="App">
      <div>
          <ul> {(
                articles.map(article => {
                    return  <li key={article.ID}>{article.title}</li>
                }) 
            )}
          </ul>
          <Row className="mx-0">
            <Button  variant="primary">Button #1</Button>
            <Button  variant="secondary" className="mx-2">Button #2</Button>
            <Button  variant="success">Button #3</Button>
        </Row>
      </div>
    </div>
  );
}

export default App;
