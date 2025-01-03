import React from 'react';
import { RingLoader } from 'react-spinners';
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <RingLoader color = "white" size={150} />
    </div>
  );
};

export default Loader;