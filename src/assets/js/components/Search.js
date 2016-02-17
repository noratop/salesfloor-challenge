import React from 'react';
import RestaurantItem from './RestaurantItem';
import request from 'superagent';
import {fetchRestaurant} from '../data/actionsCreators';

var Search = React.createClass({
  componentDidMount() {
    const {store} = this.props;
    this.unsubscribe = store.subscribe(()=>this.forceUpdate());

    //init the google autocomplete
    const options = {componentRestrictions: {country: 'ca'}};
    this.autocomplete = new google.maps.places.Autocomplete(this.inputRef, options);
    this.autocomplete.addListener('place_changed', this.handlePlacesChanged);

    //fetch the user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>{
        const geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        store.dispatch(fetchRestaurant(geolocation));

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
  componentWillUnmount() {
    this.unsubscribe();
  },
  handlePlacesChanged () {
    console.log('change');

    // const {store} = this.props;
    // const placeResult = this.autocomplete? this.autocomplete.getPlace():{};
    // if (placeResult) {
    //   store.dispatch({
    //     type: 'SET_PLACE_RESULT',
    //     placeResult
    //   });
    // }
  },
  getRestaurantList() {
    const {store} = this.props;
    const {places} = store.getState();
    const restaurantList = places.results;

    return restaurantList;
  },
  render() {
    const restaurantList = this.getRestaurantList() || [];

    return (
      <div className={this.props.className}>
        <input
          className='searchInput'
          placeholder='Enter a location'
          ref={(ref)=>this.inputRef=ref}
        />
      <div>Sort by</div>
        <ul className='restaurant__list'>
          {
            restaurantList.map((item)=>{
              return <RestaurantItem key={item.id} details={item}/>
            })
          }
        </ul>
      </div>
    )
  }
});

export default Search;
