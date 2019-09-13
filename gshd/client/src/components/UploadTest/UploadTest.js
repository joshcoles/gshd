import React, { Component } from 'react';
import axios from 'axios';

// https://www.freecodecamp.org/news/how-to-set-up-simple-image-upload-with-node-and-aws-s3-84e609248792/

class UploadTest extends Component {

  constructor() {
    super();

    this.state = {
      image: null,
    }
    
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onSubmitImage = this.onSubmitImage.bind(this);
  }

  onChangeImage(e) {

    const file = e.target.files[0];

    this.setState({
      image: file
    })
  }

  onSubmitImage(e) {
    e.preventDefault();

    let formData = new FormData();

    formData.append('gshd-image', this.state.image);

    axios.post('http://localhost:4000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res => console.log(res))
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="section">
        <div className="container">
          <form method="post" ref='uploadForm' id='uploadForm' encType="multipart/form-data">
            <input onChange={this.onChangeImage} type="file" name="gshd-image" />
            <input onClick={this.onSubmitImage} type='submit' value='Upload!' />
          </form>
        </div>
      </div>
    )
  }
}

export default UploadTest;