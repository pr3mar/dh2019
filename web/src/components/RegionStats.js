import React, { Component } from 'react';
import Clock from 'react-live-clock';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index.es";

import Graph from './Graph'

class RegionStats extends Component {
  getPods = (numPods) => {
    let pods = [];

    for (let i=0; i<numPods; i++){
      pods.push(
        <div key={i}>
          <FontAwesomeIcon icon="square" />
        </div>
      )
    }

    return pods;
  }

  render() {
    const {regionsData} = this.props;

    let demand = [];
    let demandLabel= [];

    for(let i=0; i<regionsData.demand.length; i++){
      demand.push(regionsData.demand[i]);
      demandLabel.push(i);
    }

    const graphOptions = {
      legend: {
        display: false,
      },
      scales: {
        xAxes: [{
          display: false
        }],
        yAxes: [{
          display: true,
          ticks: {
            suggestedMin: 0,
            suggestedMax: 100,
          }
        }]
      },
      layout: {
        padding: {
          left: 10,
          right: 20,
          top: 20,
          bottom: 10
        }
      }
    };

    const initialState = {
      labels: demandLabel,
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
          data: demand,
        }
      ]
    };

    return(
      <div className="region-stats-cont">
        <div className="city">{regionsData.region}</div>
        <Graph data={initialState} options={graphOptions}/>
        <div className="time-cont">
          <div className="clock">
            <Clock format={'HH:mm:ss'} ticking={true} timezone={regionsData.timezone} />
          </div>
          <div>
            <FontAwesomeIcon icon={regionsData.isDay ? "sun" : "moon"} />
          </div>
        </div>
        <div className="pods">
          {this.getPods(regionsData.pods)}
        </div>
      </div>
    )
  }

}

export default RegionStats;
