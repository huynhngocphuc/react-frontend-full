import React, { Component } from 'react'
import Slider from '../components/HomePage/Slider/Slider'
import TopDiscountProduct from '../components/HomePage/Content/TopDiscountProduct/TopDiscountProduct'



export default class HomPage extends Component {
    render() {
        return (
            <div>
                 <Slider></Slider>
                 <TopDiscountProduct></TopDiscountProduct>

            </div>
        )
    }
}
