const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const generateAccessToken = (id) => {
    const token = jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: '30d' });
    return token;
};

module.exports = {
    generateAccessToken,
};
