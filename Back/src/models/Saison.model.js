const mongoose = require('mongoose');

const saisonSchema = new mongoose.Schema({
    nom: String,
    promotion: String,
})

// Création du modèle Saisons basé sur le schéma
const Saisons = mongoose.model('saisons', saisonSchema);

module.exports = Saisons;