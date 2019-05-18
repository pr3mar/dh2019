import React from 'react';
import { Container, Row, Col  } from 'react-bootstrap';

import RegionStats from './components/RegionStats'

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Hello World
      </header>
      <div id="regions-cont">
        <Container>
          <Row>
            <Col md="3">
              <RegionStats name="London" />
            </Col>
            <Col md="3">
              <RegionStats name="Los Angeles" />
            </Col>
            <Col md="3">
              <RegionStats name="Tokio" />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default App;
