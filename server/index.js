//  backend required to thwart CORS
const express = require('express');
const bodyparser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(express.static(__dirname + '/../dist'));

app.get('/api/healthcheck', (req, res) => {
  return res.send('Healthy!')
})

app.get('/api/us/daily', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  axios.get('https://api.covidtracking.com/v1/us/daily.json')

  .then(function (response) {
    res.send(JSON.stringify(response.data));
      res.end();
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
})

const port = 8181;

app.listen(port, function() {
  console.log(`listening on port ${port}`)
});