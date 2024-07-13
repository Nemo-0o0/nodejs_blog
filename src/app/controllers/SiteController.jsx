const Course = require('../models/Course.jsx');

class SiteController {
    // [GET] /home
    async home(req, res) {
        try {
            const courses = await Course.find({});
            // res.render('home');
            res.json(courses);
        } catch (error) {
            res.status(400).json({ error: 'Message' });
        }
        // res.render('home');
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
