const mongoose = require('mongoose');

const chambreSchema = new mongoose.Schema({
    id: Number,
    nom: String,
    description: String,
    capacite: Number,
    superficie: Number,
    prix: Number,
    disponibilite: Boolean,
    avis: [String], 
    equipements: [String], 
    mots_cles: [String],
    image1: String,
    image2: String,
    image3: String,
    image4: String
});

const Chambre = mongoose.model('chambres', chambreSchema);

module.exports = Chambre;
