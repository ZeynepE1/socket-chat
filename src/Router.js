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
import Contacts from './pages/Contacts/Contacts';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { logout } from './action/creators'





const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();
const Router = ({ userData, socket, logout }) => {
  // console.log("0000000", socket)
  // logout();
  // console.log(userData.user.userID)
  return (
    <SafeAreaProvider>
      <NavigationContainer>


        {
          userData.user ? (


            <Tab.Navigator>
              <Tab.Screen name="Chat" component={Chat} />
              <Tab.Screen name="Contacts" component={Contacts} />
              <Tab.Screen name="Home" options={{ title: 'Users' }} component={Home} />
            </Tab.Navigator>


          ) : (
            <Stack.Navigator>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />

            </Stack.Navigator>

          )
        }




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


const mapStateToProps = ({ userData, socket }) => {
  return {
    userData, socket
  }
}
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
})
export default connect(mapStateToProps, mapDispatchToProps)(Router)