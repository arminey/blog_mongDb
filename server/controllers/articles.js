const connectDB = require('./../config/db');
require('./../models/article');

const HttpError = require('../models/error');

// const AppConstants  = require('./../settings/constants');
// const url = AppConstants.DB_URL;

class Article {
    constructor() {
        this.collection = connectDB.model('articles');
        this.create = this.create.bind(this);
        this.getAll = this.getAll.bind(this);
        this.update = this.update.bind(this);
    }

    async create(req, res, next) {
        const newArticle = {
            name: req.body.name,
            content: req.body.content,
            CategoryId: req.body.CategoryId,
            user_id: req.body.user_id
        }
        try {
            await this.collection.create(newArticle);
        } catch (err) {
            const error = new HttpError(
                'Could not create the article, please try again later.',
                500
            );
            return next(error)
        }
        res.json(newArticle);
    }
    
    async getAll(req, res, next) {
        let articles;
        try {
            articles = await this.collection.find().lean().populate('CategoryId user_id');
        } catch (err) {
            const error = new HttpError(
                'Something went wrong, could not get articles list.',
                500
            );
            return next(error) 
        }
        return res.json(articles);
    }

    async update(req, res, next) {
        let article;
        let canBePublished = false;
        try {
            article = await this.collection.findOne({ _id: req.params.id }).lean();
            canBePublished = article.content.text || article.content.image;

        } catch (err) {
            const error = new HttpError(
                `Something went wrong, could not get artcle with ${req.params.id} id`,
                500
            );
            return next(error);
        }

        if(!canBePublished) {
            const error = new HttpError(
                "Article content can't be empty.",
                400
            );
            return next(error);
        }

        if(article.isPublished === true) {
            const error = new HttpError(
                "Article already published.",
                400
            );
            return next(error);
        }

        try {
            await this.collection.updateOne({ _id: req.params.id }, {...article, isPublished: true }).lean();
        
        } catch(err) {
            const error = new HttpError(
                "Could't publish the article, please try again.",
                400
            );
            return next(error);
        }
        return res.json({ message: "Article is published" });
    }
}

module.exports = new Article();