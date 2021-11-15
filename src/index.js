const express = require('express')
const Handlebars = require("handlebars");
const app = express()
const port = 3000

// routing 
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/about', (req, res) => {
    var html = '<p>Hello, my name is {{name}}</p>';
    const template = Handlebars.compile(html);
    res.send(template({ name: "Nils" }))
})
  

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})