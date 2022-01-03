import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatNumber } from '../../config/TYPE'
import { Redirect } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

let id;
let token;
class SumTotal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectYourOrder: false,
      redirectYourLogin: false
    }
  }


  checkAuthenticate = () => {
    id = localStorage.getItem("_id");
    const {sumTotal } = this.props;
    if (!sumTotal.length) {
      return toast.error('Vui lòng chọn sản phẩm để mua');
    }
    if (id) {
      this.setState({
        redirectYourOrder: true
      })
    } else {
      toast.error('Đăng nhập trước khi thanh toán');
      this.setState({
        redirectYourLogin: true
      })
    }
  }

  render() {
    const { redirectYourOrder, redirectYourLogin } = this.state;
    const { sumTotal } = this.props;
    console.log("tổng tiền",sumTotal)
    let amount = 0;
    let shippingTotal = 15000;
    if (sumTotal.length > 0) {
      amount = sumTotal.reduce((sum, item) => {
        return sum += item.quantity * item.unitPrice
      }, 0)
    }
    if (redirectYourOrder) {
      return <Redirect to="/checkout"></Redirect>
    }
    if (redirectYourLogin) {
      return <Redirect to="/login-register"></Redirect>
    }
    return (
      <div>
        <div className="cart-page-total">
          <h2>Tổng thanh toán</h2>
          <ul>
            <li>Sản phẩm <span>{amount ? formatNumber.format(amount) : 0}</span></li>
            <li>Shipping <span>{formatNumber.format(amount ? shippingTotal : 0)}</span></li>
            <li style={{ color: 'red' }}>Tổng <span>{amount ? formatNumber.format(amount + shippingTotal) : 0}</span></li>
          </ul>
          <button  className="fix-text-checkout" onClick={() => this.checkAuthenticate()}>Mua ngay</button>
        </div>
      
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    sumTotal: state.cart,
    // user: state.auth
  }
}
export default connect(mapStateToProps, null)(SumTotal)