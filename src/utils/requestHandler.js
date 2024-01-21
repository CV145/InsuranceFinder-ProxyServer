//logic for handling requests to external API

const fetch = require('node-fetch');

const getExternalApiData = async (req, res) => {
    try {
        const response = await fetch('https://externalapi.com/data');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data' });
    }
};

module.exports = {
    getExternalApiData,
};
