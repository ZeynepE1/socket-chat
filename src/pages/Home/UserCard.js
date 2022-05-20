import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'


const UserCard = ({ item, navigation }) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('Chat', {
            userID: item._id
        })} style={styles.cardStyle}>
            <Text>{item.username}</Text>
            <Image style={styles.imageStyle} source={{ uri: 'https://placeimg.com/60/60/any' }} />
        </TouchableOpacity>
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
        justifyContent: 'space-between',
        width: '80%',
        padding: 20,
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        shadowColor: "#000",
        flex: 1,
        shadowOpacity: 0.2,
        shadowRadius: 3.00,

        elevation: 1,
    },
    imageStyle: {
        width: 50,
        height: 50,
        borderRadius: 50
    }
});
export default UserCard