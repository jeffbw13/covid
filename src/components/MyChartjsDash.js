// https://www.createwithdata.com/react-chartjs-dashboard/
import React from 'react';
import LineChart from './LineChart';
import { FormControl, FormLabel, Flex } from '@chakra-ui/react';
import Switch from './Switch';


function getRandomDateArray(numItems) {
  // Create random array of objects (with date)
  let data = [];
  let baseTime = new Date('2018-05-01T00:00:00').getTime();
  let dayMs = 24 * 60 * 60 * 1000;
  for(var i = 0; i < numItems; i++) {
    data.push({
      time: new Date(baseTime + i * dayMs),
      value: Math.round(20 + 80 * Math.random())
    });
  }
  return data;
}

function getData() {
  let data = [];

  data.push({
    title: 'Daily new cases',
    color: '#70CAD1',
    data: getRandomDateArray(150)
  });
  data.push({
    title: 'Daily deaths',
    color: '#ff0000',
    data: getRandomDateArray(150)
  });
  data.push({
    title: 'Current hospitalizations',
    color: '#0000ff',
    data: getRandomDateArray(150)
  });
  return data;
}

class MyChartjsDash extends React.Component {
  constructor(props) {
    super(props);
    //  we do 'getData' here because it needs formated data to not error
    this.state = {
      feeds: getData(),
      updated: false,
      showCases: true,
      showHosp: true,
      showDeaths: true
    };
    this.onUpdateShow = this.onUpdateShow.bind(this);
    this.formatStats = this.formatStats.bind(this);
  }

  componentDidUpdate() {
    //console.log("props:", this.props );
    if (!this.state.updated) {
      this.setState({
        feeds: this.formatStats(this.props.stats),
        updated: true
      })
    }
  }

  onUpdateShow(showWhat, checked) {
    console.log('checked', showWhat, checked);
    this.setState({ [showWhat]: checked });
    this.setState({
      feeds: this.formatStats(this.props.stats),
    })
  }

  formatStats(stats) {
    let data = [];
    console.log('in Formatstats, showCases: ', this.state.showCases);
    if (this.state.showCases) {
      data.push({
        title: 'Daily new cases',
        color: '#70CAD1',
        data: stats.map((stat) => {
        return {
          time: stat.lastModified,
          value: stat.positiveIncrease
        }})
      })
    }
    if (this.state.showDeaths) {
      data.push({
        title: 'Daily deaths',
        color: '#ff0000',
        data: stats.map((stat) => {
        return {
          time: stat.lastModified,
          value: stat.deathIncrease
        }})
      })
    }
    if (this.state.showHosp) {
      data.push({
        title: 'Current hospitalizations',
        color: '#0000ff',
        data: stats.map((stat) => {
        return {
          time: stat.lastModified,
          value: stat.hospitalizedCurrently
        }})
      })
    }
    return data;
  }

  render() {
    const feeds = this.formatStats(this.props.stats);
    //console.log("rendered mychartjsdash", this.state.feeds);
    return (
      <div className="MyChartjsDash">
        <h1>U.S. CovID Tracker</h1>
        <Switch
          label={' Show cases: '}
          showWhat={'showCases'}
          checked={this.state.showCases}
          onUpdateShow={this.onUpdateShow.bind(this)}
        />
        <Switch
          label={' Show hospitalizations: '}
          showWhat={'showHosp'}
          checked={this.state.showHosp}
          onUpdateShow={this.onUpdateShow.bind(this)}
        />
        <Switch
          label={' Show deaths: '}
          showWhat={'showDeaths'}
          checked={this.state.showDeaths}
          onUpdateShow={this.onUpdateShow.bind(this)}
        />
        {feeds !== [] &&

        <LineChart
          feeds={feeds}
          color="#70CAD1"
        />
        }
      </div>
    );
  }
}

export default MyChartjsDash;