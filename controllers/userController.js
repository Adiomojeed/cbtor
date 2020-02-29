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

exports.updateUser = (req, res, next) => {
    if (!(req.body.password === req.body.confirm_password)) {
        req.flash('error','Password confirmation does not match')
        return res.redirect('/password');
    }

    User.findById(req.user._id, (err, user) => {
        if (err) {
            req.flash('error','Old Password does not match')
            return res.redirect('/password');
        }

        user.changePassword(req.body.old_password, req.body.password, (err) => {
            if (err) {
                req.flash('error','Old Password does not match')
                res.redirect('/password');
            }

            req.flash('success','Password changes successfully')
            return res.redirect('/password');
        })
    })
}