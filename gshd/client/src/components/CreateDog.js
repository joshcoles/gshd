import React, { Component } from 'react';
import axios from 'axios';
import AutoCompletePlaces from './AutoCompletePlaces.js';

class CreateDog extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      location: '',
      rating: 0,
      image: '',
      geometry: {
        lat: '',
        lng: ''
      }
    }

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onLocationChange = this.onLocationChange.bind(this);
    this.onRatingChange = this.onRatingChange.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.onLatChange = this.onLatChange.bind(this);
    this.onLongChange = this.onLongChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onAutoCompletePlacesSelect = this.onAutoCompletePlacesSelect.bind(this);
  }

  onTitleChange(e) {
    this.setState({
      title: e.target.value
    });
  }

  onLocationChange(e) {
    this.setState({
      location: e.target.value
    });
  }

  onRatingChange(e) {
    this.setState({
      rating: e.target.value
    });
  }

  onImageChange(e) {
    this.setState({
      image: e.target.value
    });
  }

  onLatChange(e) {

    const newGeometry = {
      ...this.state.geometry
    };

    newGeometry.lat = e.target.value;

    this.setState({
      geometry: newGeometry
    });
  }

  onLongChange(e) {

    const newGeometry = {
      ...this.state.geometry
    };

    newGeometry.lng = e.target.value;

    this.setState({
      geometry: newGeometry
    });
  }

  onAutoCompletePlacesSelect(dataFromChild) {

    console.log(dataFromChild);
    const newGeometry = {
      ...this.state.geometry
    };

    newGeometry.lng = dataFromChild.lng;
    newGeometry.lat = dataFromChild.lat;
    
    this.setState({
      geometry: newGeometry
    });
  }

  onSubmit(e) {
    e.preventDefault();

    console.log(`
    
      Form Submitted
      ==============

      title: ${this.state.title}
      location: ${this.state.location}
      rating: ${this.state.rating}
      image: ${this.state.image}
      lat: ${this.state.geometry.lat}
      long: ${this.state.geometry.lng}
    `);

    const newGshd = {
      gshd_title: this.state.title,
      gshd_location: this.state.location,
      gshd_rating: this.state.rating,
      gshd_image: this.state.image,
      gshd_geometry: {
        coordinates: [parseInt(this.state.geometry.lng), parseInt(this.state.geometry.lat)]
      }
    }

    axios.post('http://localhost:4000/gshds/add', newGshd)
      .then(res => console.log(res.data));

    this.setState({
      title: '',
      location: '',
      rating: 0,
      image: '',
      geometry: {
        lat: '',
        lng: ''
      }
    });
  }

  render() {
    return (
      <div>
        <section className="section">
          <h1>CreateDog</h1>
          <div className="container columns">
            <form className="column" onSubmit={this.onSubmit}>
              <div className="container columns">
                <div className="column">
                  <div className="field">
                    <label className="label" htmlFor="title">Title</label>
                    <div className="control">
                      <input 
                        className="input" 
                        type="text" 
                        name="title" 
                        placeholder="Memorial Day All-Timer" 
                        onChange={this.onTitleChange} 
                        value={this.state.title}
                        />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label" htmlFor="location">Location</label>
                    <div className="control">
                      <AutoCompletePlaces 
                        selectionHandler={this.onAutoCompletePlacesSelect} />
                    </div>
                  </div>
                </div>

                <div className="column">
                  <div className="field">
                    <label className="label" htmlFor="image">Image</label>
                    <div className="control">
                      <input 
                        className="input" 
                        type="text" 
                        name="image" 
                        placeholder="https://www.imgur.com/gshd" 
                        onChange={this.onImageChange} 
                        value={this.state.image}
                        />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label" htmlFor="rating">Rating out of 10</label>
                    <div className="control">
                      <input 
                        className="input" 
                        type="text" 
                        name="rating" 
                        placeholder="7" 
                        onChange={this.onRatingChange} 
                        value={this.state.rating}
                        />
                    </div>
                  </div>
                </div>
              </div>
              <input className="button" type="submit" value="Create Dog"/>
            </form>
          </div>
        </section>
      </div>
    )
  }
}

export default CreateDog;
