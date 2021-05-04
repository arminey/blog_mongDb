const conn = require('./../config/db');
const jwt = require('jsonwebtoken');
const HttpError = require('./../models/error');
require('./../models/user');

class User {
    constructor(model) {
      this.collection = model;
      this.create = this.create.bind(this);
      this.getAll = this.getAll.bind(this);
      this.signin = this.signin.bind(this);
      this.update = this.update.bind(this);  
    }

    async create(req, res, next) {
      const { firstname, lastname, username, password } = req.body;

      let existingUser;
      try {
        existingUser = await this.collection.findOne({username: username});
      } catch (err) {
        const error = new HttpError(
          'Signing up failed, please try again later.',
          500
        );
        return next(error);
      }
    
      if (existingUser) {
        const error = new HttpError(
          'User exists already, please login instead.',
          422
        );
        return next(error);
      } 

      const newMember = {
        firstname,
        lastname,
        username,
        password
      };

      let createdUser;
      try {
        createdUser = await this.collection.create(newMember);
        
      } catch (err) {
        const error = new HttpError(
          'Signing up failed, please try again later.',
          500
        );
        return next(error);
      }


      let token;
      try {
        token = jwt.sign(
          { userId: createdUser.id, username: createdUser.username },
          'supersecret_dont_share',
          { expiresIn: '1h' }
        );
      } catch (err) {
        const error = new HttpError(
          'Signing up failed, please try again later.',
          500
        );
        return next(error);
      }

      return res.status(201)
                .json({ 
                  userId: createdUser.id, 
                  username: createdUser.username, 
                  token: token, 
                  role: createdUser.role 
                });
    }
    
    async getAll(req, res, next) {
      let usres;
      try {
        usres = await this.collection.find({}).lean();
      } catch (err) {
        const error = new HttpError(
          'Something went wrong, could not get users list',
          500
        );
        return next(error);
      }
      
      return res.status(201).json(usres);
    }   

    async signin(req, res, next) {
      const { username, password } = req.body;
      
      let existingUser;
    
      try {
        existingUser = await this.collection.findOne({ username: username });
      } catch (err) {
        const error = new HttpError(
          'Logging in failed, please try again later.',
          500
        );
        return next(error);
      }
      
      if (!existingUser) {
        const error = new HttpError(
          'Invalid credentials, could not log you in.',
          403
        );
        return next(error);
      }
      
      let isValidPassword = false;
      try {
        isValidPassword = password === existingUser.password ;// await bcrypt.compare(password, existingUser.password);
      } catch (err) {
        const error = new HttpError(
          'Could not log you in, please check your credentials and try again.',
          500
        );
        return next(error);
      }
      
      if (!isValidPassword) {
        const error = new HttpError(
          'Invalid credentials, could not log you in.',
          403
        );
        return next(error);
      }
      
      let token;
      try {
        token = jwt.sign(
          { userId: existingUser.id, username: existingUser.username },
          'supersecret_dont_share',
          { expiresIn: '1h' }
        );
      } catch (err) {
        const error = new HttpError(
          'Logging in failed, please try again later.',
          500
        );
        return next(error);
      }


      try {
        existingUser.login = true;
        await this.collection.updateOne({_id: existingUser._id}, existingUser);
      } catch (err) {
        const error = new HttpError(
          'Logging in failed, please try again later.',
          500
        );
        return next(error);
      }
      
      res.json({
        userId: existingUser.id,
        username: existingUser.username,
        role: existingUser.role,
        token: token
      });
    };

    async update(req, res, next) {
      let user;
      try {
        user = await this.collection.findOne({ _id: req.params.id }).lean();
        
      } catch (err) {
          const error = new HttpError(
              `Something went wrong.`,
              500
          );
          return next(error);
      }

      try {
        await this.collection.updateOne({ _id: req.params.id }, {...user, login: false }).lean();
    
      } catch(err) {
          const error = new HttpError(
              "Something went wrong, please try again.",
              400
          );
          return next(error);
      }
    return res.json({ message: "User updated" });

    }

}


module.exports = new User(conn.model('users'));
