const mongoose = require('mongoose');
const Queue = mongoose.model('Queue')

const getQueue = require('request');
require('dotenv/config');

module.exports = {
    async get(request, response){
        await getQueue(process.env.ASKOZIA_QUEUE_SHOW_STATUS, function (error, res, body) {  
            queue = JSON.parse(body)
            if (!error && response.statusCode == 200) {
                agents = queue.agents;
                agents.forEach(async function (agent, array) {
                    agent = {
                        extension: agent.extension,
                        calls_today: agent.calls_today,
                        last_call: agent.last_call
                    }
                    const agentOnline = Queue.findOne({extension: agent.extension})
                    console.log(agentOnline)
                    if(agentOnline){
                        console.log(`${agent.extension}  está conectado`)
                    } else {
                        console.log(`${agent.extension}  Conectou agora!`)
                        // const res = User.create(agent);
                    }
                    response.json({message: "Lista de usuários atualizada!", res})      
                })
                // const agentsOnline = Queue.find();
                // return response.json(agentsOnline);  
            } else {
                return    
            }
        })
    }
}