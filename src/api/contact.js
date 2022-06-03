import axios from 'axios';

export default class ContactAPI {
    static async getContacts(userID, callback) {
        console.log(userID);
        await axios.get('http://194.5.236.6:9000/api/v1/contact/' + userID, {
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
                console.log(error.config)

            })
    }

    static async addContact(values, callback) {

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

            });

    }

}