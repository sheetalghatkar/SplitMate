import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

export default function SettledExpenses({sortValue}) {
  const expenses = [
    {
      id: '1',
      name: 'Cafe Coffee Day',
      amount: 299,
      currency: '₹ INR',
      date: '2025-06-22',
    },
    {
      id: '2',
      name: 'Electricity Bill',
      amount: 1450,
      currency: '₹ INR',
      date: '2025-06-18',
    },
    {
      id: '3',
      name: 'Zomato Order',
      amount: 560,
      currency: '₹ INR',
      date: '2025-06-16',
    },
    {
      id: '4',
      name: 'Book Purchase',
      amount: 390,
      currency: '₹ INR',
      date: '2025-06-14',
    },
    {
      id: '5',
      name: 'Metro Pass',
      amount: 1200,
      currency: '₹ INR',
      date: '2025-06-10',
    },
  ];

  const sortedExpenses = [...expenses].sort((a, b) => {
    if (sortValue === 'date_asc') {
      return new Date(a.date) - new Date(b.date);
    } else if (sortValue === 'date_desc') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortValue === 'name') {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

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
        <View style={styles.tickContainer}>
          <Text style={styles.tick}>✅</Text>
        </View>
      </View>
    </View>
  );

  const formatDate = dateStr => {
    const options = {day: '2-digit', month: 'short', year: 'numeric'};
    return new Date(dateStr).toLocaleDateString('en-GB', options).replace(/ /g, '-');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedExpenses}
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
  tickContainer: {
    paddingLeft : 15
  }
});