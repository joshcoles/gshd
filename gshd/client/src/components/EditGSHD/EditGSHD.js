import React, { Component } from 'react';
import axios from 'axios';
import AutoCompletePlaces from '../utils/AutoCompletePlaces/AutoCompletePlaces.js';
import Stars from '../ui/Stars.js';

class EditGSHD extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      title: '',
      location: '',
      rating: '',
      image: '',
      imageName: '',
      imageIsLoading: false,
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
    this.onAutoCompletePlacesSelect = this.onAutoCompletePlacesSelect.bind(this);
    
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
      .then(() => console.log(this.state.rating))
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
        coordinates: [this.state.geometry.lng, this.state.geometry.lat,]
      }
    }

    axios.post(`http://localhost:4000/gshds/update/${this.props.match.params.id}`, obj)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));

    this.props.history.push('/gshds');
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
  const file = e.target.files[0];
  const name = e.target.files[0].name;

  this.setState({
    image: file,
    imageName: name,
    imageIsLoading: true
  },
    () => this.uploadImageToS3()
      .then((data) => {
        this.setState({
          imageIsLoading: false
        })
      })
  );

}

uploadImageToS3() {
  return new Promise((resolve, reject) => {
    let formData = new FormData();

    formData.append('gshd-image', this.state.image);

    axios.post('http://localhost:4000/upload', formData, {
      headers: {'Content-Type': 'multipart/form-data'}
    })
      .then(res => {

        this.setState({ image: res.data.imageUrl });

        resolve(res);
      })
      .catch(err => reject(err));
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
                          <AutoCompletePlaces 
                            defaultLocation={this.state.location} selectionHandler={this.onAutoCompletePlacesSelect} />
                        </div>
                      </div>
                    </div>

                    <div className="column">
                      <div className="field star-ratings">
                        <label className="label" htmlFor="rating">Rating</label>
                        {
                          <Stars onRatingChange={this.onChangeRating} mutable={true} rating={this.state.rating}/>
                        }
                      </div>

                      <div className="field">
                        <label className="label" htmlFor="image">Image</label>
  
                        <div className="current-image">
                          <label>
                            <input onChange={this.onChangeImage} className="file-input" type="file"/>
                            <span>
                              <i className="fas fa-edit"></i>
                            </span>
                          </label>
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

export default EditGSHD;
