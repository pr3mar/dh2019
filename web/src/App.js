import React, { Component } from 'react';
import { Container, Row, Col  } from 'react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index.es";

import RegionStats from './components/RegionStats';
import BasicMap from './components/BasicMap';

import { appData } from './assets/data.js';
import './App.css';

import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faMoon, faSun, faStickyNote, faLeaf
} from '@fortawesome/free-solid-svg-icons';

import {
  faClone, faWindowMaximize, faCircle, faSquare
} from '@fortawesome/free-regular-svg-icons';

import {
  faBitcoin
} from '@fortawesome/free-brands-svg-icons';

library.add(
  faMoon, faSun, faClone, faStickyNote, faWindowMaximize, faLeaf, faCircle, faSquare
);


class App extends Component {
  constructor() {
    super()
    this.state = {
      highlight: ""
    }
  }

  getRegions = () => {
    let regions = [];
    if(Array.isArray(appData)){
      for (let i=0; i<appData.length; i++){
        regions.push(
          <Col md="2" key={i}>
            <RegionStats regionsData={appData[i]} setHighlight={(region) => this.setHighlight(region)} highlight={this.state.highlight} />
          </Col>
        )
      }
    }
    return regions;
  }

  setHighlight = (region) => {
    this.setState({highlight: region});
  }

  render() {
    return (
      <div className="App">
        <div id="title">
          <h1>
            <span>Ec</span>
            <FontAwesomeIcon id="logo-icon" icon="leaf" />
            <span> Mining</span>
          </h1>
          <h5>Platform monitoring</h5>
        </div>
        <BasicMap setHighlight={(region) => this.setHighlight(region)} highlight={this.state.highlight}/>
        <div id="stats-cont">
          <div id="stats-header">
            <div>Info</div>
            <div>Power Demand</div>
            <div>Workload</div>
          </div>

          <div id="regions-cont">
            <Container>
              <Row>
                {this.getRegions()}
              </Row>
            </Container>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
