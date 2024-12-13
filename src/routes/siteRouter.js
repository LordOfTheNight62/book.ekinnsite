const express = require('express');
const router = express.Router();

const siteController = require('../controllers/siteController');

router.get('/', siteController.getHomePage);
router.get('/privacy-policies', siteController.getPrivacyPoliciesPage);

module.exports = router;
