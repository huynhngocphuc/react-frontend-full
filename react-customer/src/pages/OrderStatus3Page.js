import React, { Component } from 'react'
import Order from '../components/Order/OrderStatus1'
import NavbarOrder from '../components/Order/NavbarOrder'
import OrderStatus3 from '../components/Order/OrderStatus3'

export default class OrderPage3 extends Component {
    render() {
        return (
            <div className="page-content d-flex align-items-stretch">
                <NavbarOrder></NavbarOrder>
                <OrderStatus3></OrderStatus3>
            </div>
        )
    }
}
