var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config.js');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey,
        {expiresIn: 3600});
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

function verifyUserFun (jwt_payload, done) 
{
    console.log("JWT payload: ", jwt_payload);
    User.findOne({_id: jwt_payload._id}, (err, user) => {
        if (err) {
            return done(err, false);
        }
        else if (user) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    });
}

verfiyUserStratagy= new JwtStrategy(opts,verifyUserFun);
exports.jwtPassport = passport.use(verfiyUserStratagy);

function verifyAdminFun (jwt_payload, done) 
{
    console.log("JWT payload: ", jwt_payload);
    User.findOne({_id: jwt_payload._id}, (err, user) => {
        if (err) {
            return done(err, false);
        }
        else if (user) {
            if (user.admin){
                return done(null, user);
            }
                return done(null, false);
        }
        else {
            return done(null, false);
        }
    });
}
verfiyAdminUserStratagy= new JwtStrategy(opts,verifyAdminFun)
exports.jwtPassport = passport.use(verfiyAdminUserStratagy);

exports.verifyUser = passport.authenticate(verfiyUserStratagy, {session: false});
exports.verifyAdmin = passport.authenticate(verfiyAdminUserStratagy, {session: false});