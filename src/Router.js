import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { connect } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import FlashMessage from 'react-native-flash-message'

import Home from './pages/Home/Home';
import Chat from './pages/Chat';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';




const Stack = createNativeStackNavigator();
const Router = ({ userData }) => {
  // console.log(userData.user.userID)
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {
            userData.user ? (
              <>
                <Stack.Screen
                  name="Home"
                  component={Home}
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="Chat" options={{ title: 'Chat' }} component={Chat} />
              </>
            ) : (
              <>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
              </>
            )
          }



        </Stack.Navigator>
        <FlashMessage />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


const mapStateToProps = ({ userData }) => {
  return {
    userData
  }
}
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
})
export default connect(mapStateToProps, mapDispatchToProps)(Router)