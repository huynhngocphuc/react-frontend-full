import React, { Component } from 'react'
import Order from '../components/Order/OrderStatus1'
import NavbarOrder from '../components/Order/NavbarOrder'
import OrderStatus2 from '../components/Order/OrderStatus2'

export default class OrderPage2 extends Component {
    render() {
        return (
            <div className="page-content d-flex align-items-stretch">
                <NavbarOrder></NavbarOrder>
                <OrderStatus2></OrderStatus2>
            </div>
        )
    }
}
