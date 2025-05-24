CONFIG = {};

CONFIG.api_key = process.env.api_key;
CONFIG.client_url = process.env.CLIENT_URL || "http://localhost:4200";

module.exports = CONFIG;
