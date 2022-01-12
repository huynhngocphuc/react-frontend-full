import React, { Component } from 'react'
import { actLoginRequest } from '../../redux/actions/auth';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { startLoading, doneLoading } from '../../utils/loading'
import { Link } from 'react-router-dom'
toast.configure()

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",

    }
  }

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState({
      [name]: value
    });
  }



  handleSubmit = async event => {
    event.preventDefault();
    const { username, password } = this.state;
    if (password.length < 6 || password.length > 32) {
      return toast.error('Mật khẩu từ 6-24 ký tự');
    }
    const user = {
      username,
      password
    }
    console.log(user)
    startLoading();
    await this.props.loginRequest(user);
    doneLoading();

  }


  render() {
    const { username, password } = this.state;
    const { user } = this.props;
    if (user !== null) {
      return <Redirect to="/"></Redirect>
    }
    return (
      <div className="col-sm-12 col-md-12 col-xs-12 col-lg-6 mb-30">
        {/* Login Form s*/}
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <div className="login-form">
            <h4 className="login-title">Đăng nhập</h4>
            <div className="row">
              <div className="col-md-12 col-12 mb-20">
                <label>Gmail *</label>
                <input
                  value={username}
                  onChange={this.handleChange}
                  className="mb-0"
                  type="email"
                  placeholder="Nhập gmail"
                  name='username'
                />
              </div>
              <div className="col-12 mb-20">
                <label>Mật khẩu</label>
                <input
                  value={password}
                  onChange={this.handleChange}
                  className="mb-0"
                  type="password"
                  placeholder="Mật khẩu"
                  name='password'
                />
              </div>
              <div className="col-md-8">
                <div className="check-box d-inline-block ml-0 ml-md-2 mt-10">
                  <Link to="/register"> Đăng ký</Link>

                </div>
              </div>
              <div className="col-md-4 mt-10 mb-20 text-left text-md-right">
                <Link to="/forgot-password"> Quên mật khẩu</Link>
              </div>
              <div className="col-md-4">
                <button className="register-button mt-0 mb-3">Đăng nhập</button>
              </div>

            </div>
          </div>
        </form>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    user: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginRequest: (user) => {
      dispatch(actLoginRequest(user))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
