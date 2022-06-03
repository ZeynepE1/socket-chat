import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Badge } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ContactAPI from '../../api/contact';
import { connect } from 'react-redux';



const UserCard = ({ item, navigation, userData }) => {
    const [click, setClick] = useState(false);
    const addUser = () => {
        const values = {
            userID: userData.user.userID,
            contactID: item._id,
            contactName: item.username,
        }
        setClick(true)
        ContactAPI.addContact(values, (resp, err) => {
            if (isApiSubscribed) {

            }
        }).catch((err) => {

        })

    }

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: 10 }}>
            <View onPress={() => navigation.navigate('Chat', {
                userID: item._id
            })} style={styles.cardStyle}>
                <Image style={styles.imageStyle} source={{ uri: item.avatar }} />

                <Text style={{ marginLeft: 10 }}>{item.username}</Text>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardStyle: {
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',

        width: '100%',
        padding: 20,
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        shadowColor: "#000",
        flex: 1,
        shadowOpacity: 0.2,
        shadowRadius: 3.00,

        elevation: 0,
    },
    imageStyle: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    badge: { position: 'absolute', margin: 0, right: 310, bottom: 55, backgroundColor: 'green' },
    buttonStyle: {
        alignItems: 'center',

    },
    buttonAdd: {
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',

        width: '15%',
        padding: 20,
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        shadowColor: "#000",
        flex: 1,
        shadowOpacity: 0.2,
        shadowRadius: 3.00,
        elevation: 0,
    }
});
const mapStateToProps = ({ userData }) => {
    return {
        userData
    };
};
const mapDispatchToProps = dispatch => ({

});
export default connect(mapStateToProps, mapDispatchToProps)(UserCard)