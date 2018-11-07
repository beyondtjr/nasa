import React, { Component } from 'react';
import './App.css';

import neoData from './sample-neo'
import {
  PageHeader,
  Table,
  Navbar,
  Indicators
} from 'react-bootstrap'

class App extends Component {
  constructor(props){
    super(props)
    let today = new Date()
    this.state = {
      apiKey: "IkmMHQojDa2kUU5HJTZsbqcrz3sTeFfS3UlGOzRP",
      startDate:`${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`,
      apiUrl: "https://api.nasa.gov/neo/rest/v1/feed",
      rawData: neoData,
      asteroids: []
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
    debugger


  render() {
    return (
      <div className = "Main">
        <nav class="navbar navbar-inverse">
          <div class="container-fluid">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <a class="navbar-brand" href="#">Home</a>
              <a class="navbar-brand" href="#">About</a>
              <a class="navbar-brand" href="#">Contact</a>
            </div>
          </div>
        </nav>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Estimated Diameter (feet)</th>
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
        <div class="alert alert-dismissible alert-warning">
          <button type="button" class="close" data-dismiss="alert">&times;</button>
            <h4>Warning!</h4>
              <p> ASTEROID INCOMING IN 14 Hours and 23 Minutes<a href="#" class="alert-link"></a></p>
        </div>
      </div>
    );
  }
}

export default App;
