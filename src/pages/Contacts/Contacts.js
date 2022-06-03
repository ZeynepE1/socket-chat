import { View, StyleSheet, Text, ScrollView, FlatList, SafeAreaView } from 'react-native';
import React, { useEffect, useState, useRef } from 'react'
import { logout } from '../../action/creators'
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, Searchbar, FAB, Portal, Provider } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native'
import ContactAPI from '../../api/contact';

import translate from 'translate-google-api';

import { useNavigation } from '@react-navigation/native';
import UserCard from './ContactCard';
const Contacts = ({ logout, userData, socket }) => {

    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [state, setState] = React.useState({ open: false });
    const [messageCount, setMessageCount] = useState(0);
    const [message, setMessage] = useState('');
    const cevir = async (text) => {
        const result = await translate(text, {
            tld: "cn",
            to: "en",
        });

        return result
    }
    const onStateChange = ({ open }) => setState({ open });


    const { open } = state;


    const onChangeSearch = query => setSearchQuery(query);
    useEffect(() => {

        //KULLANICI BİLGİLERİNİ SERVERE GÖNDERDİK
        socket.emit('addUser', userData.user.userID, userData.user.username, userData.user.avatar)

        //SERVERİNDEKİ KULLANICI BİLGİLERİNİ ALDIK
        socket.on('getUsers', (users) => {
            console.log("*****users******", users)
            setData(users)
        })

    }, [isFocused]);

    useEffect(() => {
        socket.on('getMessage', (message) => {
            console.log("*****mmmm******", message.messageObj)
            cevir(message.messageObj.text).then(result => {
                message.messageObj.text = result;
                setMessage(message.messageObj.text)
            })


        })
    }, [])

    const renderUsers = ({ item }) => {
        return (
            <UserCard item={item} navigation={navigation} userData={userData} lastMessage={message} />
        )
    }

    const exitApp = () => {

        socket.disconnect()
        logout();
    }
    return (
        <SafeAreaView style={styles.container}>
            <Button color='black' icon="logout" style={{ backgroundColor: '#bff5e9', width: '95%', alignSelf: 'center' }} onPress={() => exitApp()}><Text>Çıkış</Text></Button>

            <FlatList data={data} renderItem={renderUsers} keyExtractor={(item) => item.userId} />
            <Provider>
                <Portal>
                    <FAB.Group
                        open={open}
                        icon={'account-settings'}
                        actions={[

                            {
                                icon: 'headset',
                                label: 'Ayarlar',
                                onPress: () => navigation.navigate('Settings'),
                            },

                        ]}
                        onStateChange={onStateChange}
                        onPress={() => {
                            if (open) {

                            }
                        }}
                    />
                </Portal>
            </Provider>

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },

});

const mapStateToProps = ({ userData, socket }) => {
    return {
        userData, socket
    };
};
const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
});
export default connect(mapStateToProps, mapDispatchToProps)(Contacts);