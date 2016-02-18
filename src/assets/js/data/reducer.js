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
function places(state={counter:0},action){
  switch (action.type) {
    case 'SET_PLACE_RESULT':
    console.log('SET_PLACE_RESULT');
      return {
        origin: action.origin,
        results: action.results,
        counter: ++state.counter,
        radius: action.radius
      };
    default:
      return state;
  }
}

function item(state={},action){
  switch (action.type) {
    case 'SET_SELECT_ITEM':
      return {
        selectedItem:action.selectedItem,
        index:action.index
      };
    default:
      return state;
  }
}


//combine all reducers
const app = combineReducers({
    map,
    places,
    item
});

export let store = createStore(app,applyMiddleware(thunk));
