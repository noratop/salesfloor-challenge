import React from 'react';

var Map = React.createClass({
  loadMap(ref){
    //subscribe the ref callback to reload the map on new state
    const {store} = this.props;
    this.unsubscribe = store.subscribe(() => {
      this.loadMap(ref);
    });

    //init the googlemap with the props area
    const {location,places} = store.getState();
    const map = new google.maps.Map(ref, {
      ...location,
      // mapTypeControl: false,
      // panControl: false,
      // zoomControl: false,
      streetViewControl: false
    });

    //
    // if (places.geometry) {
    //   const placeService = new google.maps.places.PlacesService(map);
    //   const search = {
    //     location: places.geometry.location,
    //     radius: 5000,
    //     types: ['restaurant']
    //   };
    //
    //   placeService.nearbySearch(search,(results, status)=>{
    //     if (status === google.maps.places.PlacesServiceStatus.OK) {
    //       console.log(results);
    //     }
    //   });
    // }
  },
  render() {
    console.log('render');
    return (
      <div className='columns small-12 medium-8 mapComponent' ref={this.loadMap}></div>
    )
  }
});

export default Map;
