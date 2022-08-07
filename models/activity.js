const mongoose = require('mongoose')

const activitySchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: false
    },
    isDeleatable: {
        type: Boolean,
        required: true
    },
})

module.exports = mongoose.model('Activity', activitySchema)