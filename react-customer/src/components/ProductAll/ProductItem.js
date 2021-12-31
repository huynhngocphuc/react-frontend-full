import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { actGetProductRequest} from '../../redux/actions/products';
import { startLoading, doneLoading } from '../../utils/loading'
import { connect } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import BeautyStars from 'beauty-stars';
import './style.css'
toast.configure()
let token;
class ProductItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      quantity: 1
    }
  }
  
  handleChange = event => {
    const name = event.target.name;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState({
      [name]: value
    });
  }
  getInfoProduct = (id) => {
    console.log("vào đây để lấy thông tin san phẩm",id)
    this.props.getInfoProduct(id);
  }

  render() {
    const { product} = this.props;
    const { quantity } = this.state;
   
    return (
      <div className="col-lg-3 col-md-4 col-sm-6 mt-40">
        {/* single-product-wrap start */}
        <div className="single-product-wrap">
          <div className="fix-img-div product-image">
            <Link onClick={(id) => this.getInfoProduct(product.productId)} to={`/products/${product.productId}`}>
              <img className="fix-img" src={product.productImage} alt="Li's Product " />
            </Link>
          </div>
          <div className="product_desc">
            <div className="product_desc_info">
              
              <h4><Link className="product_name text-truncate" onClick={(id) => this.getInfoProduct(product.productId)} to={`/products/${product.productId}`}>{product.productName}</Link></h4>
              <div className="price-box">
                <span className="new-price" style={{color: 'red'}}>{product.unitPrice.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span>
              </div>
            </div>
            <div className="add-actions">
              <ul className="add-actions-link">
                <li className="add-cart active"><Link to="#" onClick={() => this.addItemToCart(product)} >Add to cart</Link></li>
                <li><Link onClick={(id) => this.getInfoProduct(product.productId)} to={`/products/${product.productId}`} title="quick view" className="quick-view-btn" data-toggle="modal" data-target="#exampleModalCenter"><i className="fa fa-eye" /></Link></li>
                <li><Link onClick={(id) => this.addItemToFavorite(product.productId)} className="links-details" to="#" title="favorite" ><i className="fa fa-heart-o" /></Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/*// QUICK VIEW */}
        
        {/* single-product-wrap end */}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    getProduct: state.product
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getInfoProduct: (id) => {
      dispatch(actGetProductRequest(id))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductItem)
