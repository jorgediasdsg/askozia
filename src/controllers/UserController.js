const mongoose = require('mongoose');
const User = mongoose.model('User')
const send = require('./AlertController') 

const getUsers = require('request');
require('dotenv/config');

module.exports = {
    async getUser(request, response){
        const userId = "20"+request
        const userIndex = await User.find({userId:userId})
        const user = await User.findById(userIndex)
        // console.log(user)
        // console.log(user.description)
        return user
    },
    async index(request, response){
        const { page=1 } = request.query;
        const users = await User.paginate({},{page, limit:10})
        return response.json(users)
    },
    async store(request, response){
        const user = await User.create(request.body);
        return response.json(user);
    },
    async get(request, response){
        await getUsers(process.env.ASKOZIA_GET_ALL_EXTENSIONS, function (error, res, body) {  
            allUsers = JSON.parse(body)
                return allUsers;
        })
    },
    async set(request, response){
        await getUsers(process.env.ASKOZIA_GET_ALL_EXTENSIONS, function (error, res, body) {  
            const allUsers = JSON.parse(body)
            allUsers.forEach(async function (user, array) {
                const agent = {
                    userId: user.extension,
                    callerid: user.callerid,
                    description: user.descr
                }
                console.info(`${user.extension} ${user.callerid} ${user.descr} verificado`)
                // const agentExist = User.exists(agent.userId)
                const agentExist = await User.findOne({userId: agent.userId})
                if(agentExist){
                    console.log(`${user.descr} já existe`)
                } else {
                    const res = await User.create(agent);
                    console.log(`${user.descr} adicionado`)
                    console.info(`${agent.userId} ${agent.callerid} ${agent.description} criado`)
                };     
            });
            send.alert(":recycle: Lista de usuários atualizada!")
            response.json({message: "Lista de usuários atualizada!", res})    
        })
    }
}