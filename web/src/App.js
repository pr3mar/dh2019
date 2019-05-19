import React, { Component } from 'react';
import { Container, Row, Col  } from 'react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index.es";

import RegionStats from './components/RegionStats';
import BasicMap from './components/BasicMap';

import { appData } from './assets/data.js';
import './App.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import axios from "axios";
import {
  faMoon, faSun, faStickyNote, faLeaf
} from '@fortawesome/free-solid-svg-icons';

import {
  faClone, faWindowMaximize, faCircle, faSquare
} from '@fortawesome/free-regular-svg-icons';

library.add(
  faMoon, faSun, faClone, faStickyNote, faWindowMaximize, faLeaf, faCircle, faSquare
);


class App extends Component {
  timeout = null;

  constructor() {
    super()
    this.state = {
      highlight: "",
      apiData: null
    }
  }

  componentDidMount() {
    this.fetchApiData()
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  fetchApiData = () => {
    axios.get("https://api.over-engineering-best-practices.com")
      .then(response => {
        let apiData = response.data;
        for (let i = 0; i < apiData.length; i++) {
          let region = apiData[i]["region"];

          for (let j = 0; j < appData.length; j++) {
            if (region === appData[j]["region"]) {
              apiData[i]["coordinates"] = appData[j]["coordinates"];
              apiData[i]["timezone"] = appData[j]["timezone"];
              apiData[i]["isDay"] = appData[j]["isDay"];
              if (apiData[i]["actual_pods"] === null) {
                apiData[i]["actual_pods"] = 0;
              }
              if (apiData[i]["desired_pods"] === null) {
                apiData[i]["desired_pods"] = 0;
              }
              break;
            }
          }
        }
        this.setState({"apiData": response.data});
        console.log(response.data);

        this.timeout = setTimeout(this.fetchApiData, 1000);
      });
  }



  getRegions = () => {
    const { apiData } = this.state;
    const imgs = [
      "google_cloud.svg",
      "alibabacloud.svg",
      "garaza.svg",
      "microsoft_azure.svg",
      "digitalocean.svg",
      "microsoft_azure.svg"

    ]

    let regions = [];
    if(Array.isArray(apiData)){
      for (let i=0; i<apiData.length; i++){
        regions.push(
          <Col md="2" key={i}>
            <RegionStats
              regionsData={apiData[i]}
              setHighlight={(region) => this.setHighlight(region)}
              highlight={this.state.highlight}
              companyImg={imgs[i]}
            />
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
    const { apiData } = this.state;

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
        <BasicMap setHighlight={(region) => this.setHighlight(region)} apiData={apiData} highlight={this.state.highlight}/>
        <div id="stats-cont">
          <div id="stats-header">
            <div>Info</div>
            <div>Power Demand</div>
            <div>Workload</div>
            <div>Vendor</div>
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
