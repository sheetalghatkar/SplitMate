import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  useSafeAreaInsets,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';

import SettledExpenses from './SettledExpenses';
import OutstandingExpenses from './OutstandingExpenses';

function ExpenseTabs({sortValue, setSortValue}) {
  const [currentTab, setCurrentTab] = useState('Outstanding Expenses');
  const [showPopover, setShowPopover] = useState(false);

  const handleSort = value => {
    setSortValue(value);
    setShowPopover(false);
  };

  return (
    <View style={{flex: 1}}>
      {/* Tab Bar */}
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

      {/* Sort By Button */}
      <TouchableOpacity
        onPress={() => setShowPopover(prev => !prev)}
        style={styles.sortButton}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.sortButtonText}>Sort By</Text>
          <Image
            source={require('../assets/sort.png')} // update path if needed
            style={styles.sortIcon}
          />
        </View>
      </TouchableOpacity>

      {/* Popover Style Sort Options */}
      {showPopover && (
        <View style={styles.popover}>
          <TouchableOpacity
            onPress={() => handleSort('date_desc')}
            style={styles.popoverItem}>
            <Text style={styles.popoverText}>Date Descending</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSort('date_asc')}
            style={styles.popoverItem}>
            <Text style={styles.popoverText}>Date Ascending</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSort('name')}
            style={styles.popoverItem}>
            <Text style={styles.popoverText}>Name</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Tab Content */}
      {/* <View style={{flex: 1, marginTop: showPopover ? 50 : 10}}> */}
      <View style={{flex: 1, marginTop: 10}}>
        {currentTab === 'Outstanding Expenses' ? (
          <OutstandingExpenses sortValue={sortValue} />
        ) : (
          <SettledExpenses sortValue={sortValue} />
        )}
      </View>
    </View>
  );
}

function HomeScreenInner() {
  const insets = useSafeAreaInsets();

  const [sortValue, setSortValue] = useState(null);

  return (
    <ImageBackground
      source={require('../assets/wallpaper.png')} 
      style={styles.background}>
      <View style={[styles.header, {paddingTop: insets.top + 10}]}>
        <Text style={styles.text}>SplitMate</Text>
      </View>

      <TouchableOpacity
        style={[styles.addButton, {marginTop: insets.top > 20 ? 110 : 60}]}
        onPress={() => console.log('Add button pressed')}>
        <Text style={styles.addButtonText}>Create New Expense Group</Text>
      </TouchableOpacity>

      <View style={{flex: 1, marginHorizontal: 5}}>
        <ExpenseTabs sortValue={sortValue} setSortValue={setSortValue} />
      </View>
    </ImageBackground>
  );
}

export default function HomeScreen() {
  return (
    <SafeAreaProvider>
      <HomeScreenInner />
    </SafeAreaProvider>
  );
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
});
