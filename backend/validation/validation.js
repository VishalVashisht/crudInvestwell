const Joi = require("joi");

const signUpSchema = Joi.object({
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    phone: Joi.string().length(10).pattern(/^\d+$/).required(),
    gender: Joi.string().min(1).max(1).required(),
    // email: Joi.string().email({ minDomainSegments: 3, tlds: { allow: ['com', 'net', 'edu'] } }),
    email : Joi.string().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    cpassword: Joi.ref("password")
})

const loginSchema = Joi.object({
    // username: Joi.string().email({ minDomainSegments: 3, tlds: { allow: ['com', 'net', 'edu'] } }),
    username: Joi.string().required(),
    password: Joi.string().required()
})

const updateSchema = Joi.object({
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    phone: Joi.string().length(10).pattern(/^\d+$/).required(),
    gender: Joi.string().min(1).max(1).required(),
    email: Joi.string().email({ minDomainSegments: 3, tlds: { allow: ['com', 'net', 'edu'] } }),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
})

const signUpValidate = (req, res, next)=>{
    const {error} = signUpSchema.validate(req.body);
    if(error){
        const {details}  = error;
        const message = details.map(i=> i.message).join(',');
        console.log(message);
        return res.send(message);
    }
    else{
        next();
    }
}

const loginValidate = (req, res, next)=>{
    const {error} = loginSchema.validate(req.body);
    if(error){
        const {details}  = error;
        const message = details.map(i=> i.message).join(',');
        console.log(message);
        return res.send(message);
    }
    else{
        next();
    }
}

const updateValidate = (req, res, next)=>{
    const {error} = updateSchema.validate(req.body);
    if(error){
        const {details}  = error;
        const message = details.map(i=> i.message).join(',');
        console.log(message);
        return res.send(message);
    }
    else{
        next();
    }
}


module.exports = {
    signUpValidate,
    loginValidate,
    updateValidate
}