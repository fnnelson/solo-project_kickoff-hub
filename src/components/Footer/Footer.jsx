import React from 'react';
import './Footer.css';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function Footer() {
  return <footer style={{ color: '#fadf5e', textShadow: '0 0 2px #383838'}}>&copy; Forrest Nelson</footer>;
}

export default Footer;
