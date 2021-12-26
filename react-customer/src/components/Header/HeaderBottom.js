import React, { Component } from 'react'
import { Link } from 'react-router-dom'



class HeaderBottom extends Component {



  render() {
   
    return (
      <div className="header-bottom header-sticky d-lg-block d-xl-block" >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="hb-menu">
                <nav className="navbar navbar-expand-sm navbar-light bg-light">
                  <Link className="navbar-brand" to="/"><img src="https://i.ibb.co/t8T3s70/icons8-home-30.png" alt="not found" style={{height: 30, width: 30}}/></Link>
                  <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                  </button>
                  <div className="collapse navbar-collapse" id="collapsibleNavId">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                      <li className="nav-item active">
                        <Link className="nav-link" to="/">Trang chủ</Link>
                      </li>
                      <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle" to="#" id="dropdownId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">CATEGORIES</Link>
                        <div className="dropdown-menu" aria-labelledby="dropdownId">
                        {/* {categories.map((category, index) => 
                            <Link key={index} className="dropdown-item" onClick={() => this.getIdCategory(category.id)} to={`/categories/${category.id}`}>{category.nameCategory}</Link>
                        )} */}
                        </div>
                      </li>
                      <li className="nav-item">
                        <Link  className="nav-link" to="/products">PRODUCTS</Link>
                      </li>
                      <li className="nav-item">
                        <Link  className="nav-link" to="/about">ABOUT</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/contact">CONTACT</Link>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}



export default (HeaderBottom);
