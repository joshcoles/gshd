import React, { Component } from 'react';
import PlacesAutoComplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';

// https://www.npmjs.com/package/react-places-autocomplete

class AutoCompletePlaces extends Component {

  constructor(props) {
    super(props);
    this.state = {
      address: '',
      gmapsLoaded: false
    }
  }

  initMap = () => {
    this.setState({
      gmapsLoaded: true,
    })
  }
  
  componentDidMount() {
    window.initMap = this.initMap
    const gmapScriptEl = document.createElement(`script`)
    gmapScriptEl.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_TOKEN}&libraries=places&callback=initMap`
    document.querySelector(`body`).insertAdjacentElement(`beforeend`, gmapScriptEl)
  }

  onInputChange = (address) => {
    this.setState({ address });
  }

  onSelect = (address) => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log(`Success:`, latLng))
      .catch(error => console.error(`Error: ${error}`));
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
                    className: 'location-search-input',
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