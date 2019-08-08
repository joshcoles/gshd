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
        <section className="section">
          <h1>Edit your Gretzky-Style Hot Dog</h1>
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
                            onChange={this.onChangeTitle} 
                            value={this.state.title}
                            />
                        </div>
                      </div>


                      <div className="field">
                        <label className="label" htmlFor="location">Location</label>
                        <div className="control">
                          <input 
                            className="input" 
                            type="text" 
                            name="location" 
                            onChange={this.onChangeLocation} 
                            value={this.state.location}
                            />
                        </div>
                      </div>

                      <div className="field">
                        <label className="label" htmlFor="rating">Rating</label>
                        <div className="control">
                          <input 
                            className="input" 
                            type="text" 
                            name="rating" 
                            onChange={this.onChangeRating} 
                            value={this.state.rating}
                            />
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
                            onChange={this.onChangeImage} 
                            value={this.state.image}
                            />
                        </div>
                      </div>

                      <div className="field">
                        <label className="label" htmlFor="latitude">Latitude</label>
                        <div className="control">
                          <input 
                            className="input" 
                            type="text" 
                            name="latitude" 
                            onChange={this.onChangeLatitude} 
                            value={this.state.geometry.lat}
                            />
                        </div>
                      </div>


                      <div className="field">
                        <label className="label" htmlFor="longitude">Longitude</label>
                        <div className="control">
                          <input 
                            className="input" 
                            type="text" 
                            name="longitude" 
                            onChange={this.onChangeLongitude} 
                            value={this.state.geometry.lng}
                            />
                        </div>
                      </div>
                    </div>
                </div>
                <input className="button" type="submit" value="Update GSHD" />
              </form>
          </div>
        </section>
      </div>
    )
  }
}

export default EditDog;
