import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css';

const NavigationBar = () => (
  <header className="Navigation-Container">
    <Link to="/" className="Navigation-Container-title">Bins Project</Link>
  </header>
);

export default NavigationBar;
