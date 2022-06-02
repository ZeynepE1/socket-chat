import { View, StyleSheet, Text, ScrollView, FlatList, TouchableOpacity, Image } from 'react-native';

import React, { useEffect, useState, useRef } from 'react'

import { useNavigation } from '@react-navigation/native';
import UserAPI from '../../api/user';
import { useIsFocused } from '@react-navigation/native'
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TextInput, FAB, Button } from "react-native-paper";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from 'expo-image-picker';
import { showMessage } from 'react-native-flash-message'



const Settings = ({ userData }) => {
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(userData.user.language);
    const [image, setImage] = useState(userData.user.avatar);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });


        // console.log("RRRRRRRRRRRR", result)
        avatarData = {
            uri: result.uri,
            type: 'image/jpeg',
            name: 'avatar.jpg' + Math.random(),
            userID: userData.user.userID
        }
        UserAPI.updateAvatar(avatarData, (resp, err) => {
            //console.log('userData', userData)
            if (resp) {
                showMessage({
                    message: 'BAŞARILI',
                    description: 'Profil fotoğrafınız güncellendi!',
                    type: 'success',
                    position: 'top',
                    icon: 'success',
                    floating: true,
                    duration: 2500,
                    titleStyle: {
                        fontSize: 14,
                        fontWeight: 'bold',
                        //color: '#fff',
                    },
                    style: {
                        marginBottom: '6%',
                    },
                })
            } else {
                showMessage({
                    message: 'BAŞARISIZ',
                    description: 'Lütfen tekrar deneyiniz!',
                    type: 'danger',
                    position: 'top',
                    icon: 'danger',
                    floating: true,
                    duration: 2500,
                    titleStyle: {
                        fontSize: 14,
                        fontWeight: 'bold',
                        //color: '#fff',
                    },
                    style: {
                        marginBottom: '6%',
                    },
                })
            }
        }).catch((err) => {
            console.log(err)
        })

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    async function handleUpdate(values) {
        await UserAPI.updateUser(values, selectedLanguage, (resp, err) => {
            // console.log(resp);
            console.log("KULLANICI GUNCELLEMESİ: ", resp)
            if (resp.user) {
                userData.user.language = selectedLanguage;
                showMessage({
                    message: 'BAŞARILI',
                    description: 'Bilgileriniz güncellendi!',
                    type: 'success',
                    position: 'top',
                    icon: 'success',
                    floating: true,
                    duration: 2500,
                    titleStyle: {
                        fontSize: 14,
                        fontWeight: 'bold',
                        //color: '#fff',
                    },
                    style: {
                        marginBottom: '6%',
                    },
                })
            } else {
                showMessage({
                    message: 'BAŞARISIZ',
                    description: 'Bilgileriniz güncellenirken bir hata oluştu!',
                    type: 'danger',
                    position: 'top',
                    icon: 'danger',
                    floating: true,
                    duration: 2500,
                    titleStyle: {
                        fontSize: 14,
                        fontWeight: 'bold',
                        //color: '#fff',
                    },
                    style: {
                        marginBottom: '6%',
                    },
                })
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {

        let isApiSubscribed = true;
        if (isFocused && isApiSubscribed) {
            UserAPI.getUser(userData.user.userID, (resp, err) => {
                //console.log('userData', userData)
                if (isApiSubscribed) {
                    // console.log("respppp", resp.user)
                    setData(resp.user);
                    setLoaded(true);
                }
            }).catch((err) => {
                // console.log(err)
            })
        }
        return () => {
            isApiSubscribed = false;
        };
    }, [isFocused]);

    const handleError = (err) => {
        if (DocumentPicker.isCancel(err)) {
            Alert.alert(t('genel_basarisiz'), t('sporcuBelgeleri_belgeSecim'), [{ text: t('genel_tamam') }])
            // User cancelled the picker, exit any dialogs or menus and move on
        } else if (isInProgress(err)) {
            console.warn(t('sporcuBelgeleri_belgeSecimCoklu'))
        } else {
            throw err
        }
    }

    // console.log(data)
    return (
        <View>
            {
                loaded && (
                    <Formik
                        initialValues={{
                            username: data.username,
                            email: data.email,
                            phone: data.phone
                        }}
                        onSubmit={(formValues) => handleUpdate(formValues)}
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
                                        label="E-mail"
                                        value={values.email}
                                        onChangeText={handleChange("email")}
                                        onBlur={handleBlur("email")}
                                        mode="outlined"
                                        right={<TextInput.Icon name="mail" />}
                                    />
                                    <TextInput
                                        label="Telefon Numarası"
                                        value={values.phone}
                                        onChangeText={handleChange("phone")}
                                        onBlur={handleBlur("phone")}
                                        mode="outlined"
                                        right={<TextInput.Icon name="phone" />}
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

                                    {/* <Button style={{
                                        backgroundColor: "#06d6cc",
                                        width: "90%",
                                        alignSelf: "center",
                                        borderRadius: 25,
                                    }}
                                        color="white" onPress={pickImage}>BAS </Button> */}
                                    <TouchableOpacity onPress={pickImage}>
                                        {image && <Image source={{ uri: image }} style={{ width: 100, height: 100, alignSelf: 'center', margin: 10, borderRadius: 100 }} />}
                                    </TouchableOpacity>


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
                            </>
                        )}
                    </Formik>
                )
            }

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    logoContainer: {
        justifyContent: 'center',
    },
    bodyContainer: {
        justifyContent: 'center',
        padding: 20
    },

    fab: {
        position: 'absolute',
        margin: 10,
        right: 0,
        bottom: 0,
    },
    fabRegister: {
        position: 'absolute',
        margin: 10,
        left: 0,
        bottom: 0,
        backgroundColor: '#4a18a5'
    },
});

const mapStateToProps = ({ userData }) => {
    return {
        userData
    };
};
const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
