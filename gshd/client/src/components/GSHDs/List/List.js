import './list.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGSHDS } from '../../../actions/gshdActions.js';
import Map from '../../Map/Map.js';
import Listing from './Listing.js';
import PropTypes from 'prop-types';

class List extends Component {
  
  componentDidMount() {
    this.props.getGSHDS();
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <h1>Gretzky-Style Hot Dogs</h1>
          <div className="columns">
            <div className="column is-one-third dog-list-cards">
              <ul>
                {this.props.gshds.map((gshd, index) => <Listing gshd={gshd} key={index} handleUpdates={this.props.getGSHDS} />)}
              </ul>
            </div>
            <div className="column is-two-thirds">
              <div className="map-container">
                <Map gshds={this.props.gshds}/>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

List.propTypes = {
  getGSHDS: PropTypes.func.isRequired,
  gshds: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  gshds: state.gshds.gshds
});

export default connect(
  mapStateToProps,
  { getGSHDS }
)(List);
