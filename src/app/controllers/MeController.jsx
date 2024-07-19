const Course = require('../models/Course.jsx');
const { mutipleMongooseToObject } = require('../../util/mongoose.jsx');

class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        Course.find({})
            .then(courses =>
                res.render('me/stored-courses', {
                    courses: mutipleMongooseToObject(courses),
                })
            )
            .catch(next);
    }

    // [GET] /me/trash/courses

    trashCourses(req, res, next) {
        Course.findWithDeleted({ deleted: true })
            .then(courses =>
                res.render('me/trash-courses', {
                    title: 'Khoa hoc da xoa',
                    courses: mutipleMongooseToObject(courses),
                })
            )
            .catch(next);
    }
}

module.exports = new MeController();
