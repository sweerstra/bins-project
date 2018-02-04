import React from 'react';
import { Link } from 'react-router-dom';
import images from '../../assets/images';
import './Bins.css';

const Bins = ({ bins, isFetching, selectedBin, onSelectBin, onRemoveBin, onSearchBin }) => (
  <aside className="bins">
    <div className="bins__search">
      <input type="text"
             className="textbox"
             onChange={onSearchBin}
             placeholder="Search for bin..."/>
      <img src={images.search} alt="Search Bin"/>
    </div>
    <div className="bins__container">
      {isFetching && <div className="bins__loading">Loading...</div>}
      {bins.map((bin, index) =>
        <Link to={`/${bin._id}`}
              className={bin._id === selectedBin._id ? 'bin active' : 'bin'}
              key={index}>
          {bin.name}
          <div className="bin__remove"
               onClick={(e) => onRemoveBin(e, bin._id)}>
            <img src={images.xCircle} alt="Remove Bin"/>
          </div>
        </Link>
      )}
    </div>
  </aside>
);

export default Bins;
