const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config()
const app = express()

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}

mongoose.connect(process.env.MONGOOSE_URI || 'mongodb://localhost/activity');
const db = mongoose.connection;
db.on('error', (err) => console.error(err))
db.once('open', () => console.log('connected to db'))

app.use(express.json())
app.use(cors(corsOptions))

const activityRouter = require('./routes/activity')
app.use('/activity', activityRouter)

app.listen(3000, () => console.log('running'))