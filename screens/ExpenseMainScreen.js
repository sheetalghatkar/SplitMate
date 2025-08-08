import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import GroupParticipant from './GroupParticipant';
import GroupExpenses from './GroupExpenses';
import GroupEditModal from './GroupEditModal';
import {Alert} from 'react-native'; // Add this import
import {COLORS} from './Constant';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();

export default function ExpenseMainScreen({route, navigation}) {
  const insets = useSafeAreaInsets();
  const [members, setMembers] = useState([]); // Step 1

  // State to store current group name and currency
  const [groupDetails, setGroupDetails] = useState({
    groupName: route.params?.groupName || '',
    currency: route.params?.currency || 'INR',
  });

  const [editModalVisible, setEditModalVisible] = useState(false);

  const handleEdit = () => {
    setEditModalVisible(true);
  };

  const handleSave = ({groupName, currency}) => {
    setGroupDetails({groupName, currency});
    // Optionally: update on backend/local DB
  };

  return (
    <View
      style={{
        flex: 1,
        borderWidth: 1,
        margin: 20,
        padding: 5,
        marginBottom: 25,
        backgroundColor: 'white',
        borderColor: COLORS.BG_DARK_BLUE,
        borderRadius: 20,
      }}
      edges={['top']}>
      {/* Custom Header */}
      <View style={styles.headerBox}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.groupName}>{groupDetails.groupName}</Text>
          <Text style={styles.currency}>{groupDetails.currency}</Text>
        </View>
        <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
          <Image
            source={require('../assets/edit_blue.png')}
            style={styles.editIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Tabs */}

      <Tab.Navigator
        initialRouteName="Participant"
        screenOptions={{
          tabBarLabelStyle: {fontSize: 14, fontWeight: 'bold'},
          tabBarStyle: {
            backgroundColor: 'rgb(255, 255, 255)',
            marginTop: 20,
            overflow: 'hidden',
            elevation: 4,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.2,
            shadowRadius: 4,
          },
          tabBarActiveTintColor: 'rgb(55,125,253)',
          tabBarInactiveTintColor: '#d0d0d0',
          tabBarIndicatorStyle: {
            backgroundColor: 'rgb(55,125,253)',
            height: 3,
            borderRadius: 2,
          },
        }}>
        <Tab.Screen
          name="Participant"
          children={() => (
            <GroupParticipant members={members} setMembers={setMembers} />
          )}
        />
        <Tab.Screen
          name="Expenses"
          children={({navigation}) => (
            <GroupExpenses members={members} currency={groupDetails.currency} navigation={navigation} />
          )}
          listeners={({navigation}) => ({
            tabPress: e => {
              if (members.length === 0) {
                e.preventDefault(); // Prevent default tab behavior
                Alert.alert(
                  'No Participants',
                  'Please add at least one participant first.',
                );
              }
            },
          })}
        />
      </Tab.Navigator>

      {/* ✅ Reusable Modal */}
      <GroupEditModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        onSave={handleSave}
        initialGroupName={groupDetails.groupName}
        initialCurrency={groupDetails.currency}
        mode="update" // ✅ explicitly pass
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerBox: {
    // borderWidth: 0.5,
    // backgroundColor: 'white',
    // borderColor: 'rgb(55,125,253)',
    // borderRadius: 10,
    // margin: 20,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTextContainer: {
    flexDirection: 'column',
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgb(55,125,253)',
  },
  currency: {
    fontSize: 14,
    color: '#555',
    marginTop: 10,
  },
  editButton: {
    padding: 5,
  },
  editIcon: {
    width: 24,
    height: 24,
  },
});
