import React, { Component } from 'react'
import { toast } from "react-toastify";
import callApi from '../utils/apiCaller';
class ActiveRegister extends Component {

    constructor(props) {
        super(props);
        this.state = {
            code: this.props.match.match.params
        }
    }
    handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        this.setState({
            [name]: value
        });
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        const { code } = this.state.code
        console.log(code)
        const res = await callApi(`registration/activate/${code}`, 'GET',null);
        console.log(res)
        if(res && res.status === 200){
            toast.success('Xác thực thành công')
        }
    }

    render() {
        const { code } = this.state.code
        return (
            <div className="col-sm-12 col-md-12 col-lg-6 col-xs-12 d-flex justify-content-center">
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <div className="row">
                        <div className="col-md-12 mb-20 ">
                            <label>Mã xác thực</label>
                            <input
                                value={code}
                                onChange={this.handleChange}
                                className="mb-0"
                                type="text"
                                name="code"
                                placeholder="Họ tên" />
                        </div>
                        <div className="col-12">
                            <button className="register-button mt-0">Xác nhận</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default (ActiveRegister)
