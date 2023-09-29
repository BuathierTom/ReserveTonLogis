const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    nom: String,
    prenom: String,
    adresse: String,
    telephone: String,
    email: String,
    password: String,
});

const Client = mongoose.model('clients', clientSchema);

module.exports = Client;