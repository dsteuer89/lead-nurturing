// Vercel Serverless Function - CORS Proxy for Chat API

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle OPTIONS request (preflight)
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST
    if (req.method !== 'POST') {
        console.log('Invalid method:', req.method);
        return res.status(405).json({ error: 'Method not allowed', method: req.method });
    }

    const API_URL = "https://lead-nurturing-na.svc.ue1.site-dev.c-gurus.com/api/lead-nurturing/v1/internal/chat";

    console.log('Proxy request received');
    console.log('Body:', req.body);

    try {
        // Forward the request to the actual API
        console.log('Forwarding to:', API_URL);
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body)
        });

        console.log('API response status:', response.status);

        // Get response text first
        const responseText = await response.text();
        console.log('API response:', responseText);

        // Try to parse as JSON
        let data;
        try {
            data = JSON.parse(responseText);
        } catch (e) {
            console.error('Failed to parse response as JSON:', e);
            return res.status(500).json({
                error: 'Invalid JSON response from API',
                responseText: responseText.substring(0, 200)
            });
        }

        // Forward the response back
        return res.status(response.status).json(data);

    } catch (error) {
        console.error('Proxy error:', error);
        console.error('Error stack:', error.stack);
        return res.status(500).json({
            error: 'Proxy error',
            message: error.message,
            type: error.name
        });
    }
}
