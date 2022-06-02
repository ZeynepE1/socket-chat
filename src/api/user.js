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

    static async getUser(userID, callback) {
        await axios.get('http://194.5.236.6:9000/api/v1/user/' + userID, {
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

    static async updateAvatar(sendData, callback) {
        console.log("GELEN DATAM", sendData)
        const form = new FormData()
        form.append('userID', sendData.userID)

        form.append('avatar', {
            uri: sendData.uri,
            type: sendData.type,
            name: sendData.name,
        })


        await axios.post('http://194.5.236.6:9000/api/v1/user/upload-avatar', form, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((resp) => {
                callback(resp.data)

                // if (resp.data.status == 'success') {
                //     setSent(false)
                //     Alert.alert(successMiddleware(), successMiddleware(resp.data.message), [
                //         {
                //             text: t('genel_tamam'),
                //             onPress: () =>
                //                 navigation.reset({
                //                     index: 0,
                //                     routes: [{ name: 'İlaç Takvimi' }],
                //                 }),
                //         },
                //     ])
                // } else {
                //     setSent(false)
                //     const respError = ErrorAlert(resp.data.message)
                //     if (respError === 'kick') {
                //         dispatch({ type: 'LOGOUT' })
                //     }
                // }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    static async updateUser(values, callback) {

        const params = JSON.stringify({
            "email": values.email,
            "username": values.username,
            "phone": values.phone,
            "language": values.language
        });

        axios.post('http://194.5.236.6:9000/api/v1/user/update-user', params, {

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

    };
}