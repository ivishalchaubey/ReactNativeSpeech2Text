import {View, Text, StyleSheet, StatusBar} from 'react-native';
import React from 'react';
import {Home} from './src/screens';

const App = () => {
  StatusBar.setBackgroundColor('rgba(1, 9, 33, 1)');
  return (
    <View style={styles.container}>
      <Home />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(1, 9, 33, 1)',
  },
});
export default App;
