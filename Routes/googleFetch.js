const route = require("express").Router()
require("dotenv").config()
const { OAuth2Client } = require("google-auth-library")

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URL = process.env.REDIRECT_URL

const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)

route.get('/auth/fetch', (req,res) => {
    console.log("Server: Inside '/google/auth'")

    const authURL = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/drive'
        ],
    })

    res.redirect(authURL)
})

module.exports = route
