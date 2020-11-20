const express = require('express');

const router = express.Router();

router.post('/addCustomer/', require('./addCustomer'));
router.post('/checkEmail/', require('./checkEmail'));
router.get('/getCustomer/:id', require('./getCustomer'));
router.put('/editCustomer/:id', require('./editCustomer'));
router.get('/getAllCustomers/', require('./getAllCustomers'));
router.post('/addCase/', require('./addCase'));
router.put('/updateCaseId/', require('./updateCaseId'));
router.get('/showCases/:id', require('./showCases'));
router.get('/showLeads/:id', require('./showLeads'));
router.get('/getCase/:id', require('./getCase'));
router.post('/getContact', require('./getContact'));
router.put('/updateCase/', require('./updateCase'));
router.put('/convertToCase/', require('./convertToCase'));

module.exports = router;
