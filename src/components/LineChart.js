import React from 'react';
import ReactDOM from 'react-dom';
import { Chart } from 'chart.js';

Chart.defaults.global.defaultFontFamily = "Roboto, sans-serif";

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    this.updateChart = this.updateChart.bind(this);
  }

  componentDidMount() {
    this.updateChart();
  }

  componentDidUpdate() {
    this.updateChart();
  }

  updateChart() {
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
        datasets:
        this.props.feeds.map(f => {
          return { label: f.title,
                   data: f.data.map(d => d.value),
                   fill: 'none',
                   backgroundColor: f.color,
                   pointRadius: 2,
                   borderColor: f.color,
                   borderWidth: 1,
                   lineTension: 0
          }
        })
      }
    });
  }

  render() {
    return <canvas ref={this.chartRef} />;
  }
}

export default LineChart;