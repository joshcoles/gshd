import React, { Component } from 'react';
import axios from 'axios';

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
        <h1>CreateDog</h1>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="title">Enter Title</label>
          <input 
            name="title" 
            type="text" 
            placeholder="Tasty boi" 
            onChange={this.onTitleChange} 
            value={this.state.title}/>

          <label htmlFor="location">Enter Location</label>
          <input name="location" type="text" placeholder="Costco" onChange={this.onLocationChange} value={this.state.location}/>

          <label htmlFor="rating">Enter Rating out of 10</label>
          <input name="rating" type="text" placeholder="7.5" onChange={this.onRatingChange} value={this.state.rating}/>

          <label htmlFor="image">Add Image</label>
          <input name="image" type="text" placeholder="https://www.imgur.com/gshd" onChange={this.onImageChange} value={this.state.image}/>
            
          <label htmlFor="lat">Choose Latitude</label>
          <input name="lat" type="text" placeholder="" onChange={this.onLatChange} value={this.state.geometry.lat} />

          <label htmlFor="long">Choose Longitude</label>
          <input name="long" type="text" placeholder="" onChange={this.onLongChange} value={this.state.geometry.lng} />

          <input type="submit" value="Create Dog"/>
        </form>
      </div>
    )
  }
}

export default CreateDog;
