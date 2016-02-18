import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

//map reducer, required to access the map Object in the store when dispatching from the SearchBar component
function map(state={},action){
  switch (action.type) {
    case 'INIT_MAP':
      const map = new google.maps.Map(action.ref, {
        center: {lat: 45.5017, lng: -73.5673},
        zoom: 4,
        streetViewControl: false
      });
      return map;
      break;
    default:
      return state;
  }
}

//restaurant reducer
function places(state={counter:0},action){
  switch (action.type) {
    case 'SET_PLACE_RESULT':
    console.log('SET_PLACE_RESULT');
      return {
        origin: action.origin,
        results: action.results,
        counter: ++state.counter,
        radius: action.radius,
        markers: action.markers
      };
    case 'SET_SELECT_ITEM':
    console.log('SET_SELECT_ITEM');
      return {
        ...state,
        selectedItem:action.selectedItem,
        selectedItemIndex:action.index
      };
    default:
      return state;
  }
}

//combine reducers
const app = combineReducers({
    map,
    places
});

export let store = createStore(app,applyMiddleware(thunk));
