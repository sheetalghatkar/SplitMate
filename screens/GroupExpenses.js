import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function GroupExpenses({ navigation, members, currency }) {

  const handleAddExpense = () => {
    navigation.navigate('AddExpense', { members: members, currency:currency }); // pass actual members array if available
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={handleAddExpense}>
        <Text style={styles.buttonText}>Add Expense</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text>No expenses yet</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  addButton: {
    backgroundColor: '#377dfd',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    margin: 16,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
