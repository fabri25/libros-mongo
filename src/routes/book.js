const express  = require('express');
const router = express.Router();
const book = require('../models/book');
const { isAuthenticated} = require('../helpers/auth');
//const { upload } = require('./index');
const path = require('path');
//const upload = require('./index');
const upload = require('../configMulter');
module.exports.upload = upload;

router.get('/book', isAuthenticated, (req, res) => {
    res.render('book');
});

router.post('/book', upload.single('pdfFile'), async  (req, res, next) =>{
    //console.log(req.body);
    const {titulo,autor,genero,Anno,Editorial,Edicion,ejemplares} = req.body;
    const errors= [];
    if(!titulo){
        errors.push({Text: 'Porfavor realice lo solicitado'});
    }
    if(!autor){
        errors.push({Text: 'Porfavor realice lo solicitado'});
    }
    if(!genero){
        errors.push({Text: 'Porfavor realice lo solicitado'});
    }
    if(!Anno){
        errors.push({Text: 'Porfavor realice lo solicitado'});
    }
    if(!Editorial){
        errors.push({Text: 'Porfavor realice lo solicitado'});
    }
    if(!Edicion){
        errors.push({Text: 'Porfavor realice lo solicitado'});
    }
    if(!ejemplares){
        errors.push({Text: 'Porfavor realice lo solicitado'});
    }
    if(!ejemplares){
        errors.push({Text: 'Porfavor realice lo solicitado'});
    }
    if(errors.length > 0){
        res.render('/book', {
            errors,
            titulo,
            autor,
            genero,
            Anno,
            Editorial,
            Edicion,
            ejemplares
        });
    }else{
        const newBook = new book({titulo,autor,genero,Anno,Editorial,Edicion,ejemplares,pdfUrl:req.file.path});
        await newBook.save();
        //req.flash('success_msg', 'Libro agregado correctamente!');
        res.redirect('/catalog');
    }
    
});

router.get('/download/:bookId', (req, res, next) => {
    Book.findById(req.params.bookId, (err, book) => {
        if (err) {
            console.log(err);
            res.redirect('/catalog');
        } else {
            const filePath = path.join(__dirname, '../', book.pdfUrl);
            res.download(filePath);
        }
    });
});

router.get('/catalog',isAuthenticated, async (req, res) => {

    book.find({}).lean().sort({date :'desc'}).then(books =>{
        res.render('catalog', { books });
    })
});

/*router.get('/catalog/edit/:id', async (req, res) =>{
    book.findById({}).lean().then(books1 =>{
        res.render('edit', { books1 });
    })
});*/

router.get('/catalog/edit/:id', async (req, res) =>{
    const book1 = await book.findById(req.params.id).lean();
    res.render('edit',{book1});
});

router.put('/book/edit/:id', async (req, res) =>{
    const {titulo,autor,genero,Anno,Editorial,Edicion,ejemplares} = req.body;
    await book.findByIdAndUpdate(req.params.id, {titulo,autor,genero,Anno,Editorial,Edicion,ejemplares});
    res.redirect('/catalog');
});

router.delete('/book/delete/:id', async(req, res) =>{
    await book.findByIdAndDelete(req.params.id);
    res.redirect('/catalog');
});

router.get('/educativos',isAuthenticated, async (req, res) => {

    book.find({genero: 'Educativos'}).lean().sort({date :'desc'}).then(books =>{
        res.render('catalog', { books });
    })
});

router.get('/terror',isAuthenticated, async (req, res) => {

    book.find({genero: 'Terror'}).lean().sort({date :'desc'}).then(books =>{
        res.render('catalog', { books });
    })
});

router.get('/ficcion',isAuthenticated, async (req, res) => {

    book.find({genero: 'Ficcion'}).lean().sort({date :'desc'}).then(books =>{
        res.render('catalog', { books });
    })
});

router.get('/novelas',isAuthenticated, async (req, res) => {

    book.find({genero: 'Novelas'}).lean().sort({date :'desc'}).then(books =>{
        res.render('catalog', { books });
    })
});

router.get('/poesia',isAuthenticated, async (req, res) => {

    book.find({genero: 'Poesia'}).lean().sort({date :'desc'}).then(books =>{
        res.render('catalog', { books });
    })
});

router.get('/crimen',isAuthenticated, async (req, res) => {

    book.find({genero: 'Crimen'}).lean().sort({date :'desc'}).then(books =>{
        res.render('catalog', { books });
    })
});

router.get('/religion',isAuthenticated, async (req, res) => {

    book.find({genero: 'Religion'}).lean().sort({date :'desc'}).then(books =>{
        res.render('catalog', { books });
    })
});

router.post('/libro', async (req, res) =>{
    console.log(req.body);
    const {nombre_libro} = req.body;
    book.find({titulo: nombre_libro}).lean().sort({date :'desc'}).then(books =>{
        res.render('catalog', { books });
    })
});


module.exports = router;
