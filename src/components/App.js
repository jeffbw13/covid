import React, { useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import regeneratorRuntime from 'regenerator-runtime';  // for async/await
import Stats from './Stats';
import MyChart from './MyChart';
import MyChartjsDash from './MyChartjsDash';
import { ThemeProvider } from "@chakra-ui/core";

const App = () => {

  const [ stats, setStats ] = useState([]);

  async function getStats() {
    //  use async / await instead of the promise returned by pet api
    //  i.e. .then not used
    const stats = await axios.get('https://api.covidtracking.com/v1/us/daily.json');

    console.log(stats);
    setStats(stats.data || []);
  }

  useEffect(() => {
    getStats();
  }, []);

  return (
    <div>
      <MyChartjsDash stats={stats} />
    </div>
  )
};

const ThemedApp = () => <ThemeProvider> <App /> </ThemeProvider>;

ReactDOM.render(<ThemedApp />, document.querySelector('#root'))

//<Stats stats={stats} />