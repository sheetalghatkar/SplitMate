import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function GroupDetail() {
  return (
    <View style={styles.container}>
      <Text>GroupDetail Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
