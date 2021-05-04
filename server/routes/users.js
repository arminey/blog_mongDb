const express = require('express');
const router = express.Router();

const User = require('./../controllers/users');

const { verifyUserToken, IsAdmin, IsUser } = require("../middlewares/auth");

/** Passing midddlewares to verify token and authorize access to data*/

router.get('/', verifyUserToken, User.getAll);

router.post('/login', User.signin);

router.post('/signup', User.create);

router.patch('/logout/:id', verifyUserToken, User.update);

module.exports = router;