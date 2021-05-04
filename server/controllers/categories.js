const connectDB = require('./../config/db');
require('./../models/category');

const HttpError = require('../models/error');

// const AppConstants  = require('./../settings/constants');
// const url = AppConstants.DB_URL;

class Category {
    constructor() {
        this.collection = connectDB.model('categories');
        this.delete = this.delete.bind(this);
        this.getAll = this.getAll.bind(this);
        this.create = this.create.bind(this);
        
    }

    async create(req, res, next) {
        const newArticle = {
            name: req.body.name,
            description: req.body.description
        }
        try {
            await this.collection.create(newArticle);
        } catch (err) {
            const error = new HttpError(
                "Something went wrong, could not create the category.",
                400
            );
            return next(error);
        }
        res.json(newArticle);
    }
    
    async getAll(req, res, next) {
        let categories;
        try {
            categories = await this.collection.find({}).lean();
        } catch(err) {
            const error = new HttpError(
                "Something went wrong, could not get categories list",
                500
            );
            return next(error);
        }
        return res.status(201).json(categories);
    }

    async delete(req, res, next) {
        let categoryId = req.params.id;

        if(!categoryId) {
            const error = new HttpError(
                "Category id can't be empty.",
                400
            );
            return next(error);
        }

        let category;
        try {
            category = await this.collection.findByIdAndRemove(categoryId);
            if(!category) {
                throw new Error("There is no category");
            }
        } catch (err) {
            const error = new HttpError(
                'Something went wrong, could not delete category.',
                500
            );
            return next(error);
        }

        return res.status(201).json(category);


    }
}


module.exports = new Category();