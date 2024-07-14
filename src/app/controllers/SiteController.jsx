const Course = require('../models/Course.jsx');
const { mutipleMongooseToObject } = require('../../util/mongoose.jsx');

class SiteController {
    // [GET] /home
    home(req, res, next) {
        Course.find({})
            .then((courses) => {
                res.render('home', {
                    courses: mutipleMongooseToObject(courses),
                });
            })
            .catch((error) => next(error));
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
