const route = require("express").Router()
require("dotenv").config()
const { OAuth2Client } = require("google-auth-library")

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URL = process.env.REDIRECT_URL

const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)

route.get('/auth/callback', async(req,res) => {
    try {
        console.log("Server: Inside '/google/callback'");

        const { code } = req.query;
        if (!code) {
            return res.status(400).send("Authorization code is missing");
        }

        const { tokens } = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(tokens);

        // Verify the ID token (optional)
        const ticket = await oAuth2Client.verifyIdToken({
            idToken: tokens.id_token,
            audience: CLIENT_ID,
        });

        const payload = ticket.getPayload();
        console.log("Tokens received:", tokens);

        res.json({
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            id_token: tokens.id_token,
            user_info: payload,
        });
    } catch (error) {
        console.error("Error in callback:", error);
        res.status(500).send("Error during authentication");
    }
})

module.exports = route
