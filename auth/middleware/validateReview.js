
function validateReview(req, res, next) {
const {customerReview, CustomerId, StylistsId} = req.body

if(!customerReview && !CustomerId && !StylistsId) {
 res.status(400).json({message: "missing required fields"}) 

} else {
next()
 }
};

module.exports = validateReview;