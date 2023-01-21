import { Router } from 'express';

const router = Router();
const pool =  require("../database/database");
const { validationResult } = require('express-validator');
const passport = require('passport');
const bcrypt = require('bcryptjs');


router.get('/', (req, res) => {
    return res.send('hello world');
});

module.exports = router;