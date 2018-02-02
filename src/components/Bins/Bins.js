import React from 'react';
import { Link } from 'react-router-dom';
import images from '../../assets/images';
import './Bins.css';

const Bins = ({ fetching, bins, selectedBin, onSelectBin, onRemoveBin, onSearchBin }) => (
  <aside className="Bins-Container">
    <div className="bins-search">
      <input type="text"
             onChange={onSearchBin}
             placeholder="Search for bin..."/>
      <img src={images.search} alt="Search Bin"/>
    </div>
    <div className="bins">
      {fetching && <div className="loading">Loading...</div>}
      {bins.map((bin, index) =>
        <Link to={`/${bin._id}`} className={bin._id === selectedBin._id ? 'bin active' : 'bin'} key={index}>
          {bin.name}
          <div className="remove-bin"
               onClick={(e) => onRemoveBin(e, bin._id)}>
            <img src={images.x} alt="Remove"/>
          </div>
        </Link>
      )}
    </div>
  </aside>
);

export default Bins;
