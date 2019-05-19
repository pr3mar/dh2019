import React, { Component } from 'react';
import Clock from 'react-live-clock';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index.es";

import Graph from './Graph'

class RegionStats extends Component {
  getPods = (actualPods, desiredPods) => {
    let pods = [];

    for (let i=0; i<desiredPods; i++){
      if (i < actualPods) {
        pods.push(
          <div key={i}>
          </div>
        )
      } else {
        pods.push(
          <div key={i} className="small-circle">
          </div>
        )
      }
    }

    return pods;
  }

  onRegionHover(region) {
    console.log(this.props.apiData)

    if(region!==this.props.highlight){
      this.props.setHighlight(region)
    }

  }

  onRegionOut(region) {
    if(region===this.props.highlight){
      this.props.setHighlight("")
    }
  }

  render() {
    const {regionsData} = this.props;

    let demand = [];
    let demandLabel= [];

    for(let i=0; i<regionsData.demand.length; i++){
      demand.push(regionsData.demand[i]);
      demandLabel.push(i);
    }

    const initialState = (canvas) => {
      const ctx = canvas.getContext("2d");
      const gradient = ctx.createLinearGradient(0, 0, 0, 100);
      gradient.addColorStop(0, 'rgba(75,192,192,0.5)');
      gradient.addColorStop(1, 'rgba(75,192,192,0.05)');

      return {
        labels: demandLabel,
        datasets: [
          {
            label: 'Energy demand',
            lineTension: 0.1,
            backgroundColor: gradient,
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
      }
    };

    return(
      <div
        className={regionsData.region!==this.props.highlight ? "region-stats-cont" : "region-stats-cont"}
        onMouseOver={() => this.onRegionHover(regionsData.region)}
        onMouseOut={() => this.onRegionOut(regionsData.region)}
      >
        <div className="city">{regionsData.region}</div>
        <div className="time-cont">
          <FontAwesomeIcon className="time-icon" icon={regionsData.isDay ? "sun" : "moon"} />
          <Clock format={'HH:mm:ss'} ticking={true} timezone={regionsData.timezone} />
        </div>
        <Graph data={initialState}/>

        <div className="pods">
          {this.getPods(regionsData.actual_pods, regionsData.desired_pods)}
        </div>
      </div>
    )
  }

}

export default RegionStats;
