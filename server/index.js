const express = require('express');
const bodyparser = require('body-parser');
const axios = require('axios');

const app = express();

//app.use(express.static(__dirname + '/../src'));

app.get('/api/healthcheck', (req, res) => {
  return res.send('Healthy!')
})

app.get('/api/us/daily', (req, res) => {
  //axios.get('https://api.covidtracking.com/v1/states/ca/current.json')
  axios.get('https://api.covidtracking.com/v1/us/daily.json')

  .then(function (response) {

    //const resp = JSON.parse(response);
      //console.log(response.data);

    res.send(JSON.stringify(response.data));
      res.end();
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
})

const port = 3000;

app.listen(port, function() {
  console.log(`listening on port ${port}`)
});