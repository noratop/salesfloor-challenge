export function initMap(ref){
  return {
    type: 'INIT_MAP',
    ref
  }
}

export function fetchRestaurant(geolocation){
  return function (dispatch, getState) {
    const map = getState().map;
    const search = {
      // bounds: map.getBounds(),
      location: new google.maps.LatLng(geolocation),
      // radius: 1000,
      types: ['restaurant'],
      rankBy: google.maps.places.RankBy.DISTANCE
    };

    const placeService = new google.maps.places.PlacesService(map);
    placeService.nearbySearch(search,(results, status)=>{
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log('Restaurants');
        dispatch({
          type:'SET_PLACE_RESULT',
          origin:geolocation,
          results
        });
      }
    })
  }
}
