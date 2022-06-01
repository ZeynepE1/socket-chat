import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  Alert,
  StyleSheet,
} from "react-native";
import styles from "./Register.style";
import { Formik } from "formik";
import axios from "axios";
import { connect } from "react-redux";
import { login } from "../../action/creators";
import AuthApi from "../../api/auth";
import { TextInput, FAB, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-virtualized-view";
import { Picker } from "@react-native-picker/picker";

const Register = ({ login, userData }) => {
<<<<<<< HEAD
    console.log('*****', userData)
    //const {data,loading,error,post} = usePost();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState();
    // console.log("selectedLanguage", selectedLanguage)
    async function handleLogin(values) {
        //console.log(values)

        await AuthApi.register(selectedLanguage, values, (resp, err) => {
            //console.log(resp)

            login(resp);

        }).catch((err) => {
            console.log(err)
        })
    }
    const navigation = useNavigation();


    return (

        <SafeAreaView style={styles.container}>
            {/*    <View style={styles.logoContainer}>
=======
  console.log("*****", userData);
  //const {data,loading,error,post} = usePost();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [secureText, setSecureText] = useState(true);
  // console.log("selectedLanguage", selectedLanguage)
  async function handleLogin(values) {
    console.log(values);

    await AuthApi.register(selectedLanguage, values, (resp, err) => {
      console.log(resp);

      login(resp);
    }).catch((err) => {
      console.log(err);
    });
  }
  const navigation = useNavigation();
  const handleSecureText = () => {
    setSecureText(!secureText);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/*    <View style={styles.logoContainer}>
>>>>>>> 8cb5ea34e35193f4608410ae8a43293923dc02ff
                 <Image style={styles.logo} source={require('../../assets/logo/lg6.png')} />
             </View> */}
      <Formik
        initialValues={{
          username: "",
          password: "",
          email: "",
          phone: "",
        }}
        onSubmit={(formValues) => handleLogin(formValues)}
      >
        {({ onSubmit, handleSubmit, handleChange, handleBlur, values }) => (
          <>
            <View style={styles.bodyContainer}>
              <TextInput
                label="Username"
                value={values.username}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                mode="outlined"
                right={<TextInput.Icon name="human" />}
              />
              <TextInput
                label="Email"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                mode="outlined"
                right={<TextInput.Icon name="mail" />}
              />
              <TextInput
                label="Phone"
                value={values.phone}
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
                mode="outlined"
                right={<TextInput.Icon name="phone" />}
              />

              <TextInput
                label="Password"
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                mode="outlined"
                secureTextEntry={secureText}
                right={<TextInput.Icon name="eye" onPress={handleSecureText} />}
              />

              <Picker
                selectedValue={selectedLanguage}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedLanguage(itemValue)
                }
              >
                <Picker.Item label="Türkçe" value="tr" />
                <Picker.Item label="İngilizce" value="en" />
                <Picker.Item label="Almanca" value="de" />
              </Picker>
            </View>

            <Button
              onPress={() => handleSubmit()}
              style={{
                backgroundColor: "#06d6cc",
                width: "90%",
                alignSelf: "center",
                borderRadius: 25,
              }}
              color="white"
            >
              Kaydet
            </Button>
            {/* <FAB
                            style={styles.fab}
                            icon="login"
                            onPress={() => handleSubmit()}
                            label='Giriş'
                        /> */}
            {/* <FAB
                            style={styles.fabRegister}
                            icon="human"
                            onPress={() => navigation.navigate('Register')}
                            label='Kayıt Ol'
                        /> */}
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const mapStateToProps = ({ userData }) => {
  return {
    userData,
  };
};

const mapDispatchToProps = (dispatch) => ({
  login: (value) => dispatch(login(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
