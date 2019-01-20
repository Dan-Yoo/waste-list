import React, { Component } from 'react';
import logo from '../img/search-icon.svg';

class SearchBar extends Component {
  state = {
    searchText: ''
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleChange(e) {
    await this.setState({searchText: e.target.value});
    if (this.state.searchText === '') this.props.handleReset();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.searchSubmit(this.state.searchText);
  }

  render() {
    return (
      <form id="search-bar" onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.searchText} onChange={this.handleChange} />
        <button type="submit"><img src={logo} alt="" /></button>
      </form>
    );
  }
}

export default SearchBar;
