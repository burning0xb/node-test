import React, { Component } from 'react';
import Slider from 'react-slick';
import {BANNER_KEY} from '../../../assets/js/banner.js';
export default class SimpleSlider extends Component {


  handleClick(value) {
    window.open(value);
  }

  render() {
    const settings = {
      speed: 500,
      autoplay: true,
      centerMode: true,
      arrows: false,
      dots: false
    };
    return (
      <Slider {...settings} >
          { BANNER_KEY ? Object.values(BANNER_KEY).map((key) => (
            <div onClick={this.handleClick.bind(this, key[1])} key={key[0]}><img src={'/assets/demo/img/' + key[0]} style={{ height: '334px' } }/></div>
          )) : ''
          }
      </Slider>
    );
  }
}
