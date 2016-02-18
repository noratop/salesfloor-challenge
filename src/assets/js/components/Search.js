import React from 'react';
import RestaurantItem from './RestaurantItem';
import request from 'superagent';
import {fetchRestaurant,setSelectedItem} from '../data/actionsCreators';

const Search = React.createClass({
  getInitialState() {
    return {
      displayResult: false
    };
  },
  componentDidMount() {
    const {store} = this.props;
    this.unsubscribe = store.subscribe(()=>this.forceUpdate());

    //init the google autocomplete
    // const options = {componentRestrictions: {country: 'ca'}};
    const options = {};
    this.autocomplete = new google.maps.places.Autocomplete(this.inputRef, options);
    this.autocomplete.addListener('place_changed', this.handlePlacesChanged);

    //fetch the user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>{
        const geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.setState({userLocation:geolocation});
        store.dispatch(fetchRestaurant(new google.maps.LatLng(geolocation)));

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
    const {store} = this.props;
    const placeResult = this.autocomplete? this.autocomplete.getPlace():{};
    store.dispatch(fetchRestaurant(placeResult.geometry.location));
  },
  getRestaurantList() {
    const {store} = this.props;
    const {places} = store.getState();
    const restaurantList = places.results;

    return restaurantList;
  },
  handleClick(item,i){
    const {store} = this.props;
    store.dispatch(setSelectedItem(item,i));
  },
  nearest10(){
    const {store} = this.props;
    let location = '';
    if (this.autocomplete.getPlace()) {
      location = this.autocomplete.getPlace().geometry.location;
    }
    else {
      location = this.state.userLocation;
    }
    store.dispatch(fetchRestaurant(location));
  },
  searchByRadius(e){
    // e.preventDefault();
    if (e.key === 'Enter'){
      const {store} = this.props;
      let location = '';
      if (this.autocomplete.getPlace()) {
        location = this.autocomplete.getPlace().geometry.location;
      }
      else {
        location = this.state.userLocation;
      }
      store.dispatch(fetchRestaurant(location,this.refs.radius.value));
    }
  },
  toggleResult(){
      this.setState({displayResult:!this.state.displayResult});
  },
  render() {
    const {store} = this.props;
    const {index} = store.getState().item;
    const restaurantList = this.getRestaurantList() || [];

    return (
      <div className={this.props.className}>
        <input
          className='searchBar'
          placeholder='Enter a location'
          ref={(ref)=>this.inputRef=ref}
        />
        <div className='showResult'>
            <a href='#' onClick={this.toggleResult}>{!this.state.displayResult? 'Show results':'Hide results'}</a>
        </div>
        <div className={`searchResult ${this.state.displayResult? 'display':''}`}>
          <div className='searchOptions'>
            <div className='searchOptions__text'>Search by:</div>
            <div className='searchOptions__10'><a href='#' onClick={this.nearest10}>Nearest 10</a></div>
            <input
              className='searchOptions__radius'
              placeholder='Search within a radius (m)'
              ref='radius'
              onKeyUp={this.searchByRadius}
            />
          </div>
          <ul className='restaurant__list'>
            {
              restaurantList.map((item,i)=>{
                return <RestaurantItem
                    onClick={this.handleClick.bind(this,item,i)}
                    key={i}
                    details={item}
                    selected={index===i}
                  />
              })
            }
          </ul>
        </div>
      </div>
    )
  }
});

export default Search;
