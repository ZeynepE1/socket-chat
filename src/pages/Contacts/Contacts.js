import { View, StyleSheet, Text, ScrollView, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react'
import { logout } from '../../action/creators'
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, Searchbar, FAB, Portal, Provider } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native'
import ContactAPI from '../../api/contact';
import { SafeAreaView } from 'react-native-safe-area-context'

import { useNavigation } from '@react-navigation/native';
import UserCard from './ContactCard';
const Contacts = ({ logout, userData }) => {
    //logout();
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [state, setState] = React.useState({ open: false });

    const onStateChange = ({ open }) => setState({ open });

    const { open } = state;


    const onChangeSearch = query => setSearchQuery(query);
    useEffect(() => {
        let isApiSubscribed = true;

        ContactAPI.getContacts(userData.user.userID, (resp, err) => {
            console.log('****', resp);
            if (isApiSubscribed) {
                setData(resp.contacts);
            }
        }).catch((err) => {
            console.log(err)
        })
        return () => {
            isApiSubscribed = false;
        };
    }, [isFocused]);

    const renderUsers = ({ item }) => {
        return (
            <UserCard item={item} navigation={navigation} />
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
            <FlatList data={data} renderItem={renderUsers} keyExtractor={(item) => item._id} />
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

const mapStateToProps = ({ userData }) => {
    return {
        userData
    };
};
const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
});
export default connect(mapStateToProps, mapDispatchToProps)(Contacts);