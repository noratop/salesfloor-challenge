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
    const {details} = this.props;

    return (
      <li className='restaurant__item'>
        <div className=''>
          <p>{details.name}</p>
        </div>
      </li>
    )
  }
})

export default RestaurantItem;
