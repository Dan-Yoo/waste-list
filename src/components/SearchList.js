import React, { Component } from 'react';
import './SearchList.css';
import ItemList from './ItemList';

class SearchList extends Component {
  render() {
    return (
      <div id="search-list">
        <ItemList favoriteList={this.props.favoriteList} handleFavourite={this.props.handleFavourite} items={this.props.items} />
      </div>
    );
  }
}

export default SearchList;
