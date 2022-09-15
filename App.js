import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux'
import store from './redux/store'


export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}


