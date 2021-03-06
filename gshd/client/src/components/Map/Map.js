import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

/*
  Built following this guide:
  https://dev.to/jessicabetts/how-to-use-google-maps-api-and-react-js-26c2
*/
 
// Fetch API token from .env
const googleMapsApiToken = process.env.REACT_APP_GOOGLE_MAPS_API_TOKEN;

class GoogleMap extends Component {

  render() {    
    return (
      <Map
        google={this.props.google}
        zoom={12}
        initialCenter={{ lat: 43.6426, lng: -79.3871}}>
        {
          this.props.gshds.map((gshd, index) => {
            const lng = this.props.gshds[index].gshd_geometry.coordinates[0];
            const lat = this.props.gshds[index].gshd_geometry.coordinates[1];

            return (
              <Marker key={index} position={{ lat: lat, lng: lng }}/>
            )
          })
        }
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: `${googleMapsApiToken}`
})(GoogleMap);

