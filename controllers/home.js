'use strict';

const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.render('pages/index',{});
});

router.get('/fullscreen', function(req, res) {
    res.render('pages/fullscreen',{});
});

module.exports = router;