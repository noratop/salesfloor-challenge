import React from 'react';
import {changeArea} from '../data/actionsCreators';
import request from 'superagent';

var Search = React.createClass({
  componentDidMount() {
    const {store} = this.props;

    //init the google autocomplete
    const options = {componentRestrictions: {country: 'ca'}};
    this.autocomplete = new google.maps.places.Autocomplete(this.inputRef, options);
    // console.log(this.autocomplete);
    this.autocomplete.addListener('place_changed', this.handlePlacesChanged);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>{

        const geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        store.dispatch({
          type:'CHANGE_LOCATION',
          location: {
            center:geolocation,
            zoom:14
          }
        });

        request
        .get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${geolocation.lat},${geolocation.lng}&key=AIzaSyAd2WFdWK8DclKk_BHmEf4o1JQ4v1rk4_o`)
        .end((err,res) => {
            if (err) {
                //dispatch error
            }
            else {
              // console.log(res);
              this.inputRef.value = res.body.results[4].formatted_address;
            }
        })

        //Bound the autocomplete to the user location
        const circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        });
        this.autocomplete.setBounds(circle.getBounds());

      });
    }
  },
  handlePlacesChanged () {
    console.log('change');

    const {store} = this.props;
    const placeResult = this.autocomplete? this.autocomplete.getPlace():{};
    if (placeResult) {
      store.dispatch({
        type: 'SET_PLACE_RESULT',
        placeResult
      });
    }
  },
  render() {
    return (
      <div className={this.props.className}>
        <input
          className='searchInput'
          placeholder='Enter a location'
          ref={(ref)=>this.inputRef=ref}
        />
      </div>
    )
  }
});

export default Search;
