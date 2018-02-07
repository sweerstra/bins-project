import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import images from '../../assets/images';
import './NavigationBar.css';

class NavigationBar extends Component {
  componentDidMount() {
    document.querySelectorAll('[data-color]')
      .forEach(input => {
        const { dataset: { color } } = input;
        const value = localStorage.getItem(color)
          || getComputedStyle(document.documentElement).getPropertyValue(color).trim();

        document.documentElement.style.setProperty(color, value);
        input.value = value;
      });
  }

  render() {
    return (
      <header className="Navigation-Container">
        <Link to="/bin" className="Navigation-Container-title">
          Bins Projectje
          <img src={images.garbageBin} width={40} height={40}/>
        </Link>
        <div>
          <input type="color" className="themeColor textbox"
                 data-color="--primary-color"
                 onChange={this.setColor}/>
          <input type="color" className="themeColor textbox"
                 data-color="--secondary-color"
                 onChange={this.setColor}/>
        </div>
      </header>
    );
  }

  setColor({ target: { dataset: { color }, value } }) {
    localStorage.setItem(color, value);
    document.documentElement.style.setProperty(color, value);
  }
}

export default NavigationBar;
