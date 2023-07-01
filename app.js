// deployed at https://sea-angling-wick.herokuapp.com/


const express = require('express')
const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const myOAuth2Client = new OAuth2(
    "",
    "",
    "https://developers.google.com/oauthplayground"
)

myOAuth2Client.setCredentials({
    refresh_token: ""
})

const myAccessToken = myOAuth2Client.getAccessToken()

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.post('/', (req, res) => {
    console.log('req.body:', req.body)

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'email@address',
            clientId: '',
            clientSecret: '',
            refreshToken: '',
            accessToken: ''
        }
    })

    const mailOptions = {
        from: req.body.email,
        to: 'email@address',
        subject: 'Enquiry from the website!',
        text: `Message from ${req.body.name}
    Return email address: ${req.body.email}

                ***************
            ${req.body.message}`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
            res.send('error')
        } else {
            console.log('email sent', info.response)
        }

    })

})

app.listen(PORT, (req, res) => {  // are req, res normal args here?
    console.log('ßsever running on ', PORT)
})

