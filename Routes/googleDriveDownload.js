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

route.get('/drive/download/:fileId', async(req,res) => {
    try {
        const fileId = req.params.fileId;
        const response = await drive.files.get({
            fileId: fileId,
            alt: 'media',
        }, { responseType: 'stream' });

        response.data
            .on('end', () => console.log('File downloaded'))
            .on('error', (err) => {
                console.error("Error downloading file:", err);
                res.status(500).send("Error downloading file");
            })
            .pipe(res);
    } catch (error) {
        console.error("Error downloading file:", error);
        res.status(500).send("Error downloading file");
    }
})

module.exports = route
