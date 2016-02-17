import React  from 'react';
import ReactDOM  from 'react-dom';
import Search from './components/Search';
import Map from './components/Map';
import {store} from './data/reducer';

const App = React.createClass({
  render() {
    return (
      <div>
        <div className='row collapse align-stretch main-container'>
          <Search {...this.props} className='columns small-12 medium-4'/>
          <Map {...this.props} className='columns small-12 medium-8 mapComponent'/>
        </div>
      </div>
    );
  }
})

ReactDOM.render(<App store={store}/> , document.querySelector('#app'));
