import { View, StyleSheet, Text, ScrollView, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react'
import { logout } from '../../action/creators'
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native'
import UserAPI from '../../api/user';
import { SafeAreaView } from 'react-native-safe-area-context'

import { useNavigation } from '@react-navigation/native';
import UserCard from './UserCard';
const Home = ({ logout, userData }) => {
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const [data, setData] = useState([]);

    useEffect(() => {
        let isApiSubscribed = true;

        UserAPI.getAllUsers((resp, err) => {
            if (isApiSubscribed) {
                setData(resp.users);
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
            {/* <Button onPress={() => logout()}><Text>Çıkış</Text></Button> */}

            <FlatList data={data} renderItem={renderUsers} keyExtractor={(item) => item._id} />

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
export default connect(mapStateToProps, mapDispatchToProps)(Home);