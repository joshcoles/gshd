import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Map from './Map.js';

const Gshd = (props) => (
  <li className="box">
    <div className="media">
      <div className="media-left">
        <figure className="image is-64x64"><img src={props.gshd.gshd_image} alt="Image"/></figure>
      </div>
      <div className="media-content">
        <div className="content">
          <strong>{props.gshd.gshd_title}</strong>
          <br/>
          <Link to={`/edit-dog/${props.gshd._id}`}>Edit</Link>
        </div>
      </div>
    </div>
  </li>
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
      <section className="section">

        <div className="container">
          <h1>Your Gretzky-Style Hot Dogs</h1>

          <div className="columns">
            <div className="column is-one-third">
              <ul>
                {this.dogList()}
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
