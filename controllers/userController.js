const mongoose = require('mongoose');
const User = mongoose.model('User');
const Score = mongoose.model('Score')

/*
* Get user details and send as JSON.
* */
exports.userInfo = (req, res, next) => {
    User.findById(req.user._id)
        .lean()
        .exec((err, user) => {
            if (err) return next(err);
            Score.find({ user: user._id})
                .count()
                .exec((err, score) => {
                    user.examTaken = score
                    res.json(user)
                })
        })
};