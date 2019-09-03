import React, { Component } from 'react';
import axios from 'axios';
import Map from './Map.js';
import DogListing from './DogListing.js';

class DogList extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      gshds: []
    };

    this.fetchUpdatedDogList = this.fetchUpdatedDogList.bind(this);

  }

  componentDidMount() {
    axios.get('http://localhost:4000/gshds/')
      .then(response => {
        this.setState({
          gshds: response.data
        })
      })
      .catch(error => console.log(error));
  }

  fetchUpdatedDogList() {
    axios.get('http://localhost:4000/gshds/')
      .then(response => {
        this.setState({
          gshds: response.data
        })
      })
      .catch(error => console.log(error));
  }

  render() {

    return (
      <section className="section">
        <div className="container">
          <h1>Your Gretzky-Style Hot Dogs</h1>
          <div className="columns">
            <div className="column is-one-third dog-list-cards">
              <ul>
                {this.state.gshds.map((gshd, index) => <DogListing gshd={gshd} key={index} handleUpdates={this.fetchUpdatedDogList} />)}
              </ul>
            </div>
            <div className="column is-two-thirds">
              <div className="map-container">
                <Map gshds={this.state.gshds}/>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default DogList;
