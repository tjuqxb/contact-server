var express = require('express');
const router = express.Router();
const {parameterValidate, check_api_token} = require('../middleware/Validator');
const tagController = require('../controller/TagController');

router.get("/:id", check_api_token, (req, res) => {
    const id = req.params.id;
    return tagController.getTagsByUser(id).then(data => {
        res.status(201).json(data);
    }).catch(err => {
        res.status(401).json(err);
    })
})


router.post("/add",check_api_token, (req,res) => {
   const newColor = req.body;
   return tagController.createTag(newColor).then((data)=> {
        res.status(201).json(data);
   }).catch(err => {
       res.status(401).json(err);
   });
});

router.patch("/:id",check_api_token, (req,res) => {
    const changeTag = req.body;
    return tagController.editTag(changeTag).then((data) => {
        res.status(201).json(data);
    }).catch(err => {
        res.status(401).json(err);
    })
});

router.delete("/:id", check_api_token, (req, res) => {
    const id = req.params.id;
    return tagController.deleteTag(id).then(data => {
        res.status(201).json(data);
    }).catch(err => {
        res.status(401).json(err);
    })
});

module.exports = router;
