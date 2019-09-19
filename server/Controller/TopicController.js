const express = require('express');
const TopicModel = require('../Model/TopicModel');
const router = express.Router();
router.get('/gettopic', (req, res) => {
    let topicModel = new TopicModel();
    topicModel.getalltopic((results) => {
        console.log(results)
        res.json(results)
    })

})

module.exports = router;