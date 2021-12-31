import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { actAddProductRequest, actEditProductRequest } from '../../../redux/actions/product';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import callApi from '../../../utils/apiCaller';
import { uploadImage } from '../../../utils/upload'
import Dropzone from 'react-dropzone';
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';
let token;
let id;
const override = css`
    display: block;
    margin: 0 auto;
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
`;
class ActionProduct extends Component {

  constructor(props) {
    super(props);

    this.state = {
      productName: '',
      quantity: 0,
      // hình để đưa lên firebase
      productImage: '',
      discount: 0,
      unitPrice: 0,
      descriptionProduct: '',
      dataCategories: [],
      dataProducer: [],
      categoryId: 1,
      supplierId: 1,
      // hình để đưa ra giao diện
      img: null,
      redirectToProduct: false,
      loading: false,
    };
    id = this.props.id
  }

  async componentDidMount() {
    if (id) {
      const res = await callApi(`product/${id}`, 'GET', null);
      if (res && res.status === 200) {
        console.log("dữ liệu trả về", res.data, res.data.supplierFKDto.supplierId)
        this.setState({
          productName: res.data.productName,
          quantity: res.data.quantity,
          productImage: res.data.productImage,
          discount: res.data.discount,
          unitPrice: res.data.unitPrice,
          descriptionProduct: res.data.descriptionProduct,
          categoryId:res.data.categoryFKDto.categoryId,
          supplierId: res.data.supplierFKDto.supplierId
        })
      }
    }

    const resCategories = await callApi('category/all', 'GET', null);
    this.setState({
      dataCategories: resCategories.data
    })
    const resProducer = await callApi('supplier/all', 'GET', null);
    this.setState({
      dataProducer: resProducer.data
    })

  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  handleChangeSelecProducer = (event) => {
    let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState({
      supplierId: value
    })
  }
  handleChangeImage = (event) => {
    if (event.target.files[0]) {
      const img = event.target.files[0];
      this.setState(() => ({ img }));
    }
    const output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
  }
  handleChangeEditor = (value) => {
    this.setState({ descriptionProduct: value })
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    const {
      productName,
      quantity,
      discount,
      unitPrice,
      descriptionProduct,
      categoryId,
      supplierId, loading } = this.state;
    let { productImage, img } = this.state;
    this.setState({
      loading: true
    })
    if (img !== null && img !== productImage) {
      console.log("vao rooi");
      productImage = await uploadImage(img);

    }
    const newProductName = productName === '' ? null : productName;
    const newQuantity = parseInt(quantity);
    const newDiscount = parseInt(discount);
    const newUnitPrice = parseInt(unitPrice);
    const newDescriptionProduct = descriptionProduct === '' ? 'không mô tả' : descriptionProduct;
    const newCategoryId = parseInt(categoryId);
    const newSupplierId = parseInt(supplierId);
    const newImage = productImage === '' ? 'http://via.placeholder.com/300x200' : productImage;
    console.log("image", newImage)
    if (!id) {
      const newProduct = {
        productName: newProductName,
        quantity: newQuantity,
        discount: newDiscount,
        unitPrice: newUnitPrice,
        descriptionProduct: newDescriptionProduct,
        categoryId: newCategoryId,
        supplierId: newSupplierId,
        productImage: newImage
      }
      console.log("data", newProduct)
      await this.props.add_Product(newProduct);
      this.setState({
        productName: '',
        quantity: 0,
        productImage: '',
        discount: 0,
        unitPrice: 0,
        descriptionProduct: '',
        categoryId: null,
        supplierId: 1,
        img : null,
        loading: false
      })

    }
    else {
      const editProduct = {
        productName: newProductName,
        quantity: newQuantity,
        discount: newDiscount,
        unitPrice: newUnitPrice,
        descriptionProduct: newDescriptionProduct,
        categoryId: newCategoryId,
        supplierId: newSupplierId,
        productImage: newImage
      }
      await this.props.edit_Product(id, editProduct);
      this.setState({
        loading: false,
        redirectToProduct: true
      })

    }
  }
  modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  render() {
    const { productName, quantity, productImage, discount, unitPrice, descriptionProduct, dataProducer, categoryId, dataCategories, supplierId,loading,redirectToProduct} = this.state;
    if (redirectToProduct) {
      return <Redirect to='/products'></Redirect>
    }
    return (
      <div className="content-inner">
        {/* Page Header*/}
        <div className='sweet-loading'>
          <ClipLoader
            css={override}
            sizeUnit={"px"}
            size={30}
            color={'#796aeebd'}
            loading={loading}
          />
        </div>
        <header className="page-header">
          <div className="container-fluid">
            <h2 className="no-margin-bottom">Form Product</h2>
          </div>
        </header>
        {/* Breadcrumb*/}
        <div className="breadcrumb-holder container-fluid">
          <ul className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Trang chủ</Link></li>
            <li className="breadcrumb-item active">Sản phẩm</li>
          </ul>
        </div>
        {/* Forms Section*/}
        <section className="forms">
          <div className="container-fluid">
            <div className="row">
              {/* Form Elements */}
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header d-flex align-items-center">
                    <h3 className="h4">Thông tin sản phẩm</h3>
                  </div>
                  <div className="card-body">
                    <form className="form-horizontal" onSubmit={(event) => this.handleSubmit(event)} >
                      {/* tên sản phẩm */}
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">Tên sản phẩm</label>
                        <div className="col-sm-9">
                          <input
                            onChange={this.handleChange}
                            value={productName}
                            name="productName"
                            type="text"
                            className="form-control" />
                        </div>
                      </div>
                      <div className="line" />
                      {/* giá, số lượng */}
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">Giá</label>
                        <div className="col-sm-3">
                          <input
                            onChange={this.handleChange}
                            value={unitPrice}
                            name="unitPrice"
                            type="number"
                            className="form-control" />
                        </div>
                        <label className="col-sm-3 form-control-label" style={{ textAlign: 'center' }}>Số lượng</label>
                        <div className="col-sm-3">
                          <input
                            onChange={this.handleChange}
                            value={quantity}
                            name="quantity"
                            type="number"
                            className="form-control" />
                        </div>
                        <label className="col-sm-3 form-control-label" >Giảm giá</label>
                        <div className="col-sm-3">
                          <input
                            onChange={this.handleChange}
                            value={discount}
                            name="discount"
                            type="number"
                            className="form-control" />
                        </div>
                      </div>
                      <div className="line" />
                      {/* image */}
                      <div className="form-group row">
                        <label htmlFor="fileInput" className="col-sm-3 form-control-label">Ảnh</label>
                        <div className="col-sm-9">
                          <input
                            onChange={this.handleChangeImage}
                            type="file"
                            className="form-control-file" />
                          <div className="fix-cart-product">
                            <img src={productImage || 'http://via.placeholder.com/300x200'} id="output" className="fix-img-product" alt="avatar" />
                          </div>
                        </div>
                      </div>
                      <div className="line" />
                      {/* mô tả */}
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">Mô tả</label>
                        <div className="col-sm-9">
                          <ReactQuill
                            modules={this.modules}
                            formats={this.formats}
                            value={descriptionProduct}
                            onChange={this.handleChangeEditor}
                          />
                        </div>
                      </div>
                      <div className="line" />
                      {/* loại sản phẩm */}
                      <div className="form-group row">
                        <label
                          className="col-sm-3 form-control-label">
                          Loại sản phẩm
                        </label>
                        <div className="col-sm-9">
                          {dataCategories && dataCategories.length ?
                            dataCategories.map((item, index) => {
                              return (
                                <div key={item.categoryId}
                                  className="i-checks"
                                  style={{ display: 'inline-block', paddingRight: 35 }} >
                                  {
                                    item.categoryId === categoryId ?
                                      <input
                                        id={item.categoryId}
                                        name="categoryId"
                                        checked
                                        value={categoryId}
                                        onChange={this.handleChange}
                                        type="radio"
                                        value={item.categoryId}
                                        className="radio-template" />
                                      :
                                      <input
                                        id={item.categoryId}
                                        name="categoryId"
                                        value={categoryId}
                                        onChange={this.handleChange}
                                        type="radio" value={item.categoryId}
                                        className="radio-template" />
                                  }
                                  <label>{item.categoryName}</label>
                                </div>
                              )
                            })
                            : null
                          }
                        </div>
                      </div>
                      <div className="line" />
                      {/* nhà cung cấp */}
                      <div className="form-group row">
                        <label
                          className="col-sm-3 form-control-label">
                          Nhà cung cấp
                        </label>
                        <div className="col-sm-9">
                          <select className="form-control mb-3" name="supplierId" value={supplierId} onChange={this.handleChangeSelecProducer}>
                            {
                              dataProducer && dataProducer.length ? dataProducer.map((item, index) => {
                                return (
                                  <option key={item.supplierId} value={item.supplierId} >{item.supplierName}</option>
                                )
                              }) : null
                            }
                          </select>
                        </div>
                      </div>
                      <div className="line" />
                      {/* chức năng */}
                      <div className="form-group row">
                        <div className="col-sm-4 offset-sm-3">
                          <Link to='/products' type="reset" className="btn btn-secondary" style={{ marginRight: 2 }}>Thoát</Link>
                          <button type="submit" className="btn btn-primary">Lưu</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Page Footer*/}

      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    add_Product: (newProduct) => {
      dispatch(actAddProductRequest(newProduct))
    },
    edit_Product: (id, data) => {
      dispatch(actEditProductRequest(id, data))
    }
  }
}

export default connect(null, mapDispatchToProps)(ActionProduct)