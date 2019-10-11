import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getGSHDS, deleteGSHD } from '../../../actions/gshdActions.js';

class Listing extends Component {

  constructor(props) {
    super(props);
    
    this.handleClicksToDelete = this.handleClicksToDelete.bind(this);
  }

  handleClicksToDelete(e) {
    this.props.deleteGSHD(e)
      .then(() => this.props.getGSHDS());
  }
  
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
              <span className="icon" onClick={this.handleClicksToDelete}>
                <i className="fas fa-window-close"></i>
              </span>
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

Listing.propTypes = {
  getGSHDS: PropTypes.func.isRequired,
  deleteGSHD: PropTypes.func.isRequired
}

export default connect(
  null, {
    getGSHDS, 
    deleteGSHD
  }
)(Listing);