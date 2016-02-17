import React from 'react';
import {initMap} from '../data/actionsCreators';

var Map = React.createClass({
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
    const {map,places} = store.getState();

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

    places.results.some((restaurant,index)=>{
      const markerLetter = String.fromCharCode('A'.charCodeAt(0) + index);
      new google.maps.Marker({
        position: restaurant.geometry.location,
        animation: google.maps.Animation.DROP,
        label: markerLetter,
        map: map
      });

      // return index===10-1;
    })

  },
  render() {
    console.log('render');
    return (
      <div className={this.props.className} ref={(ref)=>this.mapRef=ref}></div>
    )
  }
});

export default Map;
