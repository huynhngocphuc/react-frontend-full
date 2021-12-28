import React, { Component } from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { actFetchProductsRequest } from '../../../redux/actions/product';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import MyFooter from '../../MyFooter/MyFooter'
import Paginator from 'react-js-paginator';
const MySwal = withReactContent(Swal)

let token;


class Product extends Component {

  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      currentPage: 1,
      searchText: ''
    }
  }
  componentDidMount() {
    this.fetch_reload_data();
  }
  fetch_reload_data() {
    // token = localStorage.getItem('_auth');
    this.props.fetch_products().then(res => {
      this.setState({
        total: res.totalPage
      });
    }).catch(err => {
      console.log(err);
    })
  }
  pageChange(content){
   
    const page = content;
    this.props.fetch_products(page);
    this.setState({
      currentPage: content
    })
    window.scrollTo(0, 0);
    
  }
  render() {
    let { products } = this.props;
    const { searchText, total } = this.state;
    return (
      <div className="content-inner">
        {/* Page Header*/}
        <header className="page-header">
          <div className="container-fluid">
            <h2 className="no-margin-bottom">Products</h2>
          </div>
        </header>
        {/* Breadcrumb*/}
        <div className="breadcrumb-holder container-fluid">
          <ul className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">trang chủ</Link></li>
            <li className="breadcrumb-item active">Sản Phẩm</li>
          </ul>
        </div>
        <section className="tables pt-3">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header d-flex align-items-center">
                    <h3 className="h4">Xuất data sản phẩm</h3>
                    <button style={{ border: 0, background: "white" }}> <i className="fa fa-file-excel-o"
                      style={{ fontSize: 18, color: '#1d7044' }}> Excel</i></button>
                  </div>
                  <form
                    className="form-inline md-form form-sm mt-0"
                    style={{ justifyContent: 'flex-end', paddingTop: 5, paddingRight: 20 }}
                  >
                    <div>
                      <button style={{ border: 0, background: 'white' }}> <i className="fa fa-search" aria-hidden="true"></i></button>
                      <input
                        name="searchText"
                        onChange={this.handleChange}
                        
                        className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search"
                        aria-label="Search" />
                    </div>
                    <Link to='/products/add' className="btn btn-primary" >Thêm mới</Link>
                  </form>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Tên sản phẩm</th>
                            <th>Mô tả</th>
                            <th>Giá</th>
                            <th>Tồn kho</th>
                            {/* <th>Properties</th> */}
                            <th style={{ textAlign: "center" }}>Ảnh</th>
                            <th style={{ textAlign: "center" }}>Chức năng</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products && products.length ? products.map((item, index) => {
                            return (
                              <tr key={index}>
                                
                                <td>{item.productName}</td>
                                <td><p className="text-truncate" style={{ width: 300 }}>{item.descriptionProduct}</p></td>
                                <td>{item.unitPrice}</td>
                                <td>{item.quantity}</td>
                                {/* <td>{item.properties}</td> */}
                                <td style={{ textAlign: "center" }}>
                                  <div className="fix-cart">
                                    <img src={item && item.image ? item.image : null} className="fix-img" alt="not found" />
                                  </div>
                                </td>
                                <td style={{ textAlign: "center" }}>
                                  <div>
                                    <span title='Edit' className="fix-action"><Link to='/'> <i className="fa fa-edit"></i></Link></span>
                                    <span title='Delete' className="fix-action"><Link to="#"> <i className="fa fa-trash" style={{ color: '#ff00008f' }}></i></Link></span>
                                  </div>
                                </td>
                              </tr>
                            )
                          }) : null}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <nav aria-label="Page navigation example" style={{ float: "right" }}>
                  <ul className="pagination">
                  <Paginator
                        pageSize={1}
                        totalElements={total}
                        onPageChangeCallback={(e) => {this.pageChange(e)}}
                      />
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </section>
        {/* Page Footer*/}
        <MyFooter></MyFooter>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetch_products: (page) => {
      return dispatch(actFetchProductsRequest(page))
    }

  }
}




export default connect(mapStateToProps, mapDispatchToProps)(Product)