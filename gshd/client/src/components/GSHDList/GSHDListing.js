import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import Stars from '../ui/Stars.js';

class GSHDListing extends Component {

  constructor(props) {
    super(props);
    
    this.deleteGSHD = this.deleteGSHD.bind(this);
  }

  deleteGSHD(e) {
    const elementId = e.target.closest('.box').id;
    axios.delete(`http://localhost:4000/gshds/delete/${elementId}`)
    .then((data) => {
      this.props.handleUpdates();
    });
  }

  // When star ratings are read-only, they still require this event handler to get passed through
  // Otherwise, react will complain that I am giving a checked attribute to somethat that has no
  // event listener
  // onChangeRating() {}

  render() {

    let dateString;

    if (this.props.gshd.gshd_date) {
      dateString = this.props.gshd.gshd_date.split('T')[0];
    }

    return (
      <li className="box" id={this.props.gshd._id}>
      <div className="media">
        <div className="media-left">
          <figure className="image is-64x64"><img src={this.props.gshd.gshd_image} alt="A hot dog"/></figure>
        </div>
        <div className="media-content">
          <div className="content">
            <div className="top-info">
              <div className="top-info-left">
                <strong>{this.props.gshd.gshd_title}</strong>
              </div>
              <span className="icon" onClick={this.deleteGSHD}>
                <i className="fas fa-window-close"></i>
              </span>
            </div>
            <div className="star-ratings">
              {/* <Stars onRatingChange={this.onChangeRating} mutable={false} rating={this.props.gshd.gshd_rating}/> */}
            </div>
            <p>{this.props.gshd.gshd_location}</p>
            <br/>
            <div className="bottom-info">
              <Link to={`/edit-gshd/${this.props.gshd._id}`}>Edit</Link>
              <span>{ dateString ? dateString : '' }</span>
            </div>
          </div>
        </div>
      </div>
    </li>
    )
  }


}

export default GSHDListing;