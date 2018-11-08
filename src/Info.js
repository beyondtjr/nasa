import React, { Component } from 'react';
import neoData from './sample-neo'
import issData from './iss-location'
import {
  PageHeader,
  Table,
  Navbar,
  Indicators
} from 'react-bootstrap'

class Info extends Component {
  constructor(props){
    super(props)
    let today = new Date()
    this.state = {
      apiKey: "IkmMHQojDa2kUU5HJTZsbqcrz3sTeFfS3UlGOzRP",
      startDate:`${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`,
      apiUrl: "https://api.nasa.gov/neo/rest/v1/feed",
      rawData: neoData,
      asteroids: [],
      latitude: -25.1671,
      longitude: -150.8365,
      timestamp: 1541627554
    }
}

  componentWillMount(){
  fetch("https://api.nasa.gov/neo/rest/v1/feed?"+`start_date=${this.state.startDate}&api_key=${this.state.apiKey}`).then((rawResponse)=>{
  // rawResponse.json() returns a promise that we pass along
  return rawResponse.json()
  }).then((parsedResponse) => {

  // when this promise resolves, we can work with our data
  let neoData = parsedResponse.near_earth_objects

  let newAsteroids = []
  Object.keys(neoData).forEach((date)=>{
    neoData[date].forEach((asteroid) =>{
      newAsteroids.push({
        id: asteroid.neo_reference_id,
        name: asteroid.name,
        date: asteroid.close_approach_data[0].close_approach_date,
        diameterMin: asteroid.estimated_diameter.feet.estimated_diameter_min.toFixed(0),
        diameterMax: asteroid.estimated_diameter.feet.estimated_diameter_max.toFixed(0),
        closestApproach: asteroid.close_approach_data[0].miss_distance.miles,
        velocity: parseFloat(asteroid.close_approach_data[0].relative_velocity.miles_per_hour).toFixed(0),
        distance: asteroid.close_approach_data[0].miss_distance.miles
      })
    })
  })

  // state is updated when promises are resolved
  this.setState({asteroids: newAsteroids})
  })
  }


  render() {
    return(
      <div>
        <div className="Asteroids">
          <Table>
            <thead>
              <tr>
                <th>HI RIKKI (:</th>
                <th>HI MISUN (:</th>
                <th>Date of Closest Approach</th>
                <th>Distance (miles)</th>
                <th>Velocity (miles/hour)</th>
              </tr>
            </thead>
            <tbody>
              {this.state.asteroids.map((asteroid)=>{
                return(
                  <tr key={asteroid.id}>
                    <td>{asteroid.name}</td>
                    <td>{asteroid.diameterMin} - {asteroid.diameterMax}</td>
                    <td>{asteroid.date}</td>
                    <td>{asteroid.distance}</td>
                    <td>{asteroid.velocity}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </div>


        <div className="Asteroids">
        <Table>
          <thead>
            <tr>
              <th>ISS</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> :) </td>
              <td>{this.state.latitude}</td>
              <td>{this.state.longitude}</td>
              <td>{this.state.timestamp}</td>
            </tr>
          </tbody>
        </Table>
      </div>
      </div>

    )
  }
}

export default Info
