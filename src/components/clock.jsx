import React, { Component } from 'react';
import './clock.css';
class Clock extends Component {
  state = {}
    constructor(){
      super();
      this.state = {
        time:'',
        bgStyle:{
          backgroundColor: 'white',
        },
        hexaCode:'',
        timerColor:{
          color: 'white',
        }
      }

  }
  getTime = ()=>{
    const date = new Date();
    const hours = this.convertSingleDigitToDoubleDigit(date.getHours());
    const minutes = this.convertSingleDigitToDoubleDigit(date.getMinutes());
    const seconds = this.convertSingleDigitToDoubleDigit(date.getSeconds());
    const time = `${hours}:${minutes}:${seconds}`;
    const timeColor = `#${hours}${minutes}${seconds}`;
    const timerColor = this.getContrastColor(timeColor);
    this.setState(state => ({
      time: time,
      bgStyle:{
        backgroundColor:timeColor
      },
      hexaCode: timeColor,
      timerColor:{
        color: timerColor,
      }
    }));
  }
  componentDidMount(){
    setInterval(()=>this.getTime(), 1000);
  }

  getContrastColor(hex){
    const {r,g,b} = this.convertFromHexToRGB(hex);
    return (r * 0.299 + g * 0.587 + b * 0.114) > 186
        ? '#050505'
        : '#FEFEFE';
  }

  convertFromHexToRGB(hex){
    hex = hex.slice(1);
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    const rgb = {r:r,g:g,b:b};
    return rgb;
  }

  convertSingleDigitToDoubleDigit(number){
    let num = number.toString()
    if(num.length !== 2){
      num = '0'+num;
    }
    return num;
  }

  render() {
    return (
      <div className='bg' style={this.state.bgStyle}>
        <div>
          <div style={this.state.timerColor} className='clockTime'>
            {this.state.time}
          </div>
          <div style={this.state.timerColor} className='hexaCode'>
            {this.state.hexaCode}
          </div>
        </div>
      </div>
    );
  }
}

export default Clock;