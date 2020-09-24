var express = require('express');
const router = express.Router();
const {parameterValidate, check_api_token} = require('../middleware/Validator');
const contactController = require('../controller/ContactController');

router.get("/:id", check_api_token, (req, res) => {
    const id = req.params.id;
    return contactController.getContactsByUser(id).then(data => {
        res.status(201).json(data);
    }).catch(err => {
        res.status(401).json(err);
    })
});


router.post("/add",check_api_token, (req,res) => {
    const newContact = req.body;
    return contactController.createContact(newContact).then((data)=> {
        res.status(201).json(data);
    }).catch(err => {
        res.status(401).json(err);
    });
});

router.patch("/:id",check_api_token, (req,res) => {
    const changeContact = req.body;
    return contactController.editContact(changeContact).then((data) => {
        res.status(201).json(data);
    }).catch(err => {
        res.status(401).json(err);
    })
});

router.delete("/:id", check_api_token, (req, res) => {
    const id = req.params.id;
    return contactController.deleteTag(id).then(data => {
        res.status(201).json(data);
    }).catch(err => {
        res.status(401).json(err);
    })
});

module.exports = router;
