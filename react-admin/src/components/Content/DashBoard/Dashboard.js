import React, { Component } from 'react'
import MyFooter from '../../MyFooter/MyFooter'
import { actFetchDashboardRequest } from '../../../redux/actions/dashboard'
import { connect } from 'react-redux'

import './style.css'

class Dashboard extends Component {

  componentDidMount() {
    this.props.fetch_dashboard();
  }


  render() {


    const { dashboard } = this.props
    console.log("dữ liệu trang chủ", dashboard)
    return (
      <div className="content-inner">
        {/* Page Header*/}
        <header className="page-header">
          <div className="container-fluid">
            <h2 className="no-margin-bottom">Trang chủ</h2>
          </div>
        </header>
        {/* Dashboard Counts Section*/}
        <section className="dashboard-counts no-padding-bottom">
          <div className="container-fluid">
            <div className="row bg-white has-shadow">
              {/* Item */}
              <div className="col-xl-4 col-sm-6">
                <div className="item d-flex align-items-center">
                  <div className="icon bg-violet"><i className="icon-user" /></div>
                  <div className="title"><span>Khách<br />hàng</span>
                    <div className="progress">
                      <div role="progressbar" style={{ width: '100%', height: '4px' }} className="progress-bar bg-violet fix-processbar" />
                    </div>
                  </div>
                  <div className="number"><strong>{dashboard.numberOfCustomer}</strong></div>
                </div>
              </div>
              {/* Item */}
              <div className="col-xl-4 col-sm-6">
                <div className="item d-flex align-items-center">
                  <div className="icon bg-red"><i className="icon-padnote" /></div>
                  <div className="title"><span>Đơn<br />hàng mới</span>
                    <div className="progress">
                      <div role="progressbar" style={{ width: '100%', height: '4px' }} className="progress-bar bg-red fix-processbar" />
                    </div>
                  </div>
                  <div className="number"><strong>{dashboard.newOrders}</strong></div>
                </div>
              </div>
              {/* Item */}
              <div className="col-xl-4 col-sm-6">
                <div className="item d-flex align-items-center">
                  <div className="icon bg-green"><i className="icon-bill" /></div>
                  <div className="title"><span>Tổng<br />sản phẩm</span>
                    <div className="progress">
                      <div role="progressbar" style={{ width: '100%', height: '4px' }} className="progress-bar bg-green fix-processbar" />
                    </div>
                  </div>
                  <div className="number"><strong>{dashboard.totalProduct}</strong></div>
                </div>
              </div>
              {/* Item */}

            </div>
            <div className="row bg-white has-shadow">
              <div className="col col-sm-6">
                <div className="item d-flex align-items-center">
                  <div className="icon bg-orange"><i className="icon-check" /></div>
                  <div className="title"><span>Tổng <br />doanh thu</span>
                    <div className="progress">
                      <div role="progressbar" style={{ width: '100%', height: '4px' }} className="progress-bar bg-orange fix-processbar" />
                    </div>
                  </div>
                  {/* {1000.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})} */}
                  <div className="number"><strong>
                    {dashboard && dashboard.revenue 
                    ? dashboard.revenue.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                    :0}</strong></div>
                </div>
              </div>
            </div>
            <h3 style={{ paddingTop: 20 }}>Sơ đồ doanh thu</h3>
            {/* <Pie 
              width={100}
              height={25} data={dataPie} />
            <br />
            <br />
            <h3>Report Total Income</h3>
            <HorizontalBar 
            width={100}
            height={30} data={dataHozi} />
             <br />
             <br />
             <h3>Report Contact</h3>
             <Line  width={100}
            height={15}
              data={dataLine} /> */}
          </div>
        </section>
        <MyFooter></MyFooter>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dashboard: state.dashboard
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetch_dashboard: () => {
      dispatch(actFetchDashboardRequest())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)