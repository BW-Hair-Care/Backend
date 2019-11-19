

function validatePost(req, res, next) {
    const {description} = req.body
     if (!description) {
    res.status(400).json({message: "missing required description field"})  
    } else {
     next()
     }
    };

    module.exports = validatePost;