import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

//map reducer
function map(state={},action){
  switch (action.type) {
    case 'INIT_MAP':
      const map = new google.maps.Map(action.ref, {
        center: {lat: 45.5017, lng: -73.5673},
        zoom: 4,
        // mapTypeControl: false,
        // panControl: false,
        // zoomControl: false,
        streetViewControl: false
      });
      return map;
      break;
    default:
      return state;
  }
}

//restaurant reducer
function places(state={},action){
  switch (action.type) {
    case 'SET_PLACE_RESULT':
    console.log('SET_PLACE_RESULT');
    console.log(action.origin);
    console.log(action.results);
      return {
        origin: action.origin,
        results: action.results
      };
    default:
      return state;
  }
}


//combine all reducers
const app = combineReducers({
    map,
    places
});

export let store = createStore(app,applyMiddleware(thunk));
