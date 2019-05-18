import React, { Component } from 'react';
import { Container, Row, Col  } from 'react-bootstrap';

import RegionStats from './components/RegionStats'

import { appData } from './assets/data.js'
import './App.css';

import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faMoon, faSun, faSquare
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faMoon, faSun, faSquare
);


class App extends Component {

  getRegions = () => {
    let regions = [];
    if(Array.isArray(appData)){
      for (let i=0; i<appData.length; i++){
        regions.push(
          <Col md="2">
            <RegionStats regionsData={appData[i]} />
          </Col>
        )
      }
    }
    return regions;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Hello World
        </header>
        <div id="regions-cont">
          <Container>
            <Row>
              {this.getRegions()}
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default App;
