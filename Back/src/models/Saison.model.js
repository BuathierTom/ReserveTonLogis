const mongoose = require('mongoose');

const saisonSchema = new mongoose.Schema({
    nom: String,
    date_res: String,
    temperature: Number, 
    conditions_meteorologiques: String, 
    promotion: String,
})

// Création du modèle Saisons basé sur le schéma
const Saisons = mongoose.model('saisons', saisonSchema);

module.exports = Saisons;