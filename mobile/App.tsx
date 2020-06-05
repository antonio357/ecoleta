import React from 'react';
import {StatusBar} from 'react-native';
import { Roboto_400Regular, Roboto_500Medium } from "@expo-google-fonts/roboto";
import { Ubuntu_700Bold, useFonts } from "@expo-google-fonts/ubuntu";
import { AppLoading } from "expo";

import Home from './src/pages/Home'

// here it does not have html tags, only react-native elements
// style={styles.container} this is how you add style

export default function App() {
  const [fontsLoaded] = useFonts({ // this is made to load the fonts before the aplication page start
    Roboto_400Regular, Roboto_500Medium, Ubuntu_700Bold
  })

  if (!fontsLoaded) return <AppLoading/> // the page will wait until fonts get loaded

  // backgroundColor='transparent' translucent it is just for android
  return (
    <>  
      <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent/>
      <Home />
    </>
  );
}