import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {COLORS} from './Constant';

const getCurrencySymbol = currencyCode => {
  try {
    return (0)
      .toLocaleString('en', {
        style: 'currency',
        currency: currencyCode || 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
      .replace(/\d/g, '')
      .trim();
  } catch (e) {
    return '₹'; // fallback to INR symbol
  }
};

export default function AddExpense({route, navigation}) {
  const {members = []} = route.params || {};
  const {currency} = route.params || {};
  const currencySymbol = getCurrencySymbol(currency); // fallback to INR if undefined
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [payer, setPayer] = useState('');
  const [distribution, setDistribution] = useState({});
  const [distributionType, setDistributionType] = useState('unequally'); // 'equally' | 'unequally'
  const [titleError, setTitleError] = useState(false);
  const [amountError, setAmountError] = useState(false);

  const toggleParticipant = name => {
    if (!title.trim()) setTitleError(true);
    else setTitleError(false);

    if (!amount.trim()) setAmountError(true);
    else setAmountError(false);

    if(!titleError || !amountError) {
      setSelectedParticipants(prev => {
        if (prev.includes(name)) {
          return prev.filter(p => p !== name);
        } else {
          return [...prev, name];
        }
      });
    }
  };

  useEffect(() => {
    if (
      distributionType === 'equally' &&
      amount &&
      selectedParticipants.length > 0
    ) {
      const equalShare = (
        parseFloat(amount) / selectedParticipants.length
      ).toFixed(2);
      const newDistribution = {};
      selectedParticipants.forEach(name => {
        newDistribution[name] = equalShare;
      });
      setDistribution(newDistribution);
    }

    if (
      distributionType === 'unequally' &&
      amount &&
      selectedParticipants.length > 0
    ) {
      const newDistribution = {};
      selectedParticipants.forEach(name => {
        newDistribution[name] = '';
      });
      setDistribution(newDistribution);
    }
  }, [distributionType, amount, selectedParticipants]);

  const handleDistributionChange = (name, value) => {
    setDistribution(prev => ({...prev, [name]: value}));
  };

  const handleAdd = () => {
    let hasError = false;

    if (!title.trim()) {
      setTitleError(true);
      hasError = true;
    } else {
      setTitleError(false);
    }

    if (!amount.trim()) {
      setAmountError(true);
      hasError = true;
    } else {
      setAmountError(false);
    }

    if (hasError) return;

    // continue with rest of logic if valid...
    const expense = {
      title,
      amount,
      participants: selectedParticipants,
      payer,
      distribution,
    };

    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>What was the expense?</Text>
        <TextInput
          style={[styles.input, titleError && styles.inputError]}
          placeholder="Enter title"
          value={title}
          onChangeText={text => {
            setTitle(text);
            if (text.trim()) setTitleError(false);
          }}
        />
        {titleError && (
          <Text style={styles.errorText}>Enter expense title</Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>How much was the expense?</Text>
        <TextInput
          style={[styles.input, amountError && styles.inputError]}
          placeholder="Enter amount"
          value={amount}
          keyboardType="numeric"
          onChangeText={text => {
            setAmount(text);
            if (text.trim()) setAmountError(false);
          }}
        />
        {amountError && (
          <Text style={styles.errorText}>Enter how much was the expense</Text>
        )}
      </View>

      <Text style={styles.label}>Who participated & Who paid?</Text>
      {members.map(name => (
        <View key={name} style={styles.row}>
          <TouchableOpacity onPress={() => toggleParticipant(name)}>
            <Image
              source={
                selectedParticipants.includes(name)
                  ? require('../assets/checkbox_check.png')
                  : require('../assets/checkbox_uncheck.png')
              }
              style={styles.iconCheck}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.memberText,
              {flex: 1},
              payer === name && {color: 'green', fontWeight: 'bold'},
            ]}>
            {name}
          </Text>
          <TouchableOpacity
            onPress={() => {
              if (selectedParticipants.includes(name)) {
                setPayer(prev => (prev === name ? '' : name)); // toggle payer
              }
            }}
            disabled={!selectedParticipants.includes(name)}>
            <Image
              source={
                payer === name
                  ? require('../assets/radio_check.png')
                  : require('../assets/radio_uncheck.png')
              }
              style={[
                styles.icon,
                !selectedParticipants.includes(name) && {opacity: 0.4},
              ]}
            />
          </TouchableOpacity>
        </View>
      ))}

      {selectedParticipants.length > 0 && (
        <>
          <Text style={styles.label}>
            How do you want to distribute expenses?
          </Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                distributionType === 'equally' && styles.typeButtonSelected,
              ]}
              onPress={() => setDistributionType('equally')}>
              <Text
                style={[
                  styles.typeText,
                  distributionType === 'equally' && styles.typeTextSelected,
                ]}>
                Equally
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.typeButton,
                distributionType === 'unequally' && styles.typeButtonSelected,
              ]}
              onPress={() => setDistributionType('unequally')}>
              <Text
                style={[
                  styles.typeText,
                  distributionType === 'unequally' && styles.typeTextSelected,
                ]}>
                Unequally
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <Text style={styles.label}>Expense distribution:</Text>
      {selectedParticipants.map(name => (
        <View key={name} style={styles.distributionRow}>
          <Text style={styles.participantName}>{name}</Text>
          <View style={styles.amountInputContainer}>
            <Text style={styles.currencySymbol}>{currencySymbol}</Text>
            <TextInput
              style={styles.amountInput}
              keyboardType="numeric"
              placeholder="0"
              value={distribution[name] || ''}
              onChangeText={value => handleDistributionChange(name, value)}
              editable={distributionType === 'unequally'}
            />
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addText}>Add</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: COLORS.BG_LIGHT_BLUE,
  },
  label: {
    fontSize: 16,
    marginTop: 16,
    fontWeight: 'bold',
    color: COLORS.BG_DARK_BLUE,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'white',
    marginTop: 8,
  },
  inputSmall: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 6,
    borderRadius: 6,
    marginLeft: 10,
    width: 100,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  memberText: {
    fontSize: 16,
    color: 'black',
    textShadowColor: 'rgba(245, 239, 239, 0.2)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  addButton: {
    marginTop: 30,
    backgroundColor: COLORS.BG_DARK_BLUE,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionContainer: {
    marginTop: 8,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
    resizeMode: 'contain',
  },
  iconCheck: {
    width: 30,
    height: 30,
    marginRight: 10,
    resizeMode: 'contain',
  },
  typeButton: {
    borderWidth: 1,
    borderColor: COLORS.BG_DARK_BLUE,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginRight: 10,
    backgroundColor: 'white',
    color: COLORS.BG_DARK_BLUE,
  },
  typeButtonSelected: {
    backgroundColor: COLORS.BG_DARK_BLUE,
  },
  typeText: {
    color: COLORS.BG_DARK_BLUE,
    fontWeight: 'bold',
  },
  typeTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    backgroundColor: 'white',
    marginLeft: 10,
    width: 100,
    paddingHorizontal: 8,
  },

  currencySymbol: {
    fontSize: 16,
    color: 'black',
    marginRight: 4,
  },

  amountInput: {
    flex: 1,
    paddingVertical: 6,
    fontSize: 16,
    color: 'black',
  },

  distributionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  participantName: {
    width: 100,
    fontSize: 16,
    color: 'black',
  },
  inputContainer: {
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: 'white',
  },

  inputError: {
    borderColor: 'red',
  },

  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});
