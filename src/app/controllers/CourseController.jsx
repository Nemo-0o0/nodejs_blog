const Course = require('../models/Course.jsx');
const { mongooseToObject } = require('../../util/mongoose.jsx');

class CourseController {
    // [GET] /courses/ :slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then(course => res.render('courses/show', { course: course.toObject() }))
            .catch(next);
    }

    //GET / COURSES/ create
    create(req, res, next) {
        res.render('courses/create');
    }
    //POST / COURSES/ store
    store(req, res, next) {
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const course = new Course(req.body);
        course
            .save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(error => next(error));
    }

    // GET courses/ :id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course =>
                res.render('courses/edit', {
                    course: course.toObject(),
                })
            )
            .catch(next);
    }

    //PUT /courses/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    // DELETE /courses/:id
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    // DELETE /courses/:id/force
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // PATCH / courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new CourseController();
