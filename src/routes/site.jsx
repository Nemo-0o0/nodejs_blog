const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController.jsx');

router.get('/search', siteController.search); // Ensure this is a GET route

router.get('/', siteController.home);

module.exports = router;
