const express = require('express')
const router = express.Router();
const Activity = require('../models/activity')

//Getting all
router.get('/', async (req, res) => {
    try {
        const activity = await Activity.find()
        res.json(activity)
    } catch (error){
        res.status(500).json({message: error.message})
    }
})

//Getting one
router.get('/:id', getActivity, (req, res) => {
    res.json(res.activity)
})
//Creating one
router.post('/', async (req, res) => {
    const activity = new Activity({
        message: req.body.message,
        completed: req.body.completed
    })

    try{
        const newActivity = await activity.save()
        res.status(201).json(newActivity)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})
//Updating one
router.patch('/:id', getActivity, async (req, res) => {
    if (req.body.message !== null){
        res.activity.message = req.body.message
    }
    if (req.body.completed !== null){
        res.activity.completed = req.body.completed
    }
    try {
        const updatedActivity = await res.activity.save();
        res.json(updatedActivity)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})
//Deleting one
router.delete('/:id', getActivity, async (req, res) => {
    try{
        await res.activity.remove()
        res.json({message: "deleted!"})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

async function getActivity(req, res, next) {
    let activity
    try{
        activity = await Activity.findById(req.params.id)
        if (activity == null) {
            return res.status(404).json({message: "Cannot find!"})
        }
    } catch (error){
        return res.status(500).json({message: error.message})
    }

    res.activity = activity;
    next()
}

module.exports = router