const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');


const AdminSchema = new Schema({
    
    nombres:{ type: String, required: true},
    apellidos:{ type: String, required: true},
    calle:{ type: String, required: true},
    numero:{ type: String, required: false},
    colonia:{ type: String, required: true},
    ciudad:{ type: String, required: true},
    cp:{ type: Number, required: true},
    user:{ type: String, required: true},
    email:{ type: String, required: true},
    password:{ type: String, required: true},
    date: { type: Date, default: Date.now }
});

AdminSchema.methods.encryptPassword = async (password) =>{
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
};

AdminSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Admin',AdminSchema)