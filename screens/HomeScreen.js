import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import SettledExpenses from './SettledExpenses';
import OutstandingExpenses from './OutstandingExpenses';
import {CURRENCY_OPTION} from './Constant';
import GroupEditModal from './GroupEditModal'; // ✅ import reusable modal

function ExpenseTabs({sortValue, setSortValue, expenses}) {
  const [currentTab, setCurrentTab] = useState('Outstanding Expenses');
  const [showPopover, setShowPopover] = useState(false);

  const handleSort = value => {
    setSortValue(value);
    setShowPopover(false);
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.customTabBar}>
        {['Outstanding Expenses', 'Settled Expenses'].map((tab, index) => {
          const focused = currentTab === tab;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => setCurrentTab(tab)}
              style={[styles.tabItem, focused && styles.tabItemActive]}>
              <Text
                style={[styles.tabLabel, {color: focused ? 'white' : 'black'}]}>
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        onPress={() => setShowPopover(prev => !prev)}
        style={styles.sortButton}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.sortButtonText}>Sort By</Text>
          <Image
            source={require('../assets/sort.png')}
            style={styles.sortIcon}
          />
        </View>
      </TouchableOpacity>

      {showPopover && (
        <View style={styles.popover}>
          {[
            {label: 'Date Descending', value: 'date_desc'},
            {label: 'Date Ascending', value: 'date_asc'},
            {label: 'Name', value: 'name'},
          ].map(({label, value}) => (
            <TouchableOpacity
              key={value}
              onPress={() => handleSort(value)}
              style={[
                styles.popoverItem,
                sortValue === value && styles.popoverItemSelected,
              ]}>
              <Text
                style={[
                  styles.popoverText,
                  sortValue === value && styles.popoverTextSelected,
                ]}>
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={{flex: 1, marginTop: 10}}>
        {currentTab === 'Outstanding Expenses' ? (
          <OutstandingExpenses sortValue={sortValue} expenses={expenses} />
        ) : (
          <SettledExpenses sortValue={sortValue} />
        )}
      </View>
    </View>
  );
}

function HomeScreenInner({navigation}) {
  const insets = useSafeAreaInsets();
  const [sortValue, setSortValue] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [originalExpenses, setOriginalExpenses] = useState([
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
  ]);

  const handleSaveGroup = ({groupName, currency}) => {
    const newExpense = {
      id: (originalExpenses.length + 1).toString(),
      name: groupName,
      currency,
      amount: 0,
      date: new Date().toISOString(),
    };

    setOriginalExpenses(prev => {
      const updated = [newExpense, ...prev];
      updated.sort((a, b) => new Date(b.date) - new Date(a.date));
      return updated;
    });

    navigation.navigate('ExpenseMain', {groupName, currency});
  };

  return (
    <ImageBackground
      source={require('../assets/wallpaper.png')}
      style={styles.background}>
      <TouchableOpacity
        style={[styles.addButton, {marginTop: 20}]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Create New Expense Group</Text>
      </TouchableOpacity>

      <View style={{flex: 1, marginHorizontal: 5}}>
        <ExpenseTabs
          sortValue={sortValue}
          setSortValue={setSortValue}
          expenses={originalExpenses}
        />
      </View>

      {/* ✅ Reusable Modal */}
      <GroupEditModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveGroup}
        initialGroupName=""
        initialCurrency=""
        mode="add" // ✅ explicitly pass
      />
    </ImageBackground>
  );
}

export default function HomeScreen(props) {
  return <HomeScreenInner {...props} />;
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  header: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  text: {
    textShadowColor: 'black',
    fontSize: 27,
    fontWeight: 'bold',
    marginHorizontal: 12,
    color: 'rgb(55,125,253)',
    textShadowOffset: {width: 0, height: 0.5},
    textShadowRadius: 0.5,
  },
  addButton: {
    backgroundColor: 'rgb(55,125,253)',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 100,
    shadowColor: 'rgb(9, 1, 1)',
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  customTabBar: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'space-around',
    marginHorizontal: 15,
    marginTop: 25,
    borderRadius: 16,
    overflow: 'hidden',
  },
  tabItem: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  tabItemActive: {
    backgroundColor: 'rgb(55,125,253)',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  dropdownContainer: {
    marginHorizontal: 50,
    marginTop: 10,
    zIndex: 1000,
  },
  sortButton: {
    borderWidth: 1,
    borderColor: 'rgb(55,125,253)',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignSelf: 'flex-end',
    marginTop: 10,
    marginRight: 16,
    backgroundColor: 'white',
  },

  sortButtonText: {
    color: 'rgb(55,125,253)',
    fontWeight: '600',
  },

  popover: {
    position: 'absolute',
    top: 120, // adjust based on layout
    right: 40,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgb(55,125,253)',
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
  },

  popoverItem: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  popoverText: {
    color: 'rgb(55,125,253)',
    fontSize: 14,
    fontWeight: '500',
  },
  sortIcon: {
    width: 16,
    height: 16,
    marginLeft: 6,
    resizeMode: 'contain',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  header: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  text: {
    fontSize: 27,
    fontWeight: 'bold',
    marginHorizontal: 12,
    color: 'rgb(55,125,253)',
  },
  addButton: {
    backgroundColor: 'rgb(55,125,253)',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 100,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '85%',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginBottom: 12,
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 34,
    color: '#999',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
  },
  dropdownList: {
    maxHeight: 120,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 5,
    borderRadius: 6,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  addButtonModal: {
    backgroundColor: 'rgb(55,125,253)',
    padding: 10,
    marginTop: 20,
    borderRadius: 6,
    alignItems: 'center',
  },
  popoverItemSelected: {
    backgroundColor: 'rgb(225,240,255)', // light blue
  },

  popoverTextSelected: {
    fontWeight: 'bold',
    color: 'rgb(55,125,253)',
  },
});
