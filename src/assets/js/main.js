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
          <Search {...this.props}/>
          <Map {...this.props}/>
        </div>
      </div>
    );
  }
})

ReactDOM.render(<App store={store}/> , document.querySelector('#app'));
