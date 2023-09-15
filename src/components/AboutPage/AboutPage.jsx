import { Text } from '@chakra-ui/react';
import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div >
        <Text 
        color='#f7f7f7'>This about page is for anyone to read!</Text>
      </div>
    </div>
  );
}

export default AboutPage;
