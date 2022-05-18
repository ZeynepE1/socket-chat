import { View, Text } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import io from 'socket.io-client'
import { GiftedChat } from 'react-native-gifted-chat'

export default function Home() {
    const [messages, setMessages] = useState([])

    const socketRef = useRef()
    socketRef.current = io('http://194.5.236.6:3003')
    // console.log("chat ", socketRef.current)

    useEffect(() => {
        //   getMessages()
        //randomId()
        const socket = io('http://194.5.236.6:3003')
        console.log("socket")
        socket.emit('connection', "selam")
    }, [])

    const onSend = (message) => {
        console.log(message[0])
        // let userObject = message[0].user
        // let txt = message[0].text
        // console.log(message)

        socketRef.current.emit('message', message[0])
        // socketRef.current.on('message', (message) => {
        //     console.log(message)
        // })
        setMessages(previousMessages => GiftedChat.append(previousMessages, message))
        // const messageObject = {
        //     text: txt,
        //     user: userObject
        // }

    }

    return (
        <GiftedChat
            // isLoadingEarlier
            scrollToBottom
            infiniteScroll
            loadEarlier
            alwaysShowSend
            renderUsernameOnMessage
            inverted={true}
            showUserAvatar
            messages={messages}
            onSend={message => onSend(message)}
            user={{
                _id: "1",
                name: "Ensar",
                to: "Zeynep",
                avatar: 'https://placeimg.com/140/140/any'
            }}
        />
    )
}