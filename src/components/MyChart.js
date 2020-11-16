//  this was the react-charts solution.  My data not mapping to x axis labels
//  also no documentation for how to map many points to one label

import React from 'react'
import { Chart } from 'react-charts'

function MyChart({stats}) {
  let deaths = stats.map(stat => {
    return { "primary":stat.lastModified, "secondary":stat.death };
  })
  deaths = deaths.slice(0,10);
  console.log(deaths);
  // this was working using the original dummy data, below
  // const data = React.useMemo(
  //   () => [
  //     {
  //       label: 'Series 1',
  //       data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 100]]
  //     },
  //     {
  //       label: 'Series 2',
  //       data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]]
  //     }
  //   ],
  //   []
  // )

  const data = React.useMemo(
    () => [
      {
        label: 'Deaths',
        data: deaths
      },
    ],
    []
  )

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'time', position: 'bottom' },
      { type: 'linear', position: 'left' }
    ],
    []
  )

  return (
    // A react-chart hyper-responsively and continuusly fills the available
    // space of its parent element automatically
    <div
      style={{
        width: '90vw',
        height: '90vh'
      }}
    >
      <Chart data={data} axes={axes} />
    </div>
  )
}

export default MyChart;