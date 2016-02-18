import React from 'react';
import {initMap} from '../redux/actionsCreators';

const Map = React.createClass({
  componentDidMount() {
    const {store} = this.props;
    store.dispatch(initMap(this.mapRef));
  },
  render() {
    return (
      <div className={this.props.className} ref={(ref)=>this.mapRef=ref}></div>
    )
  }
});

export default Map;
