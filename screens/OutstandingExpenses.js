import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

export default function OutstandingExpenses({sortValue, expenses}) {
  const formatDate = dateStr => {
    const options = {day: '2-digit', month: 'short', year: 'numeric'};
    return new Date(dateStr)
      .toLocaleDateString('en-GB', options)
      .replace(/ /g, '-');
  };

  const getSortedExpenses = () => {
    const sorted = [...expenses];
    if (sortValue === 'date_asc') {
      sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortValue === 'date_desc') {
      sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortValue === 'name') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
    return sorted;
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
      {getSortedExpenses().length === 0 ? (
        <Text style={{textAlign: 'center', marginTop: 20, color: '#777'}}>
          No outstanding expenses found.
        </Text>
      ) : (
        <FlatList
          data={getSortedExpenses() || []}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 16,
    paddingRight: 5,
    paddingLeft: 14,
    backgroundColor: 'transparent',
    // backgroundColor: 'rgb(197, 255, 203)',
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
    marginRight: 10,
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
