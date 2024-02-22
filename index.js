require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: false
}));

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

let urls = {}

app.post('/api/shorturl', function(req, res) {
  const url = req.body.url;
  console.log(url);
  // console.log(req.url);
  const shorturl = 1;
  urls[shorturl] = url;
  // console.log(urls);
  res.json({original_url: url, short_url: shorturl});
})

app.get('/api/shorturl/:shortUrl', function(req, res) {
  const short_url = req.params.shortUrl;
  const original_url = urls[short_url];
  res.redirect(original_url);
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
