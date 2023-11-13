const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    id: Number,
    nom: String,
    prenom: String,
    adresse: String,
    telephone: String,
    ville : String,
    codePostal: String,
    email: String,
    password: String,
});

const Client = mongoose.model('clients', clientSchema);

module.exports = Client;