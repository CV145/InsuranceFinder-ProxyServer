//logic for handling requests to external API

import fetch from 'node-fetch';

const getExternalApiData = async (req, res) => {
    try {
        const response = await fetch('https://externalapi.com/data');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data' });
    }
};

export default getExternalApiData;
