import React, { Component } from "react";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";

import "./style.css";
toast.configure();

let token;
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
    };

  }

  async componentDidMount() {
    // token = localStorage.getItem("_auth");
    // const { id } = this.props;
    // const res = await callApi(`view/product/${id}`, "GET");
    // if (res && res.status === 200) {

    // }
  }
  handleChange = event => {
    let name = event.target.name;
    let value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    this.setState({
      [name]: value
    });
  };




  addItemToCart = product => {
    const { quantity } = this.state;
    this.props.addCart(product, quantity);
  };
  render() {
    const { product } = this.props;
    const { quantity } = this.state;
    console.log("thông tin sản phẩm", product)
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
                          <div onClick={() => this.downItem()} className="dec qtybutton">
                            <i className="fa fa-angle-down" />
                          </div>
                          <div onClick={() => this.upItem()} className="inc qtybutton">
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
                          Add to cart
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
    product: state.product
  };
};
const mapDispatchToProps = dispatch => {
  return {

  }
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductViewDetail);
