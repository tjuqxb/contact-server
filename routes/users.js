var express = require('express');
const router = express.Router();
const {parameterValidate, check_api_token} = require('../middleware/Validator');
const md5 = require('blueimp-md5');
const jwt = require('jwt-simple');
const moment = require('moment');
const userController  = require('../controller/UserController');


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
    const token = jwt.encode({
        iss: newUser._id, // id
        exp: moment().add('days', 7).valueOf() // token expires in 7 days
    }, 'ccontact');
    res.status(201).json({
        token,
        user: {
            id: user._id,
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
