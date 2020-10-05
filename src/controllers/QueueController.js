const mongoose = require('mongoose');
const Queue = mongoose.model('Queue')

const getQueue = require('request');
require('dotenv/config');

module.exports = {
    async get(request, response){
        const agentsRecord = await Queue.find();  
        await getQueue(process.env.ASKOZIA_QUEUE_SHOW_STATUS, function (error, res, body) {  
            queue = JSON.parse(body)
            if (!error && response.statusCode == 200) {
                agents = queue.agents;
                // Verifica e cadastra os online
                agents.forEach(async function (agent, array) {
                    agent = {
                        extension: agent.extension,
                        calls_today: agent.calls_today,
                        last_call: agent.last_call
                    }
                    const agentOnline = await Queue.findOne({extension: agent.extension})
                    
                    // console.log(agentOnline)
                    if(agentOnline){
                        console.log(`${agent.extension}  estava conectado`)
                    } else {
                        console.log(`${agent.extension}  conectou agora!`)
                        const res = Queue.create(agent);
                    }
                })
                // Verifica e remove os offline
                agentsRecord.forEach(async function (agentRecord, array) {
                    const agents = queue.agents;
                    const agentIndex = agents.findIndex(agent => agent.extension === agentRecord.extension)
                    if (agentIndex < 0){
                        // return response.status(400).json({ error: 'agent not found.'})
                        const remove = await Queue.findByIdAndDelete(agentRecord)
                        console.log(`${agentRecord.extension} saiu!`)
                    } else {
                        console.log(`${agentRecord.extension} está Online`)
                        // return response.status(200).json({ error: 'Ok.'})
                    }
                    // online = agents.find({extension : agentRecord.extension})
                    console.table(agentsRecord)     
                })    
                response.json({agentsRecord})           
            } else {  
                return
            } 
        })
    }
}