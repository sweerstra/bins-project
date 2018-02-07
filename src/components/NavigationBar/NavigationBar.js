import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import images from '../../assets/images';
import './NavigationBar.css';

class NavigationBar extends Component {
  componentDidMount() {
    this.obtainColors();
  }

  render() {
    return (
      <header className="navigation-bar">
        <Link to="/bin" className="navigation-bar__title">
          Bins Projectje
          <img src={images.garbageBin} width={40} height={40}/>
        </Link>
        <div className="navigation-bar__colors">
          <input type="color" className="textbox"
                 data-color="--primary-color"
                 onChange={this.setColor}/>
          <input type="color" className="textbox"
                 data-color="--secondary-color"
                 onChange={this.setColor}/>
          <a href="#" onClick={this.resetColors}>Reset</a>
        </div>
      </header>
    );
  }

  setColor({ target: { dataset: { color }, value } }) {
    localStorage.setItem(color, value);
    localStorage.setItem(`${color}-default`, getComputedStyle(document.documentElement).getPropertyValue(color));
    document.documentElement.style.setProperty(color, value);
  }

  obtainColors() {
    document.querySelectorAll('[data-color]')
      .forEach(input => {
        const { dataset: { color } } = input;
        const value = localStorage.getItem(color)
          || getComputedStyle(document.documentElement).getPropertyValue(color).trim();

        document.documentElement.style.setProperty(color, value);
        input.value = value;
      });
  }

  resetColors(e) {
    e.preventDefault();

    document.querySelectorAll('[data-color]').forEach(input => {
      const { dataset: { color } } = input;
      const value = localStorage.getItem(`${color}-default`);
      input.value = value;
      document.documentElement.style.setProperty(color, value);
      localStorage.removeItem(color);
    });
  }
}

export default NavigationBar;
