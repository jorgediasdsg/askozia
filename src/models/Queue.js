const mongoose = require('mongoose');

const AgentSchema = new mongoose.Schema({
    extension: {
        type: String,
    },
    calls_today: {
        type: String,
    },
    last_call: {
        type: String,
    },
    update_at: {
        type: Date,
        default: Date.now,
    }
})

mongoose.model('Queue', AgentSchema)