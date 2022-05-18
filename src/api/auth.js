import axios from 'axios';

export default class AuthAPI {




    static async register(values, callback) {

        const params = JSON.stringify({

            "email": values.email,
            "username": values.username,
            "password": values.password,
            "phone": values.phone

        });

        axios.post('http://194.5.236.6:9000/api/v1/auth/register', params, {

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

    static async login(values, age, date, gender, getCampaignsMail, getCampaignsSMS, privacyPolicy, personalDataPolicy, kvkk, callback) {

        const params = JSON.stringify({
            "tcNo": values.tcNo,
            "name": values.name,
            "email": values.email,
            "username": values.username,
            "password": values.password,
            "phone": values.phone,
            "age": age,
            "birthday": date,
            "address": values.address,
            "job": values.job,
            "height": values.height,
            "weight": values.weight,
            "targetWeight": values.targetWeight,
            "gender": gender,
            "getCampaignsMail": getCampaignsMail,
            "getCampaignsSms": getCampaignsSMS,
            "privacyPolicy": privacyPolicy,
            "personalDataPolicy": personalDataPolicy,
            "kvkk": kvkk
        });

        axios.post('http://194.5.236.6:3000/api/v1/auth/register', params, {

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



    // return await axios({
    //     method: 'post',
    //     url: 'http://194.5.236.6:3000/api/v1/login',
    //     headers: {},
    //     data: {
    //         email: values.username, // This is the body part
    //         password: values.password, // This is the body part
    //     }
    // }).then((resp) => {
    //     console.log(resp)
    // }).catch((err) => {
    //     console.log(err)
    // });

    // await axios.post('http://194.5.236.6:3000/api/login', form, {
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    // })
    //     .then((resp) => {
    //         console.log(resp)
    //         callback(resp.data)
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //     })
}