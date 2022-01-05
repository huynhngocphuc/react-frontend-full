import React, { Component } from 'react'
import Order from '../components/Order/OrderStatus1'
import NavbarOrder from '../components/Order/NavbarOrder'
import OrderStatus1 from '../components/Order/OrderStatus1'

export default class OrderPage extends Component {
    render() {
        return (
            <div className="page-content d-flex align-items-stretch">
                <NavbarOrder></NavbarOrder>
                <OrderStatus1></OrderStatus1>
            </div>
        )
    }
}
