const mongoose = require("mongoose");

const { Schema } = mongoose;

const usuarioSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    login:{
        type: String,
        required: true
    },
    senha:{
        type: String,
        required: true
    },
    pontuacao:{
        type: Number,
        required: true
    },
    
}, { timestamps: true}
);

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = {
    Usuario,
    usuarioSchema
}