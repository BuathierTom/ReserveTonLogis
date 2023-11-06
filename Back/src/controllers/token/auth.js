const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { addLog } = require("../../services/logs/logs");


dotenv.config();

let cachedToken = null;

const generateAccessToken = (id) => {
    if (cachedToken) {
        return cachedToken; // Retournez le token en cache si déjà généré
    }

    const token = jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: '30d' });
    if (!token) {
        addLog("error", `Erreur, le token n'a pas pu être généré`, "client.controller.js");
        return res.status(404).send({ Error: `Erreur, le token n'a pas pu être généré` });
    }
    cachedToken = token; // Stockez le token en cache

    return token;
};

module.exports = {
    generateAccessToken
};
