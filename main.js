const express = require("express")

const app = express()

app.get('/', (req,res) => {
    res.send("Server: Inside '/'")
})

const googleFetch = require("./Routes/googleFetch")
const googleCallback = require("./Routes/googleCallback")
const googleDriveUpload = require("./Routes/googleDriveUpload")
const googleDriveDownload = require("./Routes/googleDriveDownload")
app.use('/google', googleFetch)
app.use('/google', googleCallback)
app.use('/google', googleDriveUpload)
app.use('/google', googleDriveDownload)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})
