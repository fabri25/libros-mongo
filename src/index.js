const express = require('express');
const path = require('path');
const  methodOverride= require('method-override');
const session = require('express-session');
let exphbs = require('express-handlebars');
const exp = require('constants');
const Handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const flash = require('connect-flash');
const passport = require('passport');
//initializations
const app = express();
const multer = require('multer');
require('./database');
require('./config/passport');
const upload = require('./configMulter');




//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));

app.set('view engine', '.hbs');



// middlewars
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'biblioteca',
    resave:true,
    saveUninitialized: true
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// 


//variables globales 
app.use((req, res, next) =>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
})




//routes   *****HAY QUE AGREGAR LAS RUTAS DE LAS PAGINAS QUE VAMOS A UTILIZAR*****
//app.use(require('./routes/index'));
//app.use(require('./routes/home')); no era necesario
app.use(require('./routes/admin'));
app.use(require('./routes/book'));
//app.use(require('./routes/catalog')); no era necesario
//app.use(require('./routes/listadmin'));

//archivos estaticos
app.use(express.static(path.join(__dirname,'public')));

//server init
app.listen(app.get('port'), ()=>{
    console.log('Server on port', app.get('port'));
});


