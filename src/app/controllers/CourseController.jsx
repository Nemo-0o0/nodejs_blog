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
    async store(req, res, next) {
        try {
            req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;

            const latestCourse = await Course.findOne({}) .sort({ _id: -1 })              
            // res.json(latestCourse)    
                req.body._id = latestCourse ? latestCourse._id + 1 : 1;      
                const course = new Course(req.body);
                await course.save();
                res.redirect('/me/stored/courses')
    
        } catch (error) {
            next(error);
        }
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
    async forceDestroy(req, res, next) {
        try {
            await Course.deleteOne({ _id: req.params.id });
            res.redirect('back');
        } catch (error) {
            next(error);
        }
    }

    // PATCH / courses/:id/restore
    async restore(req, res, next) {
        try {
            await Course.restore({ _id: req.params.id });
            res.redirect('back');
        } catch (error) {
            next(error);
        }
    }

    // POST / courses/handle-form-actions
    async handleFormActions(req, res, next) {
        try {
            switch (req.body.action) {
                case 'delete':
                    await Course.delete({ _id: { $in: req.body.courseIds } });
                    res.redirect('back');
                    break;
                default:
                    res.json({ message: 'Action invalid' });
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CourseController();
