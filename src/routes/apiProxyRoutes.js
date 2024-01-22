//Routes the frontend will call

import express from 'express';
const router = express.Router();
let fetch;

const apikey = process.env.MARKETPLACE_API_KEY;

(async () => {
    fetch = (await import('node-fetch')).default;
})();


router.get('/test', (req, res) => {
    res.send('API Proxy Test Route Working');
});


//Response: Marketplace API search results
router.post('/plans/search', async (req, res) => {
    const marketplaceApiUrl = `https://marketplace.api.healthcare.gov/api/v1/plans/search`;

    console.log('Searching plan data');

    // Prepare the request body
    const requestBody = {
        household: req.body.household,
        market: req.body.market,
        place: req.body.place,
        year: req.body.year
    };

    try {
        // Construct the request to the Marketplace API
        const response = await fetch('https://marketplace.api.healthcare.gov/api/v1/plans/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': apikey
            },
            body: JSON.stringify(req.body)
        });

        console.log(JSON.stringify(req.body));

        // Check if the request was successful
        if (!response.ok) {
            console.log('Request was unsuccessful');
            console.log(response.status);
            throw new Error(`Marketplace API responded with status: ${response.status}`);
        }

        // Parse the JSON response from the Marketplace API
        const data = await response.json();

        console.log('Returning data');
        console.log(data);
        // Send the data back to the frontend
        res.json(data);
    } catch (error) {
        // Handle any errors
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to fetch county FIPS code based on zip code
router.get('/countyfips/:zipCode', async (req, res) => {
    console.log('Fetching FIPS code');
    const zipCode = req.params.zipCode;
    const url = `https://marketplace.api.healthcare.gov/api/v1/counties/by/zip/${zipCode}`;

    try {
        const response = await fetch(url, {
            headers: {
                'apikey': apikey
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching county FIPS code:', error);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to fetch plan details
router.get('/plandetails/:planId/:year', async (req, res) => {

    console.log('Fetching plan details')
    const { planId, year } = req.params;
    const url = `https://marketplace.api.healthcare.gov/api/v1/plans/${planId}?year=${year}`;

    try {
        const response = await fetch(url, {
            headers: {
                'apikey': process.env.MARKETPLACE_API_KEY
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const planDetails = await response.json();
        res.json(planDetails);
    } catch (error) {
        console.error('Error fetching plan details:', error);
        res.status(500).json({ error: error.message });
    }
});

export default router;
