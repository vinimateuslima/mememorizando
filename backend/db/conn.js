const mongoose = require("mongoose")

const uri = "mongodb+srv://viniciusmblimma:Mj4EDolaelMOGHZo@cluster0.qz4tsku.mongodb.net/?retryWrites=true&w=majority";

async function main() {

    try {
        
        await mongoose.connect(uri)

        console.log("Conectado ao banco de dados!")
    } catch (error) {
        console.log(`Erro: ${error}`)
    }

}

module.exports = main