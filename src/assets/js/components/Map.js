import React from 'react';
import {initMap} from '../data/actionsCreators';
require('../lib/map-icons.min.js');

const Map = React.createClass({
  getInitialState() {
    return {
      counter:0,
      markers:[],
      itemIndex:0,
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
    console.log('update map');

    const {store} = this.props;
    const {map,places,item} = store.getState();
    const counter = places.counter;

    //zoom the map on the new location and add a marker
    map.panTo(places.origin);
    map.setZoom(16);
    const marker = new google.maps.Marker({
      position: map.getCenter(),
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 5
      },
      map: map
    });

    //if counter has changed, equal new location, redraw the markers, else highlight the selected restaurant
    if(this.state.counter !== counter) {
      this.setState({counter});

      //remove all markers
      this.state.markers.forEach((marker)=>{
          marker.setMap(null);
      })

      //add new Markers on map
      const markers = [];
      places.results.some((restaurant,index)=>{
        markers[index] = new google.maps.Marker({
          position: restaurant.geometry.location,
          animation: google.maps.Animation.DROP,
          label: restaurant.markerLetter,
          opacity: 0.5,
          map: map
        });

        if (!places.radius) {return index===10-1;}
      })
      this.setState({
        markers,
        itemIndex:0
      });
    }
    else { //selected restaurant => remove the previous highlight and highlight the new one with animation, adn focus the map in it
      map.panTo(item.selectedItem.geometry.location);
      this.state.markers[this.state.itemIndex].setOpacity(0.5);
      this.state.markers[item.index].setOpacity(1);
      this.state.markers[item.index].setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(()=>{ this.state.markers[item.index].setAnimation(null); }, 150);
      this.setState({itemIndex:item.index});
    }
  },
  render() {
    console.log('render map');
    return (
      <div className={this.props.className} ref={(ref)=>this.mapRef=ref}></div>
    )
  }
});

export default Map;
