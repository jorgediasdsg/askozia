const mongoose = require('mongoose');
const Queue = mongoose.model('Queue')
const send = require('./AlertController') 
const User = require('./UserController') 
var fistRun = true;

const getQueue = require('request');
require('dotenv/config');

module.exports = {
    async get(request, response){
        const agentsRecord = await Queue.find();  
        await getQueue(process.env.ASKOZIA_QUEUE_SHOW_STATUS, function (error, res, body) {  
            queue = JSON.parse(body)
            // console.table(queue)
            // if (!error && response.statusCode == 200) {
            agents = queue.agents;
            // Verifica e cadastra os online
            if(fistRun==true){
                User.get(); 
            }
            if(!agents){
                if(fistRun==true){
                console.log("Ninguem online")
                send.alert("Ninguem online");
                }
            } else {
                agents.forEach(async function (agent, array) {
                    agent = {
                        extension: agent.extension,
                        calls_today: agent.calls_today,
                        last_call: agent.last_call
                    }
                    const agentOnline = await Queue.findOne({extension: agent.extension})
                    const userName = await User.getUser(agent.extension)
                    
                    // console.log(agentOnline)
                    var now = new Date()
                    if(agentOnline){
                        if(fistRun == true){
                            await console.log(`${userName.description}  estava conectado`)
                            var msg = `:white_check_mark: ${userName.description} já estava logado em ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} ${now.getDate()}/${now.getMonth()}/${now.getFullYear()}`
                            await send.alert(msg);
                        }
                    } else {
                        console.log(`${userName.description}  conectou agora!`)
                        var msg = `:arrow_up_small: ${userName.description} acabou de logar em ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} ${now.getDate()}/${now.getMonth()}/${now.getFullYear()}`
                        send.alert(msg);
                        const res = Queue.create(agent);
                    }
                })
            
                // Verifica e remove os offline
                agentsRecord.forEach(async function (agentRecord, array) {
                    const userName = await User.getUser(agentRecord.extension)
                    const agents = queue.agents;
                    const agentIndex = await agents.findIndex(agent => agent.extension === agentRecord.extension)
                    if (agentIndex < 0){
                        // return response.status(400).json({ error: 'agent not found.'})
                        const remove = await Queue.findByIdAndDelete(agentRecord)
                        await console.log(`${userName.description} saiu!`)
                        var now = new Date()
                        send.alert(`:arrow_down_small: ${userName.description} acabou de sair  em - ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} ${now.getDate()}/${now.getMonth()}/${now.getFullYear()}`);
                    } else {
                        // console.log(`${userName.description} está Online`)
                        // return response.status(200).json({ error: 'Ok.'})
                    }
                    // online = agents.find({extension : agentRecord.extension})
                    // console.table(agentsRecord)     
                })    
            }
            // console.table(agents)
            fistRun = false;
            // if (!error && response.statusCode == 200) {
            //         response.json({agents})        
            // } else {  
            //     return
            // } 
        }) 
    }
}
