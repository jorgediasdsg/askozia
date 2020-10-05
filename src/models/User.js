const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const UserSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    callerid: {
        type: String,
    },
    description: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

UserSchema.plugin(mongoosePaginate)
mongoose.model('User', UserSchema)