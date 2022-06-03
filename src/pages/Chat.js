import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import io from 'socket.io-client'
import { GiftedChat } from 'react-native-gifted-chat'
import { connect } from 'react-redux'
import ChatAPI from '../api/chat';
import { Button, TextInput } from 'react-native-paper'
import { useIsFocused } from '@react-navigation/native'
import translate from 'translate-google-api';

const Chat = ({ userData, route, socket }) => {

    const [messages, setMessages] = useState([])
    const [translatedArray, setTranslatedArray] = useState([])
    const [refresh, setRefresh] = useState(false)

    const isFocused = useIsFocused()

    var userIDs = userData.user.userID;
    const cevir = async (text) => {
        const result = await translate(text, {
            tld: "cn",
            to: userData.user.language,
        });

        return result
    }

    const topluCevir = async (textArray) => {
        const result = await translate(textArray, {
            tld: "cn",
            to: userData.user.language,
        });

        return result
    }





    useEffect(() => {







        let isApiSubscribed = true;

        //db deki varolan mesajları çekiyoruz

        ChatAPI.getMessages(userData.user.userID, route.params?.userID, (resp, err) => {

            if (isApiSubscribed) {
                var dataArray = [];
                var trsnArray = [];
                //db den gelen mesaj text lerini çeviriyoruz!
                topluCevir(resp.onlyMessages).then(result => {
                    setTranslatedArray(result)
                })



                if (translatedArray.length == 0) {
                    setRefresh(!refresh)
                }
                resp.newArray.map((element, i) => {
                    return dataArray.push({
                        _id: element._id,
                        text: translatedArray[i],
                        createdAt: element.createdAt,
                        user: {
                            _id: element.user._id,
                            name: element.user.name,

                        }
                    })
                })


                setMessages(dataArray)


            }
        }).catch((err) => {

        })
        return () => {
            isApiSubscribed = false;
        };

    }, [refresh])


    useEffect(() => {
        //karşı tarafın mesajlarını alıyoruz
        socket.on('getMessage', (message) => {
            console.log("*****mmmm******", message.messageObj)

            //gelen mesaj text ini kendi seçili dilime göre çeviriyoruz!
            cevir(message.messageObj.text).then(result => {
                message.messageObj.text = result;
                setMessages(previousMessages => GiftedChat.append(previousMessages, message.messageObj))
            })


        })


    }, [])
    //MESAJ GÖNDERME FONKSİYONU!
    const onSend = (messages) => {

        const mes = messages[0];

        mes['username'] = userData.user.username;


        //SOCKET E GÖNDERİLEN DATA!
        const data = {
            receiverId: route.params?.userID,
            senderId: userData.user.userID,
            text: mes,
            username: userData.user.username,
            chatID: userData.user.userID + route.params?.userID
        }

        //server a mesaj gönderme!
        socket.emit('sendMessage', data)
        //kendi gönderdiğim mesajı ken ekranımda görme!
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))

    }



    return (
        <GiftedChat
            messages={messages}
            onSend={onSend}
            onPressAvatar={(user) => alert('user.name')}
            user={{
                _id: userData.user.userID,
            }}
        />


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


const mapStateToProps = ({ userData, socket }) => {
    return {
        userData,
        socket
    }
}
const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout()),
})
export default connect(mapStateToProps, mapDispatchToProps)(Chat)