const express = require('express');
const router = express.Router();
const path = require('path');

const siteController = require(path.join(__dirname, '../controllers/siteController'));

router.get('/', siteController.getHomePage);
router.get('/privacy-policies', siteController.getPrivacyPoliciesPage);

module.exports = router;
