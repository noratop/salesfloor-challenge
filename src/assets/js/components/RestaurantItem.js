import React from 'react'

const RestaurantItem = React.createClass({
  // getPhoto(){
  //   const {details} = this.props;
  //
  //   if (details.photos) {
  //     const url = details.photos[0].getUrl({'maxWidth': 100, 'maxHeight': 100});
  //     return (
  //       <img src={url}/>
  //     )
  //   }
  //   else {
  //     return '';
  //   }
  // },
  render () {
    const {details,selected} = this.props;
    // console.log(`render ${details.name}`);

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
