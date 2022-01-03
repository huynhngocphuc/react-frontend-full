import React, { Component } from 'react'

export default class AboutPage extends Component {
  render() {
    return (
      <div>
  <div className="breadcrumb-area">
    <div className="container">
      <div className="breadcrumb-content">
        <ul>
          <li><a href="index.html">Trang chủ</a></li>
          <li className="active">/Về chúng tôi</li>
        </ul>
      </div>
    </div>
  </div>
  {/* Li's Breadcrumb Area End Here */}
  {/* about wrapper start */}
  <div className="about-us-wrapper pt-60 pb-40">
    <div className="container">
      <div className="row">
        {/* About Text Start */}
        <div className="col-lg-6 order-last order-lg-first">
          <div className="about-text-wrap">
            <h2><span>Cung cấp </span>Sản phẩm tốt nhất cho bạn</h2>
            <p>nội dung về sản phẩm</p>
          </div>
        </div>
        {/* About Text End */}
        {/* About Image Start */}
        <div className="col-lg-5 col-md-10">
          <div className="about-image-wrap">
            <img className="img-full" src="https://i.ibb.co/mtWXXkq/13.jpg" alt="About Us" />
          </div>
        </div>
        {/* About Image End */}
      </div>
    </div>
  </div>
 
  <div className="team-area pt-60 pt-sm-44">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="li-section-title capitalize mb-25">
            <h2><span>Team</span></h2>
          </div>
        </div>
      </div> {/* section title end */}
      <div className="row flex justify-content-center">
        <div className="col-lg-3 col-md-6 col-sm-6">
          <div className="team-member mb-60 mb-sm-30 mb-xs-30">
            <div className="team-thumb">
              <img src="https://i.ibb.co/MNQpYyz/1.png" alt="Our Team Member" />
            </div>
            <div className="team-content text-center">
              <h3>Huỳnh Ngọc Phúc</h3>
              <p>Web Designer</p>
              <a href="/">huynhphuc@example.com</a>
              <div className="team-social">
                <a href="/"><i className="fa fa-facebook" /></a>
                <a href="/"><i className="fa fa-twitter" /></a>
                <a href="/"><i className="fa fa-linkedin" /></a>
                <a href="/"><i className="fa fa-google-plus" /></a>
              </div>
            </div>
          </div>
        </div> {/* end single team member */}
        <div className="col-lg-3 col-md-6 col-sm-6">
          <div className="team-member mb-60 mb-sm-30 mb-xs-30">
            <div className="team-thumb">
              <img src="https://i.ibb.co/7YqMhw3/2.png" alt="Our Team Member" />
            </div>
            <div className="team-content text-center">
              <h3>Nguyễn Thanh Tú</h3>
              <p>Web Designer</p>
              <a href="/">thanhtu@gmail.com</a>
              <div className="team-social">
                <a href="/"><i className="fa fa-facebook" /></a>
                <a href="/"><i className="fa fa-twitter" /></a>
                <a href="/"><i className="fa fa-linkedin" /></a>
                <a href="/"><i className="fa fa-google-plus" /></a>
              </div>
            </div>
          </div>
        </div> {/* end single team member */}
      
      </div>
    </div>
  </div>
</div>

    )
  }
}
