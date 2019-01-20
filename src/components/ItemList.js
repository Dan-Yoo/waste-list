import React, { Component } from 'react';
import faveStar from '../img/favorite-star.svg';
import faveStarGreen from '../img/favorite-star-green.svg';
import './ItemList.css';

class ItemList extends Component {
  state = {
    test: '&lt;ul&gt; \n &lt;li&gt;Empty and rinse (if necessary and possible) this item before placing it in the&amp;nbsp;&lt;strong&gt;Blue Bin&lt;/strong&gt;.&lt;/li&gt; \n&lt;/ul&gt;'
  }

  constructor(props) {
    super(props);
    this.htmlDecode = this.htmlDecode.bind(this);
  }

  htmlDecode(input){
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }

  render() {
    return (
      <div id="item-list">
        {Object.keys(this.props.items).map((key, index) => {
          let item = this.props.items[key];
          let imageSrc = (item.title in this.props.favoriteList) ? faveStarGreen : faveStar;

          return <div key={index} className="search-item">
            <div className="search-item-title">
              <div className="icon-container">
                <img onClick={() => {this.props.handleFavourite(item)}} alt="" className="fave-icon" src={imageSrc} />
              </div>
              <div className="title-container">
                {item.title}
              </div>  
            </div>
            <div className="search-item-description">
                <div dangerouslySetInnerHTML={{__html: this.htmlDecode(item.body)}} />
            </div>
          </div>
        })}
      </div>
    );
  }
}

export default ItemList;
