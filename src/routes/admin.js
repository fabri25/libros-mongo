const express  = require('express');
const router = express.Router();
const Admin = require('../models/admin');
const passport = require('passport');
const { isAuthenticated} = require('../helpers/auth');
const admin = require('../models/admin');

router.get('/', (req, res) => {
    res.render('index');
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash: true
}));

router.get('/home', isAuthenticated, (req, res) => {
    res.render('home');
});

router.get('/logout',  (req, res) => {
    req.logout();
    res.render('/');
});


router.get('/admin', (req, res) => {
    res.render('admin');
});

router.post('/admin', async (req, res) =>{
    console.log(req.body);
    const { nombres, apellidos, calle, numero, colonia, ciudad, cp, user, email, password, confirm_password} = req.body;
    const errors= [];
    if(password != confirm_password){
        errors.push({Text: 'las constraseñas no coinciden'});
    }
    if(password.length < 4){
        errors.push({Text: 'la contraseña debe ser mayor a 4 caracteres'});
    }
    if(errors.length > 0){
        res.render('admin', {
            errors,
            nombres,
            apellidos,
            calle,
            numero,
            colonia,
            ciudad,
            cp,
            user,
            email,
            password,
            confirm_password
        });
    }else{
        
        const newAdmin=  new Admin({nombres, apellidos, calle, numero, colonia, ciudad, cp, user, email, password});
        newAdmin.password = await newAdmin.encryptPassword(password);
        await newAdmin.save();
        res.redirect('/');
    }
});

router.get('/listadmin',isAuthenticated, async (req, res) => {

    Admin.find({}).lean().then(admins => {
        res.render('listadmin',{admins});
    })
});

router.delete('/admin/delete/:id', async(req, res) =>{
    await Admin.findByIdAndDelete(req.params.id);
    res.redirect('/listadmin');
});

router.get('/edit-admin1/:id', async (req, res) =>{
    const admin1 = await Admin.findById(req.params.id).lean();
    res.render('edit-admin',{admin1});
});

router.put('/edit-admin/:id', async (req, res) =>{
    const {nombres, apellidos, calle, numero, colonia, ciudad, cp, user, email, password} = req.body;
    await Admin.findByIdAndUpdate(req.params.id, {nombres, apellidos, calle, numero, colonia, ciudad, cp, user, email, password});
    res.redirect('/listadmin');
});




module.exports = router;
