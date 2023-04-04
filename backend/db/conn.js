const mongoose = require("mongoose")

async function main() {

    try {
        
        await mongoose.connect("mongodb+srv://viniciusmblimma:lakygDinI0vgtzLK@cluster0.qz4tsku.mongodb.net/?retryWrites=true&w=majority")

        console.log("Conectado ao banco de dados!")
    } catch (error) {
        console.log(`Erro: ${error}`)
    }

}

module.exports = main