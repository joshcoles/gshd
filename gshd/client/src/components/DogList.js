import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Map from './Map.js';

const Gshd = (props) => (
  <li>{props.gshd.gshd_title}<Link to={`/edit-dog/${props.gshd._id}`}>Edit</Link></li>
)

class DogList extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      gshds: []
    }
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

  dogList() {
    return this.state.gshds.map((gshd, index) => 
        <Gshd gshd={gshd} key={index} />
      )
  }

  render() {

    return (
      <div>
        <h1>DogList</h1>
        <ul>
          {this.dogList()}
        </ul>
        <hr/>
          <div className="map-container">
            <Map gshds={this.state.gshds}/>
          </div>
      </div>
    )
  }
}

export default DogList;
