import React, { Component } from 'react';
import './FavoriteList.css';
import ItemList from './ItemList';

class FavoriteList extends Component {
  render() {
    return (
      <div className="favorite-list-background">
        <div id="favorite-list" className="container">
          <div className="favorite-header-title">Favourites</div>
          <ItemList favoriteList={this.props.favoriteList} handleFavourite={this.props.handleFavourite} items={this.props.items} />
        </div>
      </div>
    );
  }
}

export default FavoriteList;
