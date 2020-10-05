const mongoose = require('mongoose');
const User = mongoose.model('User')

const getQueue = require('request');
require('dotenv/config');

module.exports = {
    async get(request, response){
        await getQueue(process.env.ASKOZIA_QUEUE_SHOW_STATUS, function (error, res, body) {  
            Queue = JSON.parse(body)
            if (!error && response.statusCode == 200) {
                return response.json(Queue);
            } else {
                return
            }
        })
    }
}