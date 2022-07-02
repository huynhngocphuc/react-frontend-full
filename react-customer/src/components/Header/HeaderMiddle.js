import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { toast } from 'react-toastify';
import { connect } from 'react-redux'
import { actFetchCartRequest } from '../../redux/actions/cart';
import { startLoading, doneLoading } from '../../utils/loading'
import { actGetProductOfKeyRequest } from '../../redux/actions/products'



let token,id;
class HeaderMiddle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textSearch: ''
    }
  }
  componentDidMount() {
    token = localStorage.getItem("_auth");
    id = localStorage.getItem("_id");
    if(token){
      this.props.fetch_items(id);
    }
      
  }

  
  handleChange = event => {
    const name = event.target.name;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState({
      [name]: value
    });
  }
  handleClick = async () => {
    const { textSearch } = this.state;
    if (textSearch === '' || textSearch === null) {
      return toast.error('Vui lòng nhập sản phẩm cần tìm ...');
    }
    else {
      startLoading();
      await this.props.searchProduct(textSearch);
      this.setState({
        textSearch: ''
      })
      doneLoading();
    }

  }

  render() {
    const { textSearch } = this.state;
    const { countCart } = this.props;
    let count = 0;
    console.log(countCart)

    if (countCart.length > 0) {
      countCart.forEach(item => {
       count+=item.quantity
      });    
    }
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
                      boxShadow: 'inset 0 -3em 3em rgba(0,0,0,0.1),0 0  0 2px rgb(255,255,255), 0.3em 0.3em 1em rgba(0,0,0,0.3)'
                    }}
                    alt="" />
                </Link>
              </div>
            </div>
            {/* Header Logo Area End Here */}
            {/* Begin Header Middle Right Area */}
            <div className="col-lg-9 pl-0 ml-sm-15 ml-xs-15">
              {/* Begin Header Middle Searchbox Area */}
              <form className="hm-searchbox" >
                <input
                  name="textSearch"
                  value={textSearch}
                  onChange={this.handleChange}
                  type="text"
                  placeholder="Tìm kiếm sản phẩm ..." />
                {/* <button className="li-btn" type="submit"></button> */}
                <Link
                  onClick={this.handleClick}
                  to={`/search/${textSearch}`}>
                  <button className="li-btn" type="submit"><i className="fa fa-search" /></button>
                </Link>
              </form>
              {/* Header Middle Searchbox Area End Here */}
              {/* Begin Header Middle Right Area */}
              <div className="header-middle-right">
                <ul className="hm-menu">
                  {/* Begin Header Middle Wishlist Area */}
                  {/* <li className="hm-wishlist">
                    <Link to="/product-favorites">
                      <span className="cart-item-count wishlist-item-count"></span>
                      <i className="far fa-heart" />
                    </Link>
                  </li> */}
                  {/* Header Middle Wishlist Area End Here */}
                  {/* Begin Header Mini Cart Area */}
                  <li className="hm-minicart">
                    <Link to="/cart">
                      <div className="hm-minicart-trigger">
                        <i className="item-icon fab fa-opencart"></i>
                        <span className="item-text">
                          <span className="cart-item-count">{count}</span>
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

const mapStateToProps = (state) => {
  return {
    countCart: state.cart
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchProduct: (key) => {
      dispatch(actGetProductOfKeyRequest(key))
    },
    fetch_items: (id) => {
      dispatch(actFetchCartRequest(id))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(HeaderMiddle)
