import axios from 'axios';

export default class UserAPI {
    static async getAllUsers(callback) {
        await axios.get('http://194.5.236.6:9000/api/v1/admin', {
        })
            .then((resp) => {
                callback(resp.data, false)
            })
            .catch((error) => {
                callback(error.response, true)

                if (error.response) {
                    console.log(error.response.data)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                } else if (error.request) {
                    console.log(error.request)
                } else {
                    console.log('Error', error.message)
                }
                console.log(error.config)
                //message.error('Bir hata oluştu lütfen tekrar deneyiniz');
            })
    }
}