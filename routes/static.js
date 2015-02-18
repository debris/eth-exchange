var express = require('express');
var router = express.Router();

/* GET fakes static listing. */
router.get('*', function(req, res, next) {
    var url = req.originalUrl.replace(/^\/static\//, "").replace(/\.html$/, "");
    res.render(url);
});

module.exports = router;
