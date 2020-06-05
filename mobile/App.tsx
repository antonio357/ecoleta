import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// here it does not have html tags, only react-native elements

// style={styles.container} this is how you add style

export default function App() {
  return (
    <View style={styles.container}> 
      <Text style={styles.text}>Hello world</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  // obs there is no inheritance neither cascading each element has its own style
  container: { // this is javascript object that will be translated to native style ios and android, the tool that does it is yoga from facebook
    // here every style has display: 'flex' as default
    flex: 1,
    backgroundColor: '#7159c1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color: '#FFF',
  },
});
