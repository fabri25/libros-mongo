const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookSchema = new Schema({
    titulo: { type: String, required: true},
    autor: { type: String, required: true},
    genero: { type: String, required: true},
    Anno: { type: Number, required: true},
    Editorial: { type: String, required: true},
    Edicion: { type: String, required: true},
    ejemplares: { type: Number, required: true},
    date: { type: Date, default: Date.now },
    pdfUrl: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('book',BookSchema)