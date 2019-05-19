import React from 'react';
import { Line } from 'react-chartjs-2';

const Graph = (props) => {

  const graphOptions = {
    legend: {
      display: false,
    },
    scales: {
      xAxes: [{
        display: true,
        ticks: {
          display: false,
        },
        gridLines: {
          display: false
        }
      }],
      yAxes: [{
        display: true,
        ticks: {
          display: false,
          suggestedMin: 0,
          suggestedMax: 100,
        },
        gridLines: {
          display: false
        }
      }]
    },
    layout: {
      padding: {
        left: 10,
        right: 20,
        top: 5,
        bottom: 17
      }
    }
  };

  return (
    <div>
      <Line
        data={
          props.data
            ? props.data
            : {}
        }
        options={graphOptions}
      />
    </div>
  )
}

export default Graph;
