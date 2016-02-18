export function initMap(ref){
  return {
    type: 'INIT_MAP',
    ref
  }
}

//geolocation as a google LatLng object
export function fetchRestaurant(geolocation,radius){
  return function (dispatch, getState) {
    const map = getState().map;
    let search = {
      // bounds: map.getBounds(),
      location: geolocation,
      types: ['restaurant'],
    };
    if (radius) {
      search = {...search, radius}
    }
    else {
      search = {...search, rankBy: google.maps.places.RankBy.DISTANCE}
    }

    const placeService = new google.maps.places.PlacesService(map);
    placeService.nearbySearch(search,(results, status)=>{
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        if (!radius) {results = results.slice(0,9)}
        results.map((el,i)=>{
          el.markerLetter = String.fromCharCode('A'.charCodeAt(0) + i);
          return el;
        });
        dispatch({
          type:'SET_PLACE_RESULT',
          origin:geolocation,
          results,
          radius
        });
      }
    })
  }
}

export function setSelectedItem(item,i){
  return {
    type:'SET_SELECT_ITEM',
    selectedItem:item,
    index:i
  }
}

export function resetSelectedItem(){
  return {
    type:'RESET_SELECT_ITEM'
  }
}
