import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGSHDS } from '../../actions/gshdActions.js';
import Map from '../Map/Map.js';
import GSHDListing from './GSHDListing.js';
import PropTypes from 'prop-types';

class GSHDList extends Component {
  
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
                {this.props.gshds.map((gshd, index) => <GSHDListing gshd={gshd} key={index} handleUpdates={this.props.getGSHDS} />)}
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

GSHDList.propTypes = {
  getGSHDS: PropTypes.func.isRequired,
  gshds: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  gshds: state.gshds.gshds
});

export default connect(
  mapStateToProps,
  { getGSHDS }
)(GSHDList);
