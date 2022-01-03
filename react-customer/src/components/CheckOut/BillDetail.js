import React, { Component } from 'react'
import callApi from '../../utils/apiCaller';

export default class BillDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      address: '',
      phoneNumber: ''
    }
  }

  async componentDidMount() {

   
  }

  handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState({
      [name]: value
    });
  }

  getBillingState = (event) => {
    return this.state; //ref react
  }


  render() {
    const {  address, phoneNumber} = this.state;
    return (
      <div className="col-lg-10 col-12" style={{margin: 'auto'}}>
         <form>
         <div className="checkbox-form">
           <h3>Địa chỉ giao hàng</h3>
           <div className="row">
             <div className="col-md-6">
               <div className="checkout-form-list">
                 <label>SĐT  <span className="required">*</span></label>
                 <input onChange={this.handleChange} type="text" name="phoneNumber" value={phoneNumber} />
               </div>
             </div>
             <div className="col-md-12 mb-3">
               <div className="checkout-form-list">
                 <label>Địa chỉ nhận hàng <span className="required">*</span></label>
                 <input onChange={this.handleChange}  type="text" name="address" value={address} />
               </div>
             </div>
           </div>
         </div>
       </form>
      </div>
    )
  }
}
