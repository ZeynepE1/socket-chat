import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, Image, Alert, StyleSheet } from 'react-native';
import styles from './Register.style';
import { Formik } from 'formik';
import axios from 'axios';
import { connect } from 'react-redux';
import { login } from '../../action/creators';
import AuthApi from '../../api/auth';
import { TextInput, FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


const Register = ({ login, userData }) => {
    console.log('*****', userData)
    //const {data,loading,error,post} = usePost();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(values) {
        console.log(values)

        await AuthApi.register(values, (resp, err) => {
            console.log(resp)

            login(resp);

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
                    password: "",
                    email: "",
                    phone: ""
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
                                right={<TextInput.Icon name="human" />}

                            />
                            <TextInput
                                label="Email"
                                value={values.email}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                mode="flat"
                                right={<TextInput.Icon name="mail" />}

                            />
                            <TextInput
                                label="Phone"
                                value={values.phone}
                                onChangeText={handleChange('phone')}
                                onBlur={handleBlur('phone')}
                                mode="flat"
                                right={<TextInput.Icon name="phone" />}

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

const mapStateToProps = ({ userData }) => {
    return {
        userData
    };
};

const mapDispatchToProps = dispatch => ({
    login: value => dispatch(login(value))
});


export default connect(mapStateToProps, mapDispatchToProps)(Register);