const express = require('express');
const router = express.Router();
const HttpError = require('./../models/error');
const Category = require('./../controllers/categories');

const { verifyUserToken, IsAdmin, IsMember, IsAuth } = require("../middlewares/auth");


/** Passing midddlewares to verify token and authorize access to data*/
router.get('/', verifyUserToken, Category.getAll);

router.post('/createcategory', verifyUserToken, IsAuth, Category.create);

router.delete('/:id', verifyUserToken, IsAdmin, Category.delete)

module.exports = router;