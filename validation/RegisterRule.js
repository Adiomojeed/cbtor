const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');

const User = mongoose.model('User');
const Coupon =  mongoose.model('Coupon');

/*
* Validation rules that applies to users signing
* up, layered on top each other.
* */
const rules = [
    // Ensure email field is not empty.
    check('firstName').not().isEmpty().withMessage('Email cannot be empty.'),
    // Check if email already exists.
    check('email')
        .custom(email =>
            User.findOne({ email })
                .then(user => user
                    ? Promise.reject('Email already exists')
                    : true)
    ),
    // Ensure first name isn't empty
    check('firstName').not().isEmpty().withMessage('First name cannot be empty.'),
    // Ensure last name is not empty
    check('lastName').not().isEmpty().withMessage('Last name cannot be empty.'),
    // Make sure phone number is not blank.
    check('phone').not().isEmpty().withMessage('Please provide your phone number.'),
    // Restrict user from registering with a registered number.
    check('phone').custom(phone =>
        User.findOne({ phone })
            .then(user => user
                ? Promise.reject('Phone number used.')
                : true)
    ),
    // Make sure password length is longer or is 5 chars.
    check('password').isLength({ min: 5})
        .withMessage('Password must be 5 characters or more'),

    // Validate and check if user entered coupon is valid.
    check('coupon').not().isEmpty().withMessage('Enter your coupon code.'),
    check('coupon').custom((coupon, { req }) => {
        return Coupon.findOne({ pin: coupon })
            .then(coupon => {
                if (coupon.is_used) return Promise.reject('Coupon has been used.');
            })
            .catch(() => Promise.reject('Invalid coupon code'))
    })
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('error', errors.array());
        res.redirect('/register');
    }

    return next();
};

module.exports = Array.prototype.concat.call(rules, validate);