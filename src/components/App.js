import React, { useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import regeneratorRuntime from 'regenerator-runtime';  // for async/await
import Stats from './Stats';
import MyChart from './MyChart';
import MyChartjsDash from './MyChartjsDash';
import { ChakraProvider } from "@chakra-ui/react";

const App = () => {

  const [ stats, setStats ] = useState([]);

  async function getStats() {
    const stats = await axios.get('https://api.covidtracking.com/v1/us/daily.json');
    setStats(stats.data || []);
  }

  useEffect(() => {
    getStats();
  }, []);

  return (
    <div style={{ width: '90vw', height: '70vw', margin: 'auto', marginTop: '10px'}}>
      <MyChartjsDash stats={stats} />
    </div>
  )
};

const ThemedApp = () => <ChakraProvider> <App /> </ChakraProvider>;

ReactDOM.render(<ThemedApp />, document.querySelector('#root'))