// Function constructor
function NewsController() {
    // [GET] /news
    this.index = function (req, res) {
        res.render('news');
    };

    /// [GET]  /news/:slug
    this.show = function (req, res) {
        res.send('NEW DETAILS');
    };
}

module.exports = new NewsController();
