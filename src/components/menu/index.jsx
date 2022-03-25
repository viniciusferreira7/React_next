import React from 'react';
import { Link } from 'react-router-dom';

export const Menu = () => {
  return (
    <nav style={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
      <Link to={'/'}>Home</Link>
      <Link to={'/Abc'}>ABC</Link>
    </nav>
  );
};
