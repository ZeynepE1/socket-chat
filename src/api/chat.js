import axios from 'axios';

export default class ChatAPI {
    static async getMessages(senderID, reveiverID, callback) {
        await axios.get('http://194.5.236.6:9000/api/v1/chat/get-messages/' + senderID + '/' + reveiverID, {
        })
            .then((resp) => {
                callback(resp.data, false)
            })
            .catch((error) => {
                callback(error.response, true)

                if (error.response) {

                } else if (error.request) {
                    console.log(error.request)
                } else {
                    console.log('Error', error.message)
                }


            })
    }
}