import React from 'react';
import {changeArea} from '../data/actionsCreators';

var Search = React.createClass({
  loadAutocomplete(ref) {
    const {store} = this.props;

    //init the google autocomplete
    const options = {componentRestrictions: {country: 'ca'}};
    this.autocomplete = new google.maps.places.Autocomplete(ref, options);

    this.autocomplete.addListener('place_changed', this.handlePlacesChanged);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>{

        console.log(position);

        const geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        const circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        });
        this.autocomplete.setBounds(circle.getBounds());

        store.dispatch({
          type:'CHANGE_LOCATION',
          location: {
            center:geolocation,
            zoom:14
          }
        });

        // const placeResult = this.autocomplete? this.autocomplete.getPlace():{};
        // console.log(placeResult);
        // store.dispatch({
        //   type: 'SET_PLACE_RESULT',
        //   placeResultjanvier
        // });
      });
    }
  },
  handlePlacesChanged () {
    const {store} = this.props;
    const placeResult = this.autocomplete? this.autocomplete.getPlace():{};
    store.dispatch({
      type: 'SET_PLACE_RESULT',
      placeResult
    });
    // console.log(placeResult.geometry.location);
    // const markers = [];
    //
    // // Add a marker for each place returned from search bar
    // places.forEach(function (place) {
    //   markers.push({
    //     position: place.geometry.location
    //   });
    // });
    //
    // // Set markers; set map center to first search result
    // const mapCenter = markers.length > 0 ? markers[0].position : this.state.center;
    //
    // this.setState({
    //   center: mapCenter,
    //   markers: markers
    // });
    //
    // return;
  },
  render() {
    return (
      <div className='columns small-12 medium-4'>
        <input
          className='searchInput'
          placeholder='Enter a location'
          ref={this.loadAutocomplete}
          // onChange= {this.handlePlacesChanged}
        />
      </div>
    )
  }
});

export default Search;
