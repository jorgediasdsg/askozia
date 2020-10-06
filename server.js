const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const cors = require('cors')
const send = require('./src/controllers/AlertController') 

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/nodeapi', { 
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
requireDir('./src/models')

app.use('/api', require('./src/routes'))

var msg = `:desktop: Servidor iniciado`
const QueueServer = require('./src/controllers/QueueController')

send.alert(msg)
async function server(){
    const queue = QueueServer.get()
    await console.log(queue) 
    // await QueueServer
}
setInterval(server, 2000)
server

app.listen(3001);