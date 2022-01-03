import React, { Component } from "react";

import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { actGetProductRequest } from "../../redux/actions/products";
import { actAddCartRequest } from "../../redux/actions/cart";
import callApi from "../../utils/apiCaller";

import "./style.css";
toast.configure();

let token;
let id;
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "500px"
  }
};
class ProductViewDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      redirectYourLogin:false
    };
  }

  async componentDidMount() {
    token = localStorage.getItem("_auth");
    const { id } = this.props;
    const res = await callApi(`view/product/${id}`, "GET");
    if (res && res.status === 200) {
      this.props.get_product(id);
    }
  }
  upItem = (quantity) => {
    if (quantity >= 5) {
      toast.error('Tối đa 5 sản phẩm')
      return
    }
    this.setState({
      quantity: quantity + 1
    })
  }
  downItem = (quantity) => {
    if (quantity <= 1) {
      return
    }
    this.setState({
      quantity: quantity - 1
    })
  }
  handleChange = event => {
    let name = event.target.name;
    let value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    this.setState({
      [name]: value
    });
  };

  addItemToCart = product => {
    const { quantity} = this.state;
    
    token = localStorage.getItem("_auth");
    id = parseInt(localStorage.getItem("_id"));
    if(!token){
      this.setState({
        redirectYourLogin: true
      }) 
    }
    else {
      this.setState({
        redirectYourLogin: false
      })
      this.props.addCart(id,product, quantity);
    }
    
  };
  render() {
    const { product,user } = this.props;
    const { quantity,redirectYourLogin } = this.state;
    console.log("thông tin sản phẩm", quantity,user)
    if (redirectYourLogin) {
      return <Redirect to="/login-register"></Redirect>
    }
    return (
      <div className="content-wraper">
        <div className="container">
          <div className="row single-product-area">
            <div className="col-lg-5 col-md-6 mt-2">

              <div className="product-details-left">
                <div className="product-details-images slider-navigation-1">
                  {/* <div className="lg-image"> */}
                  <div className="fix-width-slick">

                    <img className="fix-img" src={product.productImage} alt="Li's Product " />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-md-6">
              <div className="product-details-view-content sp-normal-content pt-60">
                <div className="product-info">
                  <h2>{product.productName}</h2>

                  <div className="price-box pt-20">
                    <span className="new-price new-price-2">
                      {product && product.unitPrice? product.unitPrice.toLocaleString('it-IT', {style : 'currency', currency : 'VND'}):null}
                    </span>
                  </div>
                  <div className="product-desc">
                    <p>
                      <span dangerouslySetInnerHTML={{ __html: product.descriptionProduct }}></span>
                    </p>
                  </div>
                  <div className="single-add-to-cart">
                    <form className="cart-quantity">
                      <div className="quantity">
                        <label>Số lượng</label>
                        <div className="cart-plus-minus">
                          <input
                            onChange={() => { }}
                            className="cart-plus-minus-box"
                            value={quantity ? quantity : 1}
                            type="text"
                          />
                          <div onClick={() => this.downItem(quantity)} className="dec qtybutton">
                            <i className="fa fa-angle-down" />
                          </div>
                          <div onClick={() => this.upItem(quantity)} className="inc qtybutton">
                            <i className="fa fa-angle-up" />
                          </div>
                        </div>
                      </div>
                      <div style={{ paddingTop: 13 }}>
                        <Link
                          onClick={() => this.addItemToCart(product)}
                          to="#"
                          className="add-to-cart"
                        >
                          Thêm vào giỏ
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    product: state.product,
    user:state.auth
  };
};
const mapDispatchToProps = dispatch => {
  return {
    get_product: productId => {
      dispatch(actGetProductRequest(productId));
    },
    addCart: (idCustomer,product,quantity) => {
      dispatch(actAddCartRequest(idCustomer,product,quantity));
    }

  }
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductViewDetail);
