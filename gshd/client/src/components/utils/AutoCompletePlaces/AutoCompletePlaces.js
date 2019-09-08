import React, { Component } from 'react';
import PlacesAutoComplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';

class AutoCompletePlaces extends Component {

  // 'Address' is the actual place name string, which can be converted
  // into lat/lng using geoCodeByAddress method
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      gmapsLoaded: false
    }
  }

  // Used to flag the point at which Google Maps is loaded on page
  initMap = () => {
    this.setState({
      gmapsLoaded: true,
    })
  }
  
  // Include Google Maps script on page
  componentDidMount() {
    window.initMap = this.initMap;
    const gmapScriptEl = document.createElement(`script`);
    gmapScriptEl.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_TOKEN}&libraries=places&callback=initMap`;
    document.querySelector('body').insertAdjacentElement('beforeend', gmapScriptEl);
  }


  onInputChange = (address) => {
    this.setState({ address });
  }

  onSelect = (address) => {

    this.setState({ address });

    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.props.selectionHandler({latLng, address}))
      .catch(error => console.error(`
        Error when trying to get lat/lng: ${error}
      `));
  }

  render() {

    return (
      <div>
        {this.state.gmapsLoaded && (
          <PlacesAutoComplete
            value={this.state.address}
            onChange={this.onInputChange}
            onSelect={this.onSelect}>
            
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: 'Search Places ...',
                    className: 'location-search-input input',
                  })}
                />
                {loading && <div>Loading...</div>}
                
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
          
            )}
          </PlacesAutoComplete>
        )}
      </div>
    )
  }
}

export default AutoCompletePlaces;