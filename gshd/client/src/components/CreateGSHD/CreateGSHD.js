import React, { Component } from 'react';
import axios from 'axios';
import AutoCompletePlaces from '../utils/AutoCompletePlaces/AutoCompletePlaces.js';
import Stars from '../ui/Stars.js';

class CreateGSHD extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      location: '',
      rating: '',
      image: '',
      imageName: '',
      geometry: {
        lat: '',
        lng: ''
      }
    }

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeRating = this.onChangeRating.bind(this);
    this.onChangeLatitude = this.onChangeLatitude.bind(this);
    this.onChangeLongitude = this.onChangeLongitude.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onAutoCompletePlacesSelect = this.onAutoCompletePlacesSelect.bind(this);
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeRating(e) {
    this.setState({
      rating: e.target.value
    });
  }

  onChangeLatitude(e) {

    const newGeometry = {
      ...this.state.geometry
    };

    newGeometry.lat = e.target.value;

    this.setState({
      geometry: newGeometry
    });
  }

  onChangeLongitude(e) {

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

  onChangeImage(e) {
    const file = e.target.files[0];
    const name = e.target.files[0].name;
    
    this.setState({
      image: file,
      imageName: name
    });
  }

  uploadImageToS3() {
    return new Promise((resolve, reject) => {
      let formData = new FormData();

      formData.append('gshd-image', this.state.image);
  
      axios.post('http://localhost:4000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(res => {

          this.setState({
            image: res.data.imageUrl
          });

          console.log(res);
          resolve(res);
        })
        .catch(err => {
          
          console.log(err);
          reject(err);
        });

        
    });
  }

  onSubmit(e) {

    e.preventDefault();

    this.uploadImageToS3()
      .then(() => {

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
          .then(res => console.log(res.data))
          .then(() => {
            this.props.history.push('/gshds');
          });
    
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
      });
  }

  render() {

    const stars = <Stars onRatingChange={this.onChangeRating} mutable={true} rating={this.state.rating}/>;

    return (
      <div>
        <section className="section">
          <h1>CreateGSHD</h1>
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
                        onChange={this.onChangeTitle} 
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
                    <div className={`file ${this.state.imageName.length ? 'has-name' : ''}`}>
                      <label className="file-label">
                        <input onChange={this.onChangeImage} className="file-input" type="file"/>
                          <span className="file-cta">
                            <span className="file-icon"><i className="fas fa-upload"></i></span>
                            <span className="file-label">Choose a file…</span>
                          </span>
                          {
                            this.state.imageName.length ? 
                            <span className="file-name">{ this.state.imageName }</span> : ''
                          }
                          
                      </label>
                    </div>
                  </div>
                  <div className="field star-ratings">
                    <label className="label" htmlFor="rating">Rating</label>
                    { stars }
                  </div>
                </div>
              </div>
              <input className="button" type="submit" value="Create GSHD"/>
            </form>
          </div>
        </section>
      </div>
    )
  }
}

export default CreateGSHD;
