import React from 'react'

const RestaurantItem = React.createClass({
  render () {
    const {details,selected} = this.props;
    return (
      <li className={`restaurant__item ${selected? 'restaurant__item--selected':''}`} onClick={this.props.onClick}>
        <div className='restaurant__item__details'>
          <h3>{details.name}</h3>
          <p>{details.vicinity}</p>
        </div>
        <div className='restaurant__item__letter'>
          <p>{details.markerLetter}</p>
        </div>
      </li>
    )
  }
})

export default RestaurantItem;
