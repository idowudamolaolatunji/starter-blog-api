const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

exports.protectedRoute = async function(req, res, next){
    try{
        const token = (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) ? req.headers.authorization.split(' ')[1] : req.cookies.jwt;

        if (!token){
            return res.status(401).json({
                message:'You have not signed in!'
            })
        }

        //verify token
        const decoded = jwt.verify( token,'my_secret_long_string');
        req.user = {
            _id: decoded.id
        }

        //set the user
        const currUser = await User.findById(decoded.id);
        if(!currUser){
            return res.status(401).json({
                message:'User delete!'
            })
        }

        req.user = currUser;
        next();   

    } catch(err){
        res.status(401).json({
            status:'fail',
            message:err.message
        });
    }
}



