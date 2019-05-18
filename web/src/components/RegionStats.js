import React, { Component } from 'react';

import Graph from './Graph'

class RegionStats extends Component {
  render() {
    const {name} = this.props;

    const graphOptions = {
      legend: {
        display: false,
      },
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            displayFormats: {
              second: 'h:mm:ss'
            }
          }
        }]
      }
    };

    const initialState = {
      labels: [new Date()-70000, new Date()-60000, new Date()-50000, new Date()-40000, new Date()-30000, new Date()-20000, new Date()-10000],
      datasets: [
        {
          label: 'My First dataset',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [65, 59, 80, 81, 56, 55, 40],
        }
      ]
    };

    return(
      <div className="region-stats-cont">
        {name}
        <Graph data={initialState} options={graphOptions}/>
      </div>
    )
  }

}

export default RegionStats;
