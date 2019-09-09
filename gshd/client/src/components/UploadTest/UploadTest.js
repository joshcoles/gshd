import React, { Component } from 'react';

class UploadTest extends Component {

  render() {
    return (
      <form ref='uploadForm' 
        id='uploadForm' 
        encType="multipart/form-data">
        <input onChange={this.onChangeImage} type="file" name="sampleFile" />
        <input type='submit' value='Upload!' />
      </form>
    )
  }
}

export default UploadTest;