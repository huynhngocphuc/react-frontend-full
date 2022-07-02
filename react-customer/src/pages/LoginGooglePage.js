import React, { Component } from 'react'
import LoginGoogle from '../components/LoginRegister/LoginGoogle';


export default class LoginGooglePage extends Component {


  render() {
   const search = this.props.match.location.search;
    const params = new URLSearchParams(search);
    const token = params.get('token'); // bar
    const customerId = params.get('customerId'); // bar
    const id = params.get('id'); // bar
    window.scrollTo(0, 0);
    return (
      <div>
        <LoginGoogle token = {token} customerId={customerId} id={id} ></LoginGoogle>
      </div>
    )
  }
}
