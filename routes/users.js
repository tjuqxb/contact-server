var express = require('express');
const router = express.Router();
const {parameterValidate} = require('../middleware/Validator');
const md5 = require('blueimp-md5');
const jwt = require('jwt-simple');
const moment = require('moment');
const userController  = require('../controller/UserController');
const tagController = require('../controller/TagController');
const log4js = require('log4js');
const logger = log4js.getLogger();
//logger.level = "OFF";


router.post("/register", parameterValidate({
    email: 'email',
    password: 'password'
}), async (req, res, next) => {
    const {email, password} = req.body;
    const user = await userController.findUserByEmail(email);
    if (user) {
        return res.status(409).json({
            error: 'Validation Failed',
            detail: [{
                message: 'conflict',
                field: 'email',
                code: 'conflict_field'
            }]
        });
    }
    const encryptedPass = md5(password);
    const newUser = await userController.createUser(email, encryptedPass);
    logger.info(newUser);
    const token = jwt.encode({
        iss: newUser._id, // id
        exp: moment().add('days', 7).valueOf() // token expires in 7 days
    }, 'ccontact');
    const friendTag = tagController.createTag({
        name:'Friend',
        color:'',
        user: newUser._id,
    });
    const familyTag = tagController.createTag({
        name:'Family',
        color:'',
        user: newUser._id,
    });
    res.status(201).json({
        token,
        user: {
            id: newUser._id,
            email: email
        }
    })
});

router.post("/signin", parameterValidate({
    email: 'email',
    password: 'password'
}),async (req, res, next) => {
    const {email, password} = req.body;
    const user = await userController.findUserByEmail(email);
    if (!user) {
        return res.status(401).json({
            error: 'email invalid'
        })
    }
    if (md5(password) !== user.password) {
        return res.status(401).json({
            error: 'password invalid'
        })
    }
    const token = jwt.encode({
        iss: user._id, // id
        exp: moment().add('days', 7).valueOf() // token expires in 7 days
    }, 'ccontact');
    res.status(201).json({
        token,
        user: {
            id: user._id,
            email: email
        }
    })
})


module.exports = router;
