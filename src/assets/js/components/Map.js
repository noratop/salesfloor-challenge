import React from 'react';
import {initMap} from '../data/actionsCreators';

const Map = React.createClass({
  getInitialState() {
    return {
      counter:0,
      markers:[],
      selectedItemIndex:0,
    };
  },
  componentDidMount() {
    const {store} = this.props;
    store.dispatch(initMap(this.mapRef));
    this.unsubscribe = store.subscribe(this.updateMap);
  },
  componentWillUnmount() {
    this.unsubscribe();
  },
  updateMap(){
    const counter = this.props.store.getState().places.counter;

    //focus on the new location
    this.focusMap();

    //counter keeps track of performed search
    //if counter has changed, equal new location, redraw the markers, else highlight the selected restaurant
    if(this.state.counter !== counter) {
      //add new Markers on map
      const markers = this.addNewMarkers();
      this.setState({
        markers,
        counter
      });
    }
    else {
      this.highlightSelectedItem();
    }
  },
  focusMap(){ //zoom the map on the new location and add a marker
    const {map,places} = this.props.store.getState();

    map.panTo(places.origin);
    map.setZoom(16);

    new google.maps.Marker({
      position: map.getCenter(),
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 5
      },
      map: map
    });
  },
  addNewMarkers(){
    const {map,places} = this.props.store.getState();
    let markers = [];

    //remove all current markers
    this.state.markers.forEach((marker)=>{
        marker.setMap(null);
    })

    places.results.some((restaurant,index)=>{
      markers[index] = new google.maps.Marker({
        position: restaurant.geometry.location,
        animation: google.maps.Animation.DROP,
        label: restaurant.markerLetter,
        opacity: 0.55,
        map: map
      });
      if (!places.radius) {return index===10-1;} //limit the result to 10 if search is performed by nearest10
    })

    return markers;
  },
  highlightSelectedItem(){ //selected restaurant => remove the previous highlight and highlight the new one with animation, adn focus the map in it
    const {map,places} = this.props.store.getState();
    const {selectedItem,selectedItemIndex} = places;

    map.panTo(selectedItem.geometry.location);
    this.state.markers[this.state.selectedItemIndex].setOpacity(0.55);
    this.state.markers[selectedItemIndex].setOpacity(1);
    this.state.markers[selectedItemIndex].setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(()=>{ this.state.markers[selectedItemIndex].setAnimation(null); }, 150);
    this.setState({selectedItemIndex});
  },
  render() {
    return (
      <div className={this.props.className} ref={(ref)=>this.mapRef=ref}></div>
    )
  }
});

export default Map;
