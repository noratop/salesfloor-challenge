import React from 'react';
import {fetchRestaurant,resetSelectedItem} from '../redux/actionsCreators';
import request from 'superagent';


const SearchBar = React.createClass({
  componentDidMount() {
    const {store} = this.props;

    //init the google autocomplete
    const options = {}; //{componentRestrictions: {country: 'ca'} to constraint on country
    this.autocomplete = new google.maps.places.Autocomplete(this.inputRef, options);
    this.autocomplete.addListener('place_changed', this.handlePlacesChanged);

    //fetch the user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>{
        const geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        store.dispatch(fetchRestaurant(new google.maps.LatLng(geolocation)));

        //reverse geocoding to display the location name
        request
        .get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${geolocation.lat},${geolocation.lng}&key=AIzaSyAd2WFdWK8DclKk_BHmEf4o1JQ4v1rk4_o`)
        .end((err,res) => {
          if (err) {
            //dispatch error
          }
          else {
            this.inputRef.value = res.body.results[4].formatted_address;
          }
        });
      });
    }
  },
  handlePlacesChanged () {
    const {store} = this.props;
    const placeResult = this.autocomplete.getPlace() || {};
    store.dispatch(fetchRestaurant(placeResult.geometry.location));
  },
  render () {
    return (
      <div className='searchBar'>
        <input
          className='searchBar__input'
          placeholder='Enter a location'
          ref={(ref)=>this.inputRef=ref}
        />
      </div>
    )
  }
})

export default SearchBar;
