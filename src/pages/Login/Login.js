import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, Image, Alert, StyleSheet } from 'react-native';
import styles from './Login.style';
import { Formik } from 'formik';
import axios from 'axios';
import { connect } from 'react-redux';
import { login } from '../../action/creators';
import AuthApi from '../../api/auth';
import { TextInput, FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const LoginPage = ({ login }) => {
    //const {data,loading,error,post} = usePost();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(values) {
        await AuthApi.login(values, (resp, err) => {
            console.log(resp)
            if (resp.user) {
                login(resp);
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    const navigation = useNavigation();


    return (
        <SafeAreaView style={styles.container}>
            {/*    <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../../assets/logo/lg6.png')} />
            </View> */}
            <Formik
                initialValues={{
                    username: "",
                    password: ""
                }}
                onSubmit={formValues => handleLogin(formValues)}
            >

                {({ onSubmit, handleSubmit, handleChange, handleBlur, values }) => (
                    <>
                        <View style={styles.bodyContainer}>

                            <TextInput
                                label="Username"
                                value={values.username}
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                mode="flat"
                                right={<TextInput.Icon name="human-male-height" />}

                            />

                            <TextInput
                                label="Password"
                                value={values.password}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                mode="flat"
                                secureTextEntry
                                right={<TextInput.Icon name="eye" />}
                            />

                        </View>
                        <FAB
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
                        />
                    </>
                )}


            </Formik>

        </SafeAreaView>
    );

}

const mapStateToProps = ({ }) => {
    return {};
};

const mapDispatchToProps = dispatch => ({
    login: value => dispatch(login(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);