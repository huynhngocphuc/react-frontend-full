import React, { Component } from "react"
import { connect } from "react-redux";
import callApi from "../../utils/apiCaller";
import { Link, Redirect } from "react-router-dom";
import BillDetail from "./BillDetail";
import YourOrder from "./YourOrder";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { startLoading, doneLoading } from "../../utils/loading";
import { actFetchCartRequest } from '../../redux/actions/cart';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./style.css";
const MySwal = withReactContent(Swal);

toast.configure();

let token, res, resultOrder;
class CheckOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleCheckout: false,
      login: true,
      shippingAddress: false,
      checkout: false,
      result: false,
      linkPaypal:'',
      redirectTo :false
    };
    this.billing = React.createRef();
  }

  componentDidMount() {
    token = localStorage.getItem("_auth");
  }
  toggleCheckout = async () => {
    let id = localStorage.getItem("_id");
    const items = this.props.cartStore
    let list = [];
    let count = 0;
    let shippingTotal = 0;
    const { toggleCheckout, shippingAddress } = this.state;
    res = this.billing.current.getBillingState()

    if (res.phoneNumber === "" || res.address === "") {
      return toast.error("vui lòng điền đủ thông tin");
    }
    // lấy danh sách cart để gửi đi
    if (items.length > 0) {
      list = items.map((item) => {
        return {
          productId: item.productId,
          quantity: item.quantity
        }
      })
      count = items.reduce((sum, item) => {
        return (sum += item.quantity * item.unitPrice);
      }, 0);
    }
    if (list) {
      const newOder = {
        address: res.address,
        phoneNumber: res.phoneNumber,
        total: count + shippingTotal,
        list,
        customerId: parseInt(id)
      }
      resultOrder = newOder;
    }
    
    this.setState({
      toggleCheckout: !toggleCheckout,
      shippingAddress: !shippingAddress,
    });
    
  };

  submitOrder = async (state) => {
    let id = localStorage.getItem("_id");
    const items = this.props.cartStore
    let list = [];
    let count = 0;
    let shippingTotal = 0;

    if (items.length > 0) {
      list = items.map((item) => {
        return {
          productId: item.productId,
          quantity: item.quantity
        }
      })
      count = items.reduce((sum, item) => {
        return (sum += item.quantity * item.unitPrice);
      }, 0);
    }
    if (list) {
      const newOder = {
        address: res.address,
        phoneNumber: res.phoneNumber,
        total: count + shippingTotal,
        list,
        customerId: parseInt(id)

      }
      startLoading();
      const resData = await callApi("orders", "POST", newOder);
      if (resData && resData.status == 200) {
        // fetch lại giỏ hàng
        // await this.props.fetch_cart(id)
        toast.success("Tạo đơn hàng thành công")
        this.setState({
          checkout: true,
          result: true,
        });
      }
     await doneLoading();
      window.location.reload();
    }



  };
  submitOrderPaypal = async (state) => {
    let id = localStorage.getItem("_id");
    const items = this.props.cartStore
    let list = [];
    let count = 0;
    let shippingTotal = 0;
    if (items.length > 0) {
      list = items.map((item) => {
        return {
          productId: item.productId,
          quantity: item.quantity
        }
      })
      count = items.reduce((sum, item) => {
        return (sum += item.quantity * item.unitPrice);
      }, 0);
    }
    if (list) {
      const newOder = {
        address: res.address,
        phoneNumber: res.phoneNumber,
        total: count + shippingTotal,
        list,
        customerId: parseInt(id)
      }
      console.log("dữ liệu gửi đi",newOder)
      startLoading();
      const resData = await callApi("payment/paypal", "POST", newOder);
      if (resData && resData.status == 200) {
        this.setState({linkPaypal:resData.data.link, redirectTo:true})
      }
      doneLoading();
    }

  };

  render() {
    const {
      redirectTo,
      toggleCheckout,
      shippingAddress,
      checkout,
      result,
      linkPaypal
    } = this.state;
    if(redirectTo){
      return window.location.replace(linkPaypal)
    }
    return (
      <div className="checkout-area pt-60 pb-30">
        <div className="container">
          <div
            className="row"
            style={{ textAlign: "center", marginTop: -25, paddingBottom: 10 }}
          >
            <div className="col-3"></div>
            <div className="col-6">
              <div className="container">
                <ul className="progressbar">
                  <li className="active">login</li>
                  {shippingAddress ? (
                    <li className="active">Thông tin đơn hàng</li>
                  ) : (
                    <li >Thông tin đơn hàng</li>
                  )}
                  {
                    checkout ? (<li className="active">thanh toán</li>)
                      : <li>thanh toán</li>
                  }
                  {
                    result ? (<li className="active">Xong</li>)
                      : <li>Xong</li>
                  }
                </ul>
              </div>
            </div>
            <div className="col-3"></div>
          </div>
          {
            result
              ? (
                <div className="row">
                  <div className="col-lg-12">
                    <div className="error-wrapper text-center ptb-50 pt-xs-20">
                      <div>
                        <img
                          src="https://i.ibb.co/pvDhxPj/checked-ok-yes-icon-1320196391133448530.png"
                          alt="checked"
                          height="70px"
                        />
                        <h1>Cảm ơn.</h1>
                      </div>
                      <div>
                        <h1>Đơn hàng của bạn đặt thành công.</h1>
                      </div>
                      <div>
                        <p>
                          <i>
                            Vui lòng xem email để xem chi tiết.
                          </i>
                          <Link to = '/' className="ml-3">Tiếp tục mua hàng</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
              : (
                <div className="row">
                  {
                    toggleCheckout ? (
                      <YourOrder
                        changeToggle={(result) => this.changeToggle(result)}
                        order={resultOrder}
                        submitOrder={() => this.submitOrder()}
                        submitOrderPaypal={() => this.submitOrderPaypal()}
                      ></YourOrder>
                    ) : (
                      <BillDetail ref={this.billing}></BillDetail>
                    )
                  }
                  <div className="col-12" style={{ textAlign: "center" }}>
                    {!toggleCheckout ? (
                      <button
                        onClick={() => this.toggleCheckout()}
                        className="btn btn-primary"
                        style={{ marginTop: -25, marginBottom: 10 }}
                      >
                        Bước tiếp theo
                      </button>
                    ) : null}
                  </div>

                </div>
              )
          }
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    cartStore: state.cart,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetch_cart: (id) => {
      dispatch(actFetchCartRequest(id))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CheckOut);
