import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

let token;
class HeaderMiddle extends Component {

  render() {
    return (
      <div className="header-middle pl-sm-0 pr-sm-0 pl-xs-0 pr-xs-0">
        <div className="container">
          <div className="row">
            {/* Begin Header Logo Area */}
            <div className="col-lg-3">
              <div className="logo pb-sm-30 pb-xs-30">
                <Link to="/">
                  <img src="https://bom.so/jAsWYA"
                    style={{
                      width: '180px',
                      height: '48px',
                      borderRadius: '15px',
                      boxShadow:'inset 0 -3em 3em rgba(0,0,0,0.1),0 0  0 2px rgb(255,255,255), 0.3em 0.3em 1em rgba(0,0,0,0.3)'
                    }}
                  alt="" />
                </Link>
              </div>
            </div>
            {/* Header Logo Area End Here */}
            {/* Begin Header Middle Right Area */}
            <div className="col-lg-9 pl-0 ml-sm-15 ml-xs-15">
              {/* Begin Header Middle Searchbox Area */}
              <form className="hm-searchbox">
                <input name="textSearch" type="text" placeholder="Tìm kiếm sản phẩm ..." />
                {/* <button className="li-btn" type="submit"></button> */}
                <Link to='/products/search'>
                  <button className="li-btn" type="submit"><i className="fa fa-search" /></button>
                </Link>
              </form>
              {/* Header Middle Searchbox Area End Here */}
              {/* Begin Header Middle Right Area */}
              <div className="header-middle-right">
                <ul className="hm-menu">
                  {/* Begin Header Middle Wishlist Area */}
                  <li className="hm-wishlist">
                    <Link to="/product-favorites">
                      <span className="cart-item-count wishlist-item-count"></span>
                      <i className="far fa-heart" />
                    </Link>
                  </li>
                  {/* Header Middle Wishlist Area End Here */}
                  {/* Begin Header Mini Cart Area */}
                  <li className="hm-minicart">
                    <Link to="/cart">
                      <div className="hm-minicart-trigger">
                      <i className="item-icon fab fa-opencart"></i>
                        <span className="item-text">
                          <span className="cart-item-count"></span>
                        </span>
                      </div>
                    </Link>
                    <span />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}



export default (HeaderMiddle)
