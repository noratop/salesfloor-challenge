import React from 'react';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';

const Search = React.createClass({
  getInitialState() {
    return {
      displayResult: false
    };
  },
  toggleResult(){
      this.setState({displayResult:!this.state.displayResult});
  },
  render() {
    return (
      <div className={this.props.className}>
        <SearchBar {...this.props}/>
        <div className='showResult'>
            <a href='#' onTouchTap={this.toggleResult}>{!this.state.displayResult? 'Show results':'Hide results'}</a>
        </div>
        <SearchResult {...this.props} displayResult={this.state.displayResult}/>
      </div>
    )
  }
});

export default Search;
