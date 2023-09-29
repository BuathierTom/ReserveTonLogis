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
    image3: String
});

const chambres = mongoose.model('chambres', chambreSchema);

module.exports = chambres;
