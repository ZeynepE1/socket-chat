import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Badge } from 'react-native-paper';


const UserCard = ({ item, navigation, messageCount, lastMessage }) => {
    return (
        <View style={styles.cardStyle}>
            <TouchableOpacity onPress={() => navigation.navigate('Chat', {
                userID: item.userId
            })} style={styles.cardStyle2} >
                <View style={styles.imageStyle}>
                    <Image style={{ width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 50 }} source={{ uri: 'https://placeimg.com/60/60/any' }} />
                </View>
                {/* <Badge size={10} style={styles.badge}></Badge> */}
                <Text style={{ marginLeft: 10 }}>{item.userName}</Text>
            </TouchableOpacity>
            <Text style={{
                marginLeft: 60, color: 'grey', fontSize: 12,
                alignSelf: 'flex-start',
            }}>{lastMessage}</Text>
        </View >

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
    cardStyle2: {
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
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
        borderRadius: 50,
        borderColor: 'green',
        borderWidth: 2,
        padding: 2
    },
    // badge: { position: 'absolute', margin: 0, right: 320, bottom: 55, backgroundColor: 'green' },
});
export default UserCard