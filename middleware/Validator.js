const Parameter = require('parameter')
const jwt = require('jwt-simple')
const moment = require('moment')

const parameter = new Parameter()

exports.parameterValidate = (rule) => {
    return (req, res, next) => {
        const validateErrors = parameter.validate(rule, Object.assign({}, req.body));
        console.log(validateErrors);
        if (validateErrors) {
            return res.status(422).json({
                error: 'Validation Failed',
                detail: validateErrors
            })
        }

        next()
    }
}

exports.check_api_token = (req, res, next) => {
    const token = req.get('x-access-token')
    if (!token) {
        return res.status(401).json({
            error: 'authentication failed：no X-Access-Token'
        })
    }

    // validate token
    try {
        const decodedToken = jwt.decode(token, 'ccontact')

        //if expired date < date.now(), token has already expired
        if (decodedToken.exp < moment().valueOf()) {
            return res.status(401).json({
                error: 'failed：token expired'
            })
        }

        req.body.userId = decodedToken.iss

        next()
    } catch (err) {
        res.status(401).json({
            error: 'failed：invalid token'
        })
    }
}
