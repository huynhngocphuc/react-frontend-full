import React, { Component } from 'react'
import LinkHere from '../components/LinkHere/LinkHere'
import ProductSearch from '../components/ProductAll/ProductSearch'
export default class ProductSearchPage extends Component {
  render() {
    const url = this.props.match.match.url;
    const key = this.props.match.match.params
    console.log("từ khóa",key)
    return (
      <div>
        <LinkHere url={url}></LinkHere>
        <ProductSearch key = {key}></ProductSearch>
      </div>
    )
  }
}

