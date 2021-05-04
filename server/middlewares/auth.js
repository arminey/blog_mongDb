// const config = require("../config/config");
const jwt = require('jsonwebtoken')
const connectDB = require('./../config/db');
const UserSchema = require('./../models/user');

const HttpError = require('./../models/error');

const collection = connectDB.model('users')

const verifyToken = async (token) => {
    let data = {};
    try {
        if (!token) {
            throw new Error('Authentication failed!');
        }

        token = token.split(' ')[1] // Remove Bearer from string

        if (token === 'null' || !token) return {};

        let verifiedUser = jwt.verify(token, 'supersecret_dont_share');
        if (!verifiedUser) {
            data.error = 'Unauthorized request';
        };
        data.verifiedUser = verifiedUser;
    } catch (err) {
        const error = new HttpError(
            'Authentication failed!',
            500
          );


        data.error = error;
        return data;
    }
    return data;
}

exports.verifyUserToken = async (req, res, next) => {

    let token = req.headers.authorization;
    try {
        let data = await verifyToken(token);
        if(data.error) return res.status(401).send(data.error);
        req.userData = { userId: data.verifiedUser.userId };
        return next();
    } catch (err) {
        const error = new HttpError('Invalid Token!', 400);
        return next(error);
    }
    return next();
}

exports.IsMember = async (req, res, next) => {

    let token = req.headers.authorization;
    let user;
    try {
        let data = await verifyToken(token);
        if(data.error) return res.status(401).send(data.error);
    
        user = await collection.findById(data.verifiedUser.userId)
        if(user.role === 'member') return next();
    } catch (err) {
        const error = new HttpError('Invalid Token / Access Denied!',400);
        return next(error);

        // return res.status(400).send("Invalid Token / Access Denied!");
    }
    return res.status(401).send({ message: "Unauthorized!" });
}

exports.IsAdmin =  async (req, res, next) => {

    let token = req.headers.authorization;
    let user;
    try {
        let data = await verifyToken(token);
        if(data.error) return res.status(401).send(data.error);

        user = await collection.findById(data.verifiedUser.userId)
    } catch (err) {
        const error = new HttpError(
            'Invalid Token / Access Denied!',
            400
        );
        return next(error);

        // return res.status(400).send("Invalid Token / Access Denied!");
    }

    if(user.role !== "admin") return res.status(401).send({ message: "Unauthorized!" });
    return next();
    
}

exports.IsAuth = async (req, res, next) => {
    let token = req.headers.authorization;
    let user;
    try {
        let data = await verifyToken(token);
        if(data.error) return res.status(401).send(data.error);
    
        user = await collection.findById(data.verifiedUser.userId)
        if(user.role === 'moderator' || user.role === 'admin') return next();
        
    } catch (err) {
        const error = new HttpError(
            'Invalid Token / Access Denied!',
            400
        );
        return next(error);

        // return res.status(400).send("Invalid Token / Access Denied!");
    }
    
    return res.status(401).send({message: "Unauthorized!", role: user.role});

}

exports.IsModerator = async (req, res, next) => {


    let token = req.headers.authorization;
    let user;
    try {
        let data = await verifyToken(token);
        if(data.error) return res.status(401).send(data.error);

        user = await collection.findById(data.verifiedUser.userId)
        if(user.role === 'moderator') return next();
        
    } catch (err) {

        const error = new HttpError(
            'Invalid Token / Access Denied!',
            400
        );
        return next(error);


        // return res.status(400).send("Invalid Token / Access Denied!");
    }
    
    return res.status(401).send({ message: "Unauthorized!" });

}