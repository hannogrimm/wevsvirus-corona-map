const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  res.json('a user path');
});

module.exports = router;
