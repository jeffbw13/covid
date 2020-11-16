//  prior to refactor for variable number of datasets

import React from 'react';
import ReactDOM from 'react-dom';
import { Chart } from 'chart.js';

Chart.defaults.global.defaultFontFamily = "Roboto, sans-serif";

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    this.myChart = new Chart(this.chartRef.current, {
      type: 'line',
      options: {
        scales: {
          xAxes: [
            {
              type: 'time',
              time: {
                unit: 'month'
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                min: 0
              }
            }
          ]
        }
      },
      data: {
        labels: this.props.feeds[0].data.map(d => d.time),
        datasets: [{
          label: this.props.feeds[0].title,
          data: this.props.feeds[0].data.map(d => d.value),
          fill: 'none',
          backgroundColor: this.props.color,
          pointRadius: 2,
          borderColor: this.props.color,
          borderWidth: 1,
          lineTension: 0
        },
        {
          label: this.props.feeds[1].title,
          data: this.props.feeds[1].data.map(d => d.value),
          fill: 'none',
          backgroundColor: "#ff0000",
          pointRadius: 2,
          borderColor: "#ff0000",
          borderWidth: 1,
          lineTension: 0
        },
        {
          label: this.props.feeds[2].title,
          data: this.props.feeds[2].data.map(d => d.value),
          fill: 'none',
          backgroundColor: "#0000ff",
          pointRadius: 2,
          borderColor: "#000000ff",
          borderWidth: 1,
          lineTension: 0
        }
      ]
      }
    });
  }

  componentDidUpdate() {
    //console.log("props in linechart:", this.props);
    this.myChart.data.labels = this.props.feeds[0].data.map(d => d.time);
    this.myChart.data.datasets[0].data = this.props.feeds[0].data.map(d => d.value);
    this.myChart.data.datasets[1].data = this.props.feeds[1].data.map(d => d.value);
    this.myChart.data.datasets[2].data = this.props.feeds[2].data.map(d => d.value);
    this.myChart.update();
  }

  render() {
    return <canvas ref={this.chartRef} />;
  }
}

export default LineChart;