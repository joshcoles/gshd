import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

// https://dev.to/jessicabetts/how-to-use-google-maps-api-and-react-js-26c2

const googleMapsApiToken = process.env.REACT_APP_GOOGLE_MAPS_API_TOKEN;

class GoogleMap extends Component {
    render(props) {
  
    return (
      <Map
        height="500"
        width="500"
        google={this.props.google}
        zoom={2}
        initialCenter={{ lat: 47.444, lng: -122.176}}>
          {/* <Marker position={{ lat: 47.444, lng: -122.176 }}/> */}
        {
          this.props.gshds.map((gshd, index) => {
            const lat = this.props.gshds[index].gshd_geometry.coordinates[0];
            const lng = this.props.gshds[index].gshd_geometry.coordinates[1];
            return (
              <Marker key={index} position={{ lat: lat, lng: lng }}/>
              // <div key={index} position={{ 
              //   lat: 48.123, 
              //   lng: 122.244
              // }}></div>
              
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

