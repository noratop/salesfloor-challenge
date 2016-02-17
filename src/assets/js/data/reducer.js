import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

//map component reducer
function location(state={
    center: {lat: 45.5017, lng: -73.5673},
    zoom: 4
  }, action) {
    switch (action.type) {
        case 'CHANGE_LOCATION':
        console.log("action.location");
        console.log(action.location);
            return action.location;
        default:
            return state;
    }
}

function places(state={},action){
  switch (action.type) {
    case 'SET_PLACE_RESULT':
    console.log('action.placeResult')
    console.log(action.placeResult)
      return action.placeResult;
    default:
      return state;
  }
}


//combine all reducers
const app = combineReducers({
    location,
    places
});

export let store = createStore(app,applyMiddleware(thunk));
