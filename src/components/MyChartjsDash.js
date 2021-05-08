// https://www.createwithdata.com/react-chartjs-dashboard/
import React from 'react';
import LineChart from './LineChart';
import { FormControl, FormLabel, Flex } from '@chakra-ui/react';
import Switch from './Switch';

class MyChartjsDash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCases: true,
      showHosp: true,
      showDeaths: true
    };
    this.onUpdateShow = this.onUpdateShow.bind(this);
    this.formatStats = this.formatStats.bind(this);
  }

  onUpdateShow(showWhat, checked) {
    this.setState({ [showWhat]: checked });
  }

  formatStats(stats) {
    let data = [];
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
    return data;
  }

  render() {
    //  get needed data on each render
    const feeds = this.formatStats(this.props.stats);
    return (
      <div className="MyChartjsDash">
        <h1 style={{fontSize: '1.5rem', fontWeight: '700'}}>U.S. CovID Tracker</h1>
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
        {(feeds && feeds.length != 0) &&
        <LineChart
          feeds={feeds}
        />
        }
      </div>
    );
  }
}

export default MyChartjsDash;