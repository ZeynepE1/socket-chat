import axios from 'axios';

export default class ContactAPI {
    static async getContacts(userID, callback) {
        console.log(userID);
        await axios.get('http://194.5.236.6:9000/api/v1/contact/' + userID, {
        })
            .then((resp) => {
                console.log('object', resp);
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

    static async addContact(values, callback) {
        console.log("gelen values", values)
        const params = JSON.stringify({
            "userID": values.userID,
            "contactID": values.contactID,
            'name': values.contactName
        });

        axios.post('http://194.5.236.6:9000/api/v1/contact/addContact', params, {

            "headers": {
                "content-type": "application/json",
            },

        })
            .then((res) => {
                callback(res.data, false)
            })

            .catch((error) => {
                callback(error.response.request.response, true)
                // if (error.response) {
                //     console.log(error.response.data)
                //     console.log(error.response.status)
                //     console.log(error.response.headers)
                // } else if (error.request) {
                //     console.log(error.request)
                // } else {
                //     console.log('Error', error.message)
                // }
            });

    }

}