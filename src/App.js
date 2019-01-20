import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import SearchList from './components/SearchList';
import FavoriteList from './components/FavoriteList';

class App extends Component {
  apiRequestAddress = 'https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=100'
  favoriteStorageKey = 'favorite-items';
  state = {
    searchList: [],
    favoriteList: {}
  }

  constructor(props) {
    super(props);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleFavourite = this.handleFavourite.bind(this);
  }

  componentDidMount() {
    const faveItems = JSON.parse(localStorage.getItem(this.favoriteStorageKey));
    
    if (faveItems) this.setState({favoriteList: faveItems});
  }

  async handleSearchSubmit(searchText) {
    if (searchText === '') return;
    
    this.setState({searchList: []});

    const data = await this.fetchData();

    for (let item of data) {
      if (item.keywords.includes(searchText)) this.setState({searchList: [...this.state.searchList, item]});
    }
  }

  async fetchData() {
    let data = JSON.parse(sessionStorage.getItem('items'));
    if (data) return data;

    const response = await fetch(this.apiRequestAddress);
    data = await response.json();    
    sessionStorage.setItem('items', JSON.stringify(data));
    return data;
  }

  handleReset() {
    this.setState({searchList: []});
  }

  async handleFavourite(item) {
    if (item.title in this.state.favoriteList) {
      const newState = this.state.favoriteList;
      delete this.state.favoriteList[item.title];
      await this.setState({favoriteList: newState});
    } else {
      await this.setState({
        favoriteList: {
          ...this.state.favoriteList,
          [item.title]: item
        }
      });
    }

    localStorage.setItem(this.favoriteStorageKey, JSON.stringify(this.state.favoriteList));
  }

  render() {
    return (
      <main>
        <Header></Header>
        <div className="container">
          <SearchBar handleReset={this.handleReset} searchSubmit={this.handleSearchSubmit} />
          <SearchList handleFavourite={this.handleFavourite} 
            items={this.state.searchList} 
            favoriteList={this.state.favoriteList}/>
        </div>
        {Object.keys(this.state.favoriteList).length > 0 ? 
          <FavoriteList handleFavourite={this.handleFavourite} 
            items={this.state.favoriteList} 
            favoriteList={this.state.favoriteList} /> : null }
      </main>
    );
  }
}

export default App;
