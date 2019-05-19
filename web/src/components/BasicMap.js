import React, { Component } from "react"
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from "react-simple-maps"
//import { scaleLinear } from "d3-scale"
//import request from "axios"

import { appData } from '../assets/data.js';

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto",
}

/*const cityScale = scaleLinear()
  .domain([0,37843000])
  .range([1,25])*/

class BasicMap extends Component {
  constructor() {
    super()
    this.state = {
      //cities: [],
    }
    //this.fetchCities = this.fetchCities.bind(this)
  }

  componentDidMount() {
    //this.fetchCities()
  }

  /*fetchCities() {
    request
      .get("/assets/world-most-populous-cities.json")
      .then(res => {
        this.setState({
          cities: res.data,
        })
      })
  }*/

  onMarkerHover(city) {
    console.log(city.region);
    if(city.region!==this.props.highlight){
      this.props.setHighlight(city.region)
    }

  }

  onMarkerOut(city) {
    if(city.region===this.props.highlight){
      this.props.setHighlight("")
    }
  }

  render() {
    let apiData = this.props.apiData ? this.props.apiData : [];

    return (
      <div style={wrapperStyles}>
        <ComposableMap
          projectionConfig={{ scale: 205 }}
          width={980}
          height={551}
          style={{
            width: "100%",
            height: "auto",
          }}
          >
          <ZoomableGroup center={[0,20]} disablePanning>
            <Geographies geography="/assets/world-50m.json">
              {(geographies, projection) =>
                geographies.map((geography, i) =>
                  geography.id !== "ATA" && (
                    <Geography
                      key={i}
                      geography={geography}
                      projection={projection}
                      style={{
                        default: {
                          fill: "#ECEFF1",
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none",
                        },
                        hover: {
                          fill: "#ECEFF1",
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none",
                        },
                        pressed: {
                          fill: "#ECEFF1",
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none",
                        },
                      }}
                    />
              ))}
            </Geographies>
            <Markers>
              {
                apiData.map((city, i) => (
                  <Marker key={i} marker={city}>
                    <circle
                      cx={0}
                      cy={0}
                      r={city.actual_pods>=0 ? (Math.log(city.actual_pods+1)*10) : 0}
                      fill="rgba(75,192,192,0.5)"
                      onMouseOver={() => this.onMarkerHover(city)}
                      onMouseOut={() => this.onMarkerOut(city)}
                      className={city.region===this.props.highlight ? "pulse" : ""}
                    />
                  </Marker>
                ))
              }
            </Markers>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    )
  }
}

export default BasicMap
