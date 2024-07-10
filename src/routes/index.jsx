const newsRouter = require('./routes');
const siteRouter = require('./site.jsx');

function route(app) {
    app.use('/news', newsRouter);
    app.use('/', siteRouter);
}

module.exports = route;
