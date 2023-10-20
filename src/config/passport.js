const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Admin = require('../models/admin');

passport.use(new LocalStrategy({
    usernameField: 'user'

}, async (user, password, done) => {
    const admin1 = await Admin.findOne({user: user});
    if(!admin1){
        return done(null, false, {message: 'usuario no encontrado'});
    }else{
        const match = await admin1.matchPassword(password);
        if(match){
            return done(null, admin1);
        }else{
            return done(null, false, { message: 'contraseña incorrecta'});
        }
    }
}));

passport.serializeUser((admin, done) => {
    done(null, admin.id);
});

passport.deserializeUser(function (id, done) {
    Admin.findById(id).lean().exec(function (err, admin) {
        done(err, admin);
    });
});