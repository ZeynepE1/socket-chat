import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import io from 'socket.io-client'
import { GiftedChat } from 'react-native-gifted-chat'
import { connect } from 'react-redux'
import ChatAPI from '../api/chat';
import { Button, TextInput } from 'react-native-paper'
import { useIsFocused } from '@react-navigation/native'
import translate from 'translate-google-api';

const Chat = ({ userData, route }) => {
    // const { userID } = route.params
    // console.log("gönderen", userData.user.userID)
    // console.log("alan", userID)
    const [messages, setMessages] = useState([])
    const [refresh, setRefresh] = useState(false)
    // const [textValue, setTextValue] = React.useState("");
    const socketRef = useRef()
    const isFocused = useIsFocused()

    // socketRef.current = io('http://194.5.236.6:9001')
    socketRef.current = io('http://194.5.236.6:9001')
    var userIDs = userData.user.userID;

    const cevir = async () => {
        const result = await translate(`I'm fine.`, {
            tld: "cn",
            to: "es",
        });

        return result
    }



    useEffect(() => {
        cevir().then(result => {
            console.log("result", result)
        })

        socketRef.current.emit('addUser', userIDs)
        socketRef.current.on('getUsers', (users) => {
            console.log("***********", users)
            // setMessages(previousMessages => GiftedChat.append(previousMessages, messageData.messages))
        })
        let isApiSubscribed = true;

        // ChatAPI.getMessages(userData.user.userID, route.params?.userID, (resp, err) => {
        //     // console.log("resppppp", resp)
        //     if (isApiSubscribed) {

        //         // console.log("*-***", resp.messages)
        //         setMessages(resp.newArray);
        //     }
        // }).catch((err) => {
        //     // console.log(err)
        // })
        return () => {
            isApiSubscribed = false;
        };

    }, [isFocused])

    const onSend = (messages) => {
        const chatData = {
            reveiver: route.params?.userID,
            sender: userData.user.userID,
            chatID: userData.user.userID + route.params?.userID
        }
        const mes = messages[0];
        // console.log("messages", messages)

        // const { username } = userData;
        mes['username'] = userData.user.username;
        // setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        // console.log("username*************", username)
        const data = {
            receiverId: route.params?.userID,
            senderId: userData.user.userID,
            text: mes
        }
        socketRef.current.emit('sendMessage', data)
        // socketRef.current.on('userInfo', (userInfo) => {
        //     console.log(userInfo)
        // })

        // setMessages(previousMessages => GiftedChat.append(previousMessages, messages))


        socketRef.current.on('getMessage', (sender, text) => {
            console.log("***********", sender)
            console.log("***********", text)
            // setMessages(previousMessages => GiftedChat.append(previousMessages, messageData.messages))
        })
    }


    // const onSend = () => {
    //     const message = {
    //         _id: Math.round(Math.random() * 1000000),
    //         text: textValue,
    //         createdAt: new Date(),
    //         id: Math.round(Math.random() * 1000000),
    //         reveiver: userID,
    //         sender: userData.user.userID,
    //         chatID: userData.user.userID + userID
    //     }
    //     // let userObject = message[0].user
    //     // let txt = message[0].text
    //     // console.log(message)
    //     // console.log("giden message", message)
    //     socketRef.current.emit('message', message)
    //     socketRef.current.on('message', (message) => {
    //         messages.push(message)
    //         // setMessages(previousMessages => GiftedChat.append(previousMessages, message))
    //     })
    //     // const messageObject = {
    //     //     text: txt,
    //     //     user: userObject
    //     // }
    //     setTextValue("")

    // }
    // const renderMessages = ({ item }) => {
    //     // console.log("data", item)
    //     return (
    //         // <Text style={{ alignSelf: item.sender == userData.user.userID ? 'flex-end' : 'flex-start', backgroundColor: 'grey', margin: 6, width: '50%', padding: 10 }}>{item.text}</Text>  

    //         <Text style={item.sender == userData.user.userID ? styles.senderStyle : styles.reveiverStyle}>{item.text}</Text>
    //     )
    // }
    return (
        <GiftedChat
            messages={messages}
            onSend={onSend}
            // onPressAvatar={(user) => alert(user.name)}
            user={{
                _id: userData.user.userID,
            }}
        />
        // <>
        //     <FlatList data={messages} inverted renderItem={renderMessages} keyExtractor={(item) => item._id} />
        //     <TextInput
        //         label="Mesaj"
        //         value={textValue}
        //         onChangeText={textValue => setTextValue(textValue)}
        //     />
        //     <Button onPress={() => onSend()}>Gönder</Button>
        // </>
        // <GiftedChat
        //     // isLoadingEarlier
        //     scrollToBottom
        //     infiniteScroll
        //     loadEarlier
        //     alwaysShowSend
        //     renderUsernameOnMessage
        //     inverted={true}
        //     showUserAvatar
        //     messages={messages}
        //     onSend={message => onSend(message)}
        //     user={{
        //         _id: userData.user.userID,
        //         senderID: userData.user.userID,
        //         reveiver: userID,
        //         avatar: 'https://placeimg.com/140/140/any'
        //     }}
        // />
    )
}

const styles = StyleSheet.create({
    senderStyle: {
        alignSelf: 'flex-end',
        backgroundColor: 'green',
        color: 'white',
        margin: 6,
        width: '50%',
        borderRadius: 15,
        padding: 10
    },
    reveiverStyle: {
        alignSelf: 'flex-start',
        backgroundColor: 'grey',
        color: 'black',
        margin: 6,
        width: '50%',
        borderRadius: 15,
        padding: 10
    }
});


const mapStateToProps = ({ userData }) => {
    return {
        userData
    }
}
const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout()),
})
export default connect(mapStateToProps, mapDispatchToProps)(Chat)