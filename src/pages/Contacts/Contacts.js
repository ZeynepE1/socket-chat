import { View, StyleSheet, Text, ScrollView, FlatList, SafeAreaView } from 'react-native';
import React, { useEffect, useState, useRef } from 'react'
import { logout } from '../../action/creators'
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, Searchbar, FAB, Portal, Provider } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native'
import ContactAPI from '../../api/contact';
// import io from 'socket.io-client'

import { useNavigation } from '@react-navigation/native';
import UserCard from './ContactCard';
const Contacts = ({ logout, userData, socket }) => {
    //logout();
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [state, setState] = React.useState({ open: false });
    const [messageCount, setMessageCount] = useState(0);

    const onStateChange = ({ open }) => setState({ open });
    // const socketRef = useRef()

    const { open } = state;
    // socketRef.current = io('http://194.5.236.6:9001')

    const onChangeSearch = query => setSearchQuery(query);
    useEffect(() => {
        // socketRef.current.emit('badges', userData.user.userID)
        // // socketRef.current.on('messageCount', userData.user.userID)
        // socketRef.current.on('messageCount', (count) => {
        //     console.log("mesaj sayısı", count.messageCount)
        //     setMessageCount(count.messageCount)
        //     // // messages.push(messageData.messages)
        //     // // GiftedChat.append(messageData.messages)
        //     // setMessages(previousMessages => GiftedChat.append(previousMessages, messageData.messages))
        // })
        // let isApiSubscribed = true;
        socket.emit('addUser', userData.user.userID, userData.user.username)

        socket.on('getUsers', (users) => {
            console.log("*****users******", users)
            setData(users)
        })
        // ContactAPI.getContacts(userData.user.userID, (resp, err) => {
        //     // console.log('****', resp);
        //     if (isApiSubscribed) {
        //         setData(resp.contacts);
        //     }
        // }).catch((err) => {
        //     // console.log(err)
        // })
        // return () => {
        //     isApiSubscribed = false;
        // };
    }, [isFocused]);

    const renderUsers = ({ item }) => {
        return (
            <UserCard item={item} navigation={navigation} messageCount={messageCount} />
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <Button color='black' icon="logout" style={{ backgroundColor: '#bff5e9', width: '95%', alignSelf: 'center' }} onPress={() => logout()}><Text>Çıkış</Text></Button>
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={{ width: '95%', alignSelf: 'center' }}
            />
            <FlatList data={data} renderItem={renderUsers} keyExtractor={(item) => item.userId} />
            <Provider>
                <Portal>
                    <FAB.Group
                        open={open}
                        icon={'account-settings'}
                        actions={[

                            {
                                icon: 'human-greeting',
                                label: 'Kişi Ekle',
                                onPress: () => navigation.navigate('Home'),
                            },
                            {
                                icon: 'headset',
                                label: 'Ayarlar',
                                onPress: () => console.log('Pressed email'),
                            },

                        ]}
                        onStateChange={onStateChange}
                        onPress={() => {
                            if (open) {
                                // do something if the speed dial is open
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