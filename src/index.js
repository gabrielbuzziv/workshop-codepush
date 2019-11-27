import React from 'react';
import { View, Text } from 'react-native';

import CodePush from 'react-native-code-push';

import styles from './styles';

function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workshop CodePush</Text>
    </View>
  );
}

export default CodePush()(App);
