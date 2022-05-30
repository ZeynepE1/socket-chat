import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Badge } from 'react-native-paper';


const UserCard = ({ item, navigation }) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('Chat', {
            userID: item._id
        })} style={styles.cardStyle}>
            <Image style={styles.imageStyle} source={{ uri: 'https://placeimg.com/60/60/any' }} />
            <Badge style={styles.badge}>3</Badge>
            <Text style={{ marginLeft: 10 }}>{item.name}</Text>
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
});
export default UserCard