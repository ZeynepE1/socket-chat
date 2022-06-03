import { View, StyleSheet, Text, ScrollView, FlatList } from 'react-native';
import React, { useEffect, useState, useRef } from 'react'
import { logout } from '../../action/creators'
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, Searchbar } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native'
import UserAPI from '../../api/user';
import { SafeAreaView } from 'react-native-safe-area-context'
import filter from 'lodash/filter'

import { useNavigation } from '@react-navigation/native';
import UserCard from './UserCard';
const Home = ({ logout, userData }) => {
    //logout();
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([])
    const [searchQuery, setSearchQuery] = React.useState('');
    const [noDataAlert, setNoDataAlert] = useState(false)
    const [searchText, setSearchText] = useState('')

    const onChangeSearch = (text) => {
        // yazılan texti küçük harflere çeviriyoruz.
        const formattedText = text.toLowerCase()

        // inputtan gelen texti datamızın içinde filter ediyoruz. lodash/filter'ı kullandık.
        var filteredData = ''
        filteredData = filter(data, (user) => {
            return contains(user.username.toLowerCase(), formattedText)
        })
        // eğer inputtan gelen bir text varsa flat liste filtrelediğimiz datayı göndermek için datayı set ediyoruz.
        if (text.length >= 1) {
            setData(filteredData)
        } else {
            //  eğer inputtan gelen text yoksa veya yazılan text temizlenmişse tekrar eski datamızı göstermek için eski datamızı set ediyoruz.
            setData(data2)
        }
        // eğer filter datamızda arama sonucu bir sonuç yoksa alerti ve eski datamızı set ediyoruz.
        if (filteredData.length == 0) {
            setNoDataAlert(true)
            setData(data2)
        } else {
            setNoDataAlert(false)
        }
        setSearchText(text)
    }
    const contains = (name, query) => {
        if (name.includes(query)) {
            return true
        }
        return false
    }
    useEffect(() => {

        let isApiSubscribed = true;
        if (isFocused && isApiSubscribed) {
            UserAPI.getAllUsers((resp, err) => {

                if (isApiSubscribed) {
                    setData(resp.users);
                    setData2(resp.users);
                }
            }).catch((err) => {

            })
        }
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
            <Button color='black' icon="logout" style={{ backgroundColor: '#bff5e9', width: '95%', alignSelf: 'center' }} onPress={() => navigation.navigate('Contacts')}><Text>Tamam</Text></Button>
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchText}
                style={{ width: '95%', alignSelf: 'center' }}
            />
            {noDataAlert ? (
                <Text style={styles.alertText}>Kullanıcı Bulunamadı.</Text>
            ) : (
                <FlatList data={data} renderItem={renderUsers} keyExtractor={(item) => item._id} />
            )}

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    alertText: {
        fontSize: 20,
        alignSelf: 'center',
        marginTop: 20,
        color: 'red'
    }
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