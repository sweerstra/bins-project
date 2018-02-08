import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import images from '../../assets/images';
import './NavigationBar.css';

class NavigationBar extends Component {
  componentDidMount() {
    this.obtainColors();
  }

  static getColorVariable(color) {
    return getComputedStyle(document.documentElement).getPropertyValue(color);
  }

  static setColorVariable(color, value) {
    document.documentElement.style.setProperty(color, value);
  }

  static setColor({ target: { dataset: { color }, value } }) {
    localStorage.setItem(color, value);
    localStorage.setItem(`${color}-default`, NavigationBar.getColorVariable(color));
    NavigationBar.setColorVariable(color, value);
  }

  render() {
    return (
      <header className="navigation-bar">
        <Link to="/bin" className="navigation-bar__title">
          Bins Projectje
          <img src={images.garbageBin} width={40} height={40} alt="Logo"/>
        </Link>
        <div className="navigation-bar__colors">
          <input type="color" className="textbox"
                 data-color="--primary-color"
                 onChange={NavigationBar.setColor}/>
          <input type="color" className="textbox"
                 data-color="--secondary-color"
                 onChange={NavigationBar.setColor}/>
          <a onClick={this.resetColors}>&times;</a>
        </div>
      </header>
    );
  }

  obtainColors() {
    document.querySelectorAll('[data-color]')
      .forEach(input => {
        const { dataset: { color } } = input;
        const value = localStorage.getItem(color) || NavigationBar.getColorVariable(color).trim();
        input.value = value;
        NavigationBar.setColorVariable(color, value);
      });
  }

  resetColors() {
    document.querySelectorAll('[data-color]')
      .forEach(input => {
        const { dataset: { color } } = input;
        const value = localStorage.getItem(`${color}-default`);
        input.value = value;
        NavigationBar.setColorVariable(color, value);
        localStorage.removeItem(color);
      });
  }
}

export default NavigationBar;
