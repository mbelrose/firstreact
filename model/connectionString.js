require('dotenv').config();
const username = process.env.DATABASE_USERNAME || 'firstreact';
const password = process.env.DATABASE_PASSWORD;
const host = process.env.DATABASE_HOST || 'localhost';
const port = process.env.DATABASE_PORT || '27017';

const connectionString = 
    `mongodb://${username}:${password}@${host}:${port}/firstreact?authSource=admin`
;

module.exports = connectionString;
