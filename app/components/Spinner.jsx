import React from 'react';

const Spinner = () => {
  return (
    <div className="overlay">
      <div className="spinner">
        <div className="double-bounce1" />
        <div className="double-bounce2" />
      </div>
    </div>
  );
};

export default Spinner;
