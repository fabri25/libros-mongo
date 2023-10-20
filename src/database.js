const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/libros',{
    //useCreateIndex: true,
    useNewUrlParser: true,
    //useUnifiedTopology: true,
    //useFinAndModify: false
})

.then( ()=> console.log('Db is concected'))
.catch(err => console.error(err));