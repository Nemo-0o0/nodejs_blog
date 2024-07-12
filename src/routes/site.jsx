const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController.jsx');

router.use('/search', siteController.search); // Ensure this is a GET route

router.use('/', siteController.home);

module.exports = router;
