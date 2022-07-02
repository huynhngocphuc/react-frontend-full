import React, { Component } from 'react'
import callApi from '../../utils/apiCaller';
import { Redirect } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { startLoading, doneLoading } from '../../utils/loading'
const MySwal = withReactContent(Swal);

export default class Paypal extends Component {
    constructor(props) {
        super(props);
        this.state = {
          offset: 0,
          isSuccess: false
        }
      }
      
    async componentDidMount(){
        const {orderid,paymentId,PayerID} = this.props
        console.log("đây là param sau khi chạy",orderid,paymentId,PayerID)
        startLoading();
        const resData = await callApi(`payment/paypal/success/${orderid}?paymentId=${paymentId}&PayerID=${PayerID}`, 'GET')
        console.log("dữ liệu trả về",resData)
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
                <h1></h1>
            </div>
        )
    }
}
