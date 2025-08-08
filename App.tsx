import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, StyleSheet} from 'react-native';
import HomeScreen from './screens/HomeScreen';
import ExpenseMainScreen from './screens/ExpenseMainScreen'; // import your screen
import AddExpense from './screens/AddExpense'; // ✅ Add this line

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          {/* <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}> */}
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerTitle: () => (
                <Text style={styles.headerTitle}>SplitMate</Text>
              ),
              headerStyle: {
                backgroundColor: 'rgb(186,219,254)', // ← Updated background color
              },
              headerTitleAlign: 'center',
            }}
          />

          <Stack.Screen
            name="ExpenseMain"
            component={ExpenseMainScreen}
            options={({route}) => ({
              title: 'SplitMate',
              headerTintColor: 'rgb(55,125,253)',
              headerTitleStyle: {fontWeight: 'bold'},
              headerStyle: {backgroundColor: 'rgb(186,219,254)'}, // ← same background
              headerTitleAlign: 'center',
            })}
          />

          <Stack.Screen
            name="AddExpense"
            component={AddExpense}
            options={{
              title: 'Add Expense',
              headerTintColor: 'rgb(55,125,253)',
              headerStyle: {backgroundColor: 'rgb(186,219,254)'},
              headerTitleAlign: 'center',
              headerTitleStyle: {fontWeight: 'bold'},
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
const styles = {
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgb(55,125,253)',
    // textShadowColor: 'rgb(250, 246, 246)',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
};
