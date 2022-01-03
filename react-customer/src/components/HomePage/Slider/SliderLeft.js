import React, { Component } from 'react'

export default class SliderLeft extends Component {
  render() {
    return (
      <div className="col">
        <div className="slider-area">
          <div id="carouselExampleControls" className="carousel slide" data-ride="carousel" data-interval="2000">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img className="d-block w-100" src="./images/slider/thieptet.jpg" alt="First slide" />
              </div>
              <div className="carousel-item">
                <img className="d-block w-100" src="./images/slider/2.jpg" alt="Second slide" />
              </div>
              <div className="carousel-item">
                <img className="d-block w-100" src="./images/slider/laptop2020.jpg" alt="Third slide" />
              </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div>
    )
  }
}
