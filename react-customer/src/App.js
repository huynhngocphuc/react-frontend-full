import React, { Component } from "react";
import routes from "./routes";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header/Header";
// import Footer from "./components/Footer/Footer";
// import { actFetchCartRequest } from "./redux/actions/cart";
// import { connect } from "react-redux";
// import { actTokenRequest } from "./redux/actions/auth";
// import Social from "./components/Social/Social";
// import { actFetchFavoritesRequest } from "./redux/actions/rating";
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';

import './style.css'
const override = css`
    display: block;
    margin: 0 auto;
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
`;

export default class App extends Component {

  render() {
    const { loading } = this.props;
    return (
      <Router>
        {
          !loading ?
            (
              <div >
                <div className='sweet-loading'>
                  <ClipLoader
                    css={override}
                    sizeUnit={"px"}
                    size={35}
                    color={'#796aeebd'}
                    loading={loading}
                  />
                </div>
                <Header></Header>
                {this.showContentMenus(routes)}

              </div>
            ) :
            (
              <div className="hidden-loading">
                <div className='sweet-loading'>
                  <ClipLoader
                    css={override}
                    sizeUnit={"px"}
                    size={35}
                    color={'#796aeebd'}
                    loading={loading}
                  />
                </div>
                <Header></Header>
                {this.showContentMenus(routes)}
              </div>

            )
        }
      </Router>
    )
  }
  showContentMenus = routes => {
    let result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        );
      });
    }
    return <Switch>{result}</Switch>;
  };
}

