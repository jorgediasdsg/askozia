const mongoose = require('mongoose');
const User = mongoose.model('User')

const getUsers = require('request');
require('dotenv/config');

module.exports = {
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
        // const product = await Product.findByIdAndRemove(request.params.id);
        // return response.status(200).send('removed');
        await getUsers(process.env.ASKOZIA_GET_ALL_EXTENSIONS, function (error, res, body) {  
            allUsers = JSON.parse(body)
            if (!error && response.statusCode == 200) {
                return response.json(allUsers);
            } else {
                return
            }
        })
    },
    async set(request, response){
        await getUsers(process.env.ASKOZIA_GET_ALL_EXTENSIONS, function (error, res, body) {  
            const allUsers = JSON.parse(body)
            const ret = []
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
                    ret.push(res)
                };     
            });
            response.json({ret})    
        })
    }
}