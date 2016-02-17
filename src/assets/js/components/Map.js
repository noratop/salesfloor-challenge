import React from 'react';

var Map = React.createClass({
  componentDidMount() {
    const {store} = this.props;
    const {location,places} = store.getState();

    this.unsubscribe = store.subscribe(this.updateMap);

    this.map = new google.maps.Map(this.mapRef, {
      ...location,
      // mapTypeControl: false,
      // panControl: false,
      // zoomControl: false,
      streetViewControl: false
    });
  },
  updateMap(){
    console.log('update map');

    let {map} = this;
    const {store} = this.props;
    const {location,places} = store.getState();

    //zoom the map on the new location
    map.panTo(location.center);
    map.setZoom(15);

    const placeService = new google.maps.places.PlacesService(map);
    const search = {
      bounds: map.getBounds(),
      types: ['restaurant']
    };

    placeService.nearbySearch(search,(results, status)=>{
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log('Restaurants');
        console.log(results);
      }
    });
  },
  // loadMap(ref){
  //   console.log("load map");
  //   this.mapRef = ref;
  //   const {store} = this.props;
  //   //subscribe the ref callback to reload the map on new state
  //   this.unsubscribe = store.subscribe(() => {
  //     this.loadMap(ref);
  //   });
  //
  //   //init the googlemap with the props area
  //   const {location,places} = store.getState();
  //
  //
  //   //
  //   if (places.geometry) {
  //     const placeService = new google.maps.places.PlacesService(map);
  //     const search = {
  //       location: places.geometry.location,
  //       radius: 5000,
  //       types: ['restaurant']
  //     };
  //
  //     placeService.nearbySearch(search,(results, status)=>{
  //       if (status === google.maps.places.PlacesServiceStatus.OK) {
  //         console.log('Restaurants');
  //         console.log(results);
  //       }
  //     });
  //   }
  // },
  render() {
    console.log('render');
    return (
      <div className={this.props.className} ref={(ref)=>this.mapRef=ref}></div>
    )
  }
});

export default Map;
