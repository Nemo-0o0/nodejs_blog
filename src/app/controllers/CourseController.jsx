const Course = require('../models/Course.jsx');
const { mongooseToObject } = require('../../util/mongoose.jsx');

class CourseController {
    // [GET] /courses/ :slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => res.render('courses/show', { course: course.toObject() }))
            .catch(next);
    }
}

module.exports = new CourseController();
