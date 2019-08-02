import React, { Component } from 'react';
import axios from 'axios';

class EditDog extends Component {

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
    
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeRating = this.onChangeRating.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onChangeLatitude = this.onChangeLatitude.bind(this);
    this.onChangeLongitude = this.onChangeLongitude.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    
    // this.state = {
    //   title: '',
    //   location: '',
    //   rating: 0,
    //   image: ''
    // }
  }

  componentDidMount() {
    axios.get(`http://localhost:4000/gshds/${this.props.match.params.id}`)
      .then(res => {
        this.setState({
          title: res.data.gshd_title,
          location: res.data.gshd_location,
          rating: res.data.gshd_rating,
          image: res.data.gshd_image, 
          geometry: {
            lat: res.data.gshd_geometry.coordinates[0],
            lng: res.data.gshd_geometry.coordinates[1]
          }
        });
      })
      .catch(err => console.error(err));
  }

  onSubmit(e) {
    e.preventDefault();

    const obj = {
      gshd_title: this.state.title,
      gshd_location: this.state.location,
      gshd_rating: this.state.rating,
      gshd_image: this.state.image,
      gshd_geometry: {
        coordinates: [parseInt(this.state.geometry.lng), parseInt(this.state.geometry.lat),]
      }
    }

    console.log("Firing");

    console.log(`http://localhost:4000/gshds/update/${this.props.match.params.id}`);

    axios.post(`http://localhost:4000/gshds/update/${this.props.match.params.id}`, obj)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));

    this.props.history.push('/dog-list');
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }
  onChangeLocation(e) {
    this.setState({
      location: e.target.value
    });
  }
  onChangeRating(e) {
    this.setState({
      rating: e.target.value
    });
  }
  onChangeImage(e) {
    this.setState({
      image: e.target.value
    });
  }
  onChangeLatitude(e) {
    const newGeometry = {...this.state.geometry}
    newGeometry.lat = e.target.value;

    this.setState({
      geometry: newGeometry
    });
  }

  onChangeLongitude(e) {
    const newGeometry = {...this.state.geometry}
    newGeometry.lng = e.target.value;

    this.setState({
      geometry: newGeometry
    });
  }


  render() {

    return (
      <div>
        <h3>Edit GSHD</h3>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Title</label>
            <input 
              type="text" 
              value={this.state.title}
              onChange={this.onChangeTitle}
            />
            <label>Location</label>
            <input 
              type="text" 
              value={this.state.location}
              onChange={this.onChangeLocation}
            />
            <label>Rating</label>
            <input 
              type="text" 
              value={this.state.rating}
              onChange={this.onChangeRating}
            />
            <label>Image</label>
            <input 
              type="text" 
              value={this.state.image}
              onChange={this.onChangeImage}
            />

            <label>Latitude</label>
            <input 
              type="text"
              value={this.state.geometry.lat}
              onChange={this.onChangeLatitude}
            />

            <label>Longitude</label>
            <input 
              type="text"
              value={this.state.geometry.lng}
              onChange={this.onChangeLongitude}
            />

          </div>
          <input type="submit" value="Update GSHD" />
        </form>
      </div>

    )
  }
}

export default EditDog;
