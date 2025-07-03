import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import MyGroupsScreen from '../screens/MyGroupsScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconSource;

          if (route.name === 'Home') {
            iconSource = require('../assets/home_tab_icon.png');
          } else if (route.name === 'My Groups') {
            iconSource = require('../assets/my_groups_tab_icon.png');
          }

          return (
            <Image
              source={iconSource}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? 'white' : '#ccc', // icon tint
              }}
              resizeMode="contain"
            />
          );
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#ccc',
        tabBarStyle: {
          backgroundColor: 'rgb(55,125,253)', // 🔸 SET BACKGROUND COLOR HERE
          paddingBottom: 10,
          paddingTop:5,
          marginBottom:55,
          height: 55,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="My Groups" component={MyGroupsScreen} />
    </Tab.Navigator>
  );
}
