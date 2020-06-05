import React from 'react';
import {StatusBar} from 'react-native';


import Home from './src/pages/Home'

// here it does not have html tags, only react-native elements
// style={styles.container} this is how you add style

export default function App() {
  // backgroundColor='transparent' translucent it is just for android
  return (
    <>  
      <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent/>
      <Home />
    </>
  );
}