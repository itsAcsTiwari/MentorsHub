import express from 'express';
import axios from 'axios';
import { google } from 'googleapis';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
const REFRESH_TOKEN = process.env.REFRESH_TOKEN; // Move this to .env file

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'http://localhost:5001'
);

router.post('/create-tokens', async (req, res) => {
    console.log('Received request body:', req.body);
    try {
        const { code } = req.body;  
        
        console.log('Attempting to exchange code for tokens');
        const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
            code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: 'http://localhost:5173', // Make sure this matches your Google Console setting
            grant_type: 'authorization_code',
        });

        console.log('Token exchange successful');
        res.json({
            success: true,
            accessToken: tokenResponse.data.access_token,
            refreshToken: tokenResponse.data.refresh_token,
        });
    } catch (error) {
        console.error('Error in /create-tokens:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to authenticate with Google', details: error.response?.data || error.message });
    }
});

router.post('/create-event', async (req, res) => {
    try {
        const eventData = req.body;
        console.log('Received event data:', eventData);

        // Ensure the timezone is valid
        const timezone = 'Asia/Kolkata'; // Or use a timezone from the request

        // Create a properly formatted event object
        const event = {
            summary: eventData.summary,
            description: eventData.description,
            start: {
                dateTime: eventData.start.dateTime,
                timeZone: timezone,
            },
            end: {
                dateTime: eventData.end.dateTime,
                timeZone: timezone,
            },
            location: eventData.location,
            attendees: eventData.attendees.map(attendee => ({
                email: attendee.email.includes('@') ? attendee.email : `${attendee.email}@example.com`
            })),
            reminders: eventData.reminders,
            colorId: '7'
        };

        console.log('Formatted event:', event);

        oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
        const calendar = google.calendar('v3');
        const response = await calendar.events.insert({
            auth: oauth2Client,
            calendarId: 'primary',
            requestBody: event
        });

        res.json(response.data);

    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ error: 'Failed to create event', details: error.message });
    }
});
export default router;