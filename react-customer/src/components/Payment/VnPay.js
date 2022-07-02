import React, { Component } from 'react'
import callApi from '../../utils/apiCaller';
import { Redirect } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { startLoading, doneLoading } from '../../utils/loading'
const MySwal = withReactContent(Swal);

export default class VnPayPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          offset: 0,
          isSuccess: false
        }
      }
      
    async componentDidMount(){
        const {orderid,vnp_ResponseCode} = this.props
        
        startLoading();
        const resData = await callApi(`payment/vnpay/${orderid}?vnp_ResponseCode=${vnp_ResponseCode}`,'GET')
        
        if(resData &&resData.status === 200)
        {
            this.setState({isSuccess:true})
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Thanh toán thành công',
                showConfirmButton: false,
                timer: 1500
              })
        }
        doneLoading();
    }

    render() {
        const {isSuccess} = this.state
        if(isSuccess){
            return <Redirect to='/'></Redirect>
        }
        return (
            <div>
                <h1>Thanh toán thất bại chuyển sang trang thái thanh toán khi nhận hàng</h1>
            </div>
        )
    }
}
