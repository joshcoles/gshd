import React, { Component } from 'react';
import axios from 'axios';
import AutoCompletePlaces from './utils/AutoCompletePlaces.js';
import Star from './ui/Star.js';

class CreateDog extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      location: '',
      rating: '',
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
    
    const newGeometry = {
      ...this.state.geometry
    };

    newGeometry.lng = dataFromChild.latLng.lng;
    newGeometry.lat = dataFromChild.latLng.lat;
    
    this.setState({
      geometry: newGeometry,
      location: dataFromChild.address
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const newGshd = {
      gshd_title: this.state.title,
      gshd_location: this.state.location,
      gshd_rating: this.state.rating,
      gshd_image: this.state.image,
      gshd_date: Date.now(),
      gshd_geometry: {
        coordinates: [parseInt(this.state.geometry.lng), parseInt(this.state.geometry.lat)]
      }
    }

    axios.post('http://localhost:4000/gshds/add', newGshd)
      .then(res => console.log(res.data));

    this.setState({
      title: '',
      location: '',
      rating: '',
      image: '',
      gshd_date: '',
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

                  <div className="field star-ratings">
                    <label className="label" htmlFor="rating">Rating</label>
                    <fieldset onChange={this.onRatingChange} className="rating">
                    {
                      [5, 4, 3, 2, 1].map((number) =>
                        <Star number={number} currentRating={this.state.rating ? this.state.rating : 0} key={number} />
                      )
                    }
                    </fieldset>
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
