export function initMap(ref,area){


  return {
    type: 'INIT_MAP',
    map
  };
}

export function changeArea(area){
  return {
    type:'CHANGE_AREA',
    area
  }
}

export function changeMapBounds(geometry){
  return function (dispatch, getState) {
    const newMap = {...getState().map, getplace}

    dispatch({
      type:'CHANGE_BOUNDS',
      newMap
    });
  }
}
