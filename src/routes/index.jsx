const newsRouter = require('./routes');
const coursesRouter = require('./khoahocs.jsx');
const siteRouter = require('./site.jsx');

function route(app) {
    app.use('/news', newsRouter);
    app.use('/courses', coursesRouter);
    app.use('/', siteRouter);
}

module.exports = route;
