const express = require('express');
const router = express.Router();

const Article = require('./../controllers/articles');
const { verifyUserToken, IsModerator } = require("../middlewares/auth");

/** Passing midddlewares to verify token and authorize access to data*/

router.get('/', verifyUserToken, Article.getAll);

router.patch('/:id', verifyUserToken, IsModerator, Article.update);

module.exports = router;