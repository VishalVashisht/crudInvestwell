const Joi = require('joi');

const register= Joi.object({
    fname: Joi.string().min(3).max(30).required(),
   
    lname: Joi.string().min(3).max(30).required(),

    phone: Joi.number().required(),

    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

    pass: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    cpass: Joi.ref('pass')

});
const middleware = () => { 
    return (req, res, next) => { 
    const { error } = Joi.validate(req.body, register); 
    const valid = error == null; 
    
    if (valid) { 
      next(); 
    } else { 
      const { details } = error; 
      const message = details.map(i => i.message).join(',');
   
      console.log("error", message); 
     res.status(422).json({ error: message }) } 
    } 
  } 

module.exports=middleware; 