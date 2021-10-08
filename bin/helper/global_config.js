require('dotenv').config();
const confidence = require('confidence');

const config = {
    port: process.env.PORT || 3001,
    apiKey: process.env.API_KEY,
    omdbUrl: process.env.OMDB_API_URL,
}

const store = new confidence.Store(config);
exports.get = key => store.get(key);