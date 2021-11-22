const express = require('express')
var cors = require('cors')
const Handlebars = require("handlebars");
const app = express()
const port = 3001

// routing 
app.get('/', cors(), (req, res) => {
  	res.send('Hello World!')
})

app.get('/articles', cors(),  (req, res) => {
	const articles = [
	{
		ID: 2,
		title:  "Buku 1",
		body : ""
	},
	{
		ID: 3,
		title:  "Buku 2",
		body : ""
	},
	{
		ID: 4,
		title:  "Buku 3",
		body : ""
	}];

	res.json(articles)
});

app.get('/about', (req, res) => {
    var html = '<p>Hello, my name is {{name}}</p>';
    const template = Handlebars.compile(html);
    res.send(template({ name: "Nils" }))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})