// components/GroupEditModal.js
import React, {useState, useEffect} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {CURRENCY_OPTION} from '../screens/Constant'; // Adjust path if needed

export default function GroupEditModal({
  visible,
  onClose,
  onSave,
  initialGroupName = '',
  initialCurrency = '',
  mode = 'add', // default mode
}) {
  const [groupName, setGroupName] = useState(initialGroupName);
  const [currencySearch, setCurrencySearch] = useState(initialCurrency);
  const [currencyError, setCurrencyError] = useState('');
  const [groupNameError, setGroupNameError] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    setGroupName(initialGroupName);
    setCurrencySearch(initialCurrency);
    setCurrencyError('');
    setGroupNameError('');
    setDropdownVisible(false);
  }, [initialGroupName, initialCurrency, visible]);

const handleSave = () => {
  let hasError = false;

  if (!groupName.trim()) {
    setGroupNameError('Please enter group name');
    hasError = true;
  } else {
    setGroupNameError('');
  }

  const normalize = str => str.replace(/\s+/g, '').toUpperCase();

  // Try to find the full matching option from CURRENCY_OPTION
  const matchedCurrencyOption = CURRENCY_OPTION.find(option => {
    const code = option.split(' - ')[0]; // get currency code only
    return normalize(code) === normalize(currencySearch) ||
           normalize(option) === normalize(currencySearch);
  });

  if (!matchedCurrencyOption) {
    setCurrencyError('Please enter valid currency');
    hasError = true;
  } else {
    setCurrencyError('');
  }

  if (hasError) return;

  onSave({
    groupName,
    currency: matchedCurrencyOption, // always pass full "CODE - SYMBOL"
  });

  onClose();
};


  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Close Button */}
          <TouchableOpacity style={styles.close} onPress={onClose}>
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>

          {/* Group Name Input */}
          <Text style={styles.title}>Expense Group Name</Text>
          <TextInput
            maxLength={50}
            value={groupName}
            onChangeText={text => {
              setGroupName(text);
              if (text.trim()) setGroupNameError('');
            }}
            placeholder="Enter group name"
            style={[styles.input, groupNameError ? {borderColor: 'red'} : {}]}
          />
          {groupNameError ? (
            <Text style={styles.errorText}>{groupNameError}</Text>
          ) : null}

          {/* Currency Input */}
          <Text style={styles.title}>Currency</Text>
          <TextInput
            value={currencySearch}
            onChangeText={text => {
              setCurrencySearch(text.toUpperCase());
              setDropdownVisible(true);
              setCurrencyError('');
            }}
            placeholder="Search or select currency"
            style={[styles.input, currencyError ? {borderColor: 'red'} : {}]}
          />
          {dropdownVisible && (
            <FlatList
              data={CURRENCY_OPTION.filter(item =>
                item.toLowerCase().includes(currencySearch.toLowerCase()),
              ).slice(0, 4)}
              keyExtractor={item => item}
              renderItem={({item}) => (
                <Pressable
                  style={styles.dropdownItem}
                  onPress={() => {
                    setCurrencySearch(item);
                    setDropdownVisible(false);
                    setCurrencyError('');
                  }}>
                  <Text>{item}</Text>
                </Pressable>
              )}
              style={styles.dropdownList}
              keyboardShouldPersistTaps="handled"
            />
          )}
          {currencyError ? (
            <Text style={styles.errorText}>{currencyError}</Text>
          ) : null}

          {/* Save Button */}
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.addButtonText}>
              {mode === 'update' ? 'Update' : 'Add'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '85%',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginBottom: 12,
  },
  errorText: {
    color: 'red',
    marginTop: -6,
    marginBottom: 8,
  },
  close: {
    position: 'absolute',
    right: 15,
    top: 10,
    zIndex: 1,
  },
  closeText: {
    fontSize: 34,
    color: '#999',
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dropdownList: {
    maxHeight: 120,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 10,
  },
  saveBtn: {
    backgroundColor: 'rgb(55,125,253)',
    padding: 10,
    marginTop: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 20
  },
});
