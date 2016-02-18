export function initMap(ref){
  return {
    type: 'INIT_MAP',
    ref
  }
}

//geolocation as a google LatLng object
export function fetchRestaurant(geolocation,radius){
  return function (dispatch, getState) {
    const {map,places} = getState();
    const {markers} = places;

    let search = {
      location: geolocation,
      types: ['restaurant'],
    };

    if (radius) search.radius = radius;
    else search.rankBy = google.maps.places.RankBy.DISTANCE;

    const placeService = new google.maps.places.PlacesService(map);

    placeService.nearbySearch(search,(results, status)=>{
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        let newMarkers = [];

        if (!radius) {results = results.slice(0,9)}

        //remove all current markers
        if (markers) markers.forEach((marker)=>{
            marker.setMap(null);
        })

        //focus on new location
        map.panTo(geolocation);
        map.setZoom(16);
        new google.maps.Marker({
          position: map.getCenter(),
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 5
          },
          map: map
        });

        //add newMarkers and assign a letter
        results = results.map((el,i)=>{
          const letter = String.fromCharCode('A'.charCodeAt(0) + i);
          el.markerLetter = letter;

          newMarkers[i] = new google.maps.Marker({
            position: el.geometry.location,
            animation: google.maps.Animation.DROP,
            label: letter,
            opacity: 0.55,
            map: map
          });

          return el;
        });

        dispatch({
          type:'SET_PLACE_RESULT',
          origin:geolocation,
          markers:newMarkers,
          results,
          radius
        });
      }
    })
  }
}

export function setSelectedItem(item,i){
  return function (dispatch, getState) {
    const {map,places} = getState();
    const {selectedItem,selectedItemIndex} = places;
    const {markers} = places;

    map.panTo(item.geometry.location);
    if (markers[selectedItemIndex]) markers[selectedItemIndex].setOpacity(0.55);
    markers[i].setOpacity(1);
    markers[i].setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(()=>{markers[i].setAnimation(null); }, 150);
    // this.setState({selectedItemIndex});

    dispatch({
      type:'SET_SELECT_ITEM',
      selectedItem:item,
      index:i
    });
  }
}
export function resetSelectedItem(){
  return {
    type:'RESET_SELECT_ITEM'
  }
}
