import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

const originalExpenses = [
  {
    id: '1',
    name: 'Dinner at Tehta',
    amount: 450,
    currency: '₹ INR',
    date: '2025-06-20',
  },
  {
    id: '2',
    name: 'Movie Night',
    amount: 320,
    currency: '₹ INR',
    date: '2025-06-19',
  },
  {
    id: '3',
    name: 'Groceries',
    amount: 780,
    currency: '₹ INR',
    date: '2025-06-18',
  },
  {
    id: '4',
    name: 'Petrol',
    amount: 1200,
    currency: '₹ INR',
    date: '2025-06-15',
  },
  {
    id: '5',
    name: 'Snacks',
    amount: 150,
    currency: '₹ INR',
    date: '2025-06-10',
  },
];

export default function OutstandingExpenses({sortValue}) {
  const formatDate = dateStr => {
    const options = {day: '2-digit', month: 'short', year: 'numeric'};
    return new Date(dateStr)
      .toLocaleDateString('en-GB', options)
      .replace(/ /g, '-');
  };

  const getSortedExpenses = () => {
    const expenses = [...originalExpenses];
    if (sortValue === 'date_asc') {
      expenses.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortValue === 'date_desc') {
      expenses.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortValue === 'name') {
      expenses.sort((a, b) => a.name.localeCompare(b.name));
    }
    return expenses;
  };

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={{flex: 1}}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.date}>{formatDate(item.date)}</Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.amount}>₹ {item.amount}</Text>
          <Text style={styles.currency}>{item.currency}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={getSortedExpenses()}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 16,
    paddingHorizontal: 14,
    backgroundColor: 'transperant',
    // backgroundColor: 'rgb(197,227,255)',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0077cc',
    textAlign: 'right',
  },
  currency: {
    fontSize: 13,
    color: '#666',
    textAlign: 'right',
    marginTop: 6,
  },
  date: {
    fontSize: 13,
    color: '#777',
    marginTop: 6,
  },
});
