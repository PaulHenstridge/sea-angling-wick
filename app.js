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
    "628785676412-mm0fshqctqipojjr8laq423246efeubb.apps.googleusercontent.com",
    "V2oWaDkVGCEAw1C_3Y50Yf-5",
    "https://developers.google.com/oauthplayground"
    )

myOAuth2Client.setCredentials({
    refresh_token:"1//04k8PT_KVSsjYCgYIARAAGAQSNwF-L9IrqlMq8t-lF9I4Jx41QUPn75n5a6yTTksPeCD2u3dWGpvAwkOTzlysWXCkr3dZ3EIpxYg"
    })

const myAccessToken = myOAuth2Client.getAccessToken()

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.post('/', (req, res) => {
    console.log('req.body:', req.body)

    const transporter = nodemailer.createTransport({  // details to be added
        service: 'gmail',  
        auth: {
            type: 'OAuth2',
            user:'sea.angling.wick@gmail.com',
            clientId: '628785676412-mm0fshqctqipojjr8laq423246efeubb.apps.googleusercontent.com',
            clientSecret:'V2oWaDkVGCEAw1C_3Y50Yf-5',
            refreshToken:'1//04k8PT_KVSsjYCgYIARAAGAQSNwF-L9IrqlMq8t-lF9I4Jx41QUPn75n5a6yTTksPeCD2u3dWGpvAwkOTzlysWXCkr3dZ3EIpxYg',
            accessToken:'ya29.a0AfH6SMDtsWlFl9Pqomgdp7b4-u91KAcfZGlngrmXV6U82ymUzhRz5H6PHHc5d_IqhyArMzLr8A9ElfUXbPjt7_eBv5BvYIDDHh6LDyjsmdQNYubl8bzoxlDIhcJDk6sQJUN_tLKi-KUl9Cex2gp9GiPFDKxt'
        }     
    })

    const mailOptions = {
        from : req.body.email,
        to: 'sea.angling.wick@gmail.com', // add email here
        subject: 'Enquiry from the website!',
        text: `Message from ${req.body.name}
    Return email address: ${req.body.email}

                ***************
            ${req.body.message}`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log(error)
            res.send('error')
        } else {
            console.log('email sent', info.response)
        }
        
    })

})  

app.listen( PORT, (req, res) => {  // are req, res normal args here?
    console.log('ßsever running on ', PORT)
})

