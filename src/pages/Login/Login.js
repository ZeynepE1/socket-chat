import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  Alert,
  StyleSheet,
} from "react-native";
import styles from "./LoginStyle";
import { Formik } from "formik";
import axios from "axios";
import { connect } from "react-redux";
import { login } from "../../action/creators";
import AuthApi from "../../api/auth";
import { TextInput, FAB, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Picker, FormItem } from "react-native-form-component";

const LoginPage = ({ login }) => {
  //const {data,loading,error,post} = usePost();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);

  async function handleLogin(values) {
    await AuthApi.login(values, (resp, err) => {
      console.log(resp);
      if (resp.user) {
        login(resp);
      }
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
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../../../assets/logo.png")}
        />
      </View>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={(formValues) => handleLogin(formValues)}
      >
        {({ onSubmit, handleSubmit, handleChange, handleBlur, values }) => (
          <>
            <View style={styles.bodyContainer}>
              <TextInput
                label="Kullanıcı Adı"
                value={values.username}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                mode="outlined"
                right={<TextInput.Icon name="human" />}
              />

              <TextInput
                label="Şifre"
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                mode="outlined"
                secureTextEntry={secureText}
                right={<TextInput.Icon name="eye" onPress={handleSecureText} />}
              />
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
              Giriş
            </Button>
            <Button
              onPress={() => navigation.navigate("Register")}
              style={{
                marginTop: "15%",
                width: "90%",
                alignSelf: "center",
                borderRadius: 25,
              }}
              color="#06d6cc"
            >
              Kayıt Ol
            </Button>
            {/* <FAB
                            style={styles.fab}
                            icon="login"
                            onPress={() => handleSubmit()}
                            label='Giriş'
                        />
                        <FAB
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

const mapStateToProps = ({}) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  login: (value) => dispatch(login(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
