const route = require("express").Router()
require("dotenv").config()
const { google } = require('googleapis');
const { OAuth2Client } = require("google-auth-library")

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URL = process.env.REDIRECT_URL

const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)

oAuth2Client.setCredentials({
    access_token: process.env.ACCESS_TOKEN,
    refresh_token: process.env.REFRESH_TOKEN,
});

const drive = google.drive({ version: 'v3', auth: oAuth2Client });

route.get('/drive/upload', async (req, res) => {
    try {
        console.log("Server: Inside '/drive/upload'");

        const fileMetadata = {
            name: 'example.txt',
        };
        const media = {
            mimeType: 'text/plain',
            body: 'Hello, Google Drive!',
        };

        const response = await drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id',
        });

        res.json({ fileId: response.data.id });
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).send("Error uploading file");
    }
})

module.exports = route
