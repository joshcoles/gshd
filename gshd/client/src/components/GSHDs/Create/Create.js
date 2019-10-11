import React, { Component } from 'react';
import axios from 'axios';
import AutoCompletePlaces from '../../utils/AutoCompletePlaces/AutoCompletePlaces.js';
import Stars from '../../ui/Stars/Stars.js';
import './create.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { newGSHD } from '../../../actions/gshdActions.js';

class Create extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      location: '',
      rating: '',
      image: '',
      imageName: '',
      imageIsLoading: false,
      imageHasBeenUploaded: false,
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
      imageIsLoading: true,
      image: file,
      imageName: name
    },
      () => this.uploadImageToS3()
        .then(() => {
          this.setState({
            imageHasBeenUploaded: true,
            imageIsLoading: false
          })
        })
    );
  }

  // Images get uploaded each time user selects new image, and state gets updated with S3 Image URL
  uploadImageToS3() {
    return new Promise((resolve, reject) => {
      let formData = new FormData();

      formData.append('gshd-image', this.state.image);
  
      axios.post('http://localhost:4000/api/images/upload', formData, {
        headers: {'Content-Type': 'multipart/form-data'}
      })
        .then(res => {

          this.setState({ image: res.data.imageUrl });

          resolve(res);
        })
        .catch(err => reject(err));
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
        coordinates: [this.state.geometry.lng, this.state.geometry.lat]
      }
    }

    this.props.newGSHD(newGshd, this.props.history);
  }

  render() {

    // Stars logic lives inside component
    const stars = <Stars onRatingChange={this.onChangeRating} mutable={true} rating={this.state.rating}/>;

    // Initial image upload button + file display input, shown until user uploads first image
    const preUploadMarkup = (
      <div className={`file ${this.state.imageName.length ? 'has-name' : ''}`}>
        <label className="file-label">
          <input onChange={this.onChangeImage} className="file-input" type="file"/>
            <span className={`file-cta button ${this.state.imageIsLoading ? 'is-loading' : ''}`}>
              <span className="file-icon"><i className="fas fa-upload"></i></span>
              <span className="file-label">Choose a file…</span>
            </span>
            { this.state.imageName.length ? <span className="file-name">{ this.state.imageName }</span> : ''}
        </label>
      </div>
    );

    const postUploadMarkup = (
      <div className="uploaded-image">
        {
          !this.state.imageIsLoading ? 
          (
            <img alt="A hot dog" src={this.state.image}/> 
          ) : (
            <div className="loading-container">
              <div className="button is-loading"></div>
            </div>
          )
        }

        <label className="edit">
          <input onChange={this.onChangeImage} className="file-input" type="file"/>
          <span>
            <i className="fas fa-edit"></i>
          </span>
        </label>
      </div>
    )

    return (
      <div>
        <section className="section">
          <h1>CreateGSHD v2</h1>
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
                  <div className="field star-ratings">
                    <label className="label" htmlFor="rating">Rating</label>
                    { stars }
                  </div>
                  <div className="field">
                    <label className="label" htmlFor="image">Image</label>
                    { !this.state.imageHasBeenUploaded ? preUploadMarkup : postUploadMarkup }
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

Create.propTypes = {
  newGSHD: PropTypes.func.isRequired
}

export default connect(
  null,
  {newGSHD}
)(Create);
