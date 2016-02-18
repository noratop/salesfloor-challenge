import React from 'react'
import RestaurantItem from './RestaurantItem';
import {fetchRestaurant,setSelectedItem} from '../data/actionsCreators';

const SearchResult = React.createClass({
  componentDidMount() {
    const {store} = this.props;
    this.unsubscribe = store.subscribe(()=>this.forceUpdate());
  },
  componentWillUnmount() {
    this.unsubscribe();
  },
  getRestaurantList() {
    const {store} = this.props;
    const {places} = store.getState();
    const restaurantList = places.results;

    return restaurantList;
  },
  handleClick(item,i){
    const {store} = this.props;
    store.dispatch(setSelectedItem(item,i));
  },
  findNearest10(){
    const {store} = this.props;
    const {origin} = store.getState().places;
    store.dispatch(fetchRestaurant(origin));
  },
  findByRadius(e){
    if (e.key === 'Enter'){
      const {store} = this.props;
      const {origin} = store.getState().places;
      store.dispatch(fetchRestaurant(origin,this.refs.radius.value));
    }
  },
  toggleResult(){
      this.setState({displayResult:!this.state.displayResult});
  },
  render () {
    const {store} = this.props;
    const {selectedItemIndex} = store.getState().places;
    const restaurantList = this.getRestaurantList() || [];

    return (
      <div className={`searchResult ${this.props.displayResult? 'display':''}`}>
        <div className='searchOptions'>
          <div className='searchOptions__text'>Search by:</div>
          <div className='searchOptions__10'><a href='#' onClick={this.findNearest10}>Nearest 10</a></div>
          <input
            className='searchOptions__radius'
            placeholder='Find within a radius (m)'
            ref='radius'
            onKeyUp={this.findByRadius}
          />
        </div>
        <ul className='restaurant__list'>
          {
            restaurantList.map((item,i)=>{
              return <RestaurantItem
                  onClick={this.handleClick.bind(this,item,i)}
                  key={i}
                  details={item}
                  selected={selectedItemIndex===i}
                />
            })
          }
        </ul>
    </div>
    )
  }
})

export default SearchResult;
