const express = require('express');
var router = express.Router();
// const bodyParser = require('body-parser');
// const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const cors = require('cors')
const creds = require('./config')
// const path = require('path')
const app = express();

const PORT = process.env.PORT
console.log(PORT)
// app.engine('handlebars', exphbs());
// app.set('view engine', 'handlebars');

// app.use('/public', express.static(path.join(__dirname, 'public')));

// app.use(bodyParser.urlencoded({extended: false }));
// app.use(bodyParser.json());

var transport = {
    host: 'smtp.ethereal.email', // Don’t forget to replace with the SMTP host of your provider
    port: 587,
    auth: {
    user: creds.USER,
    pass: creds.PASSWORD
  }
}
var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

router.post('/send', (req, res, next) => {
    var name = req.body.name
    var email = req.body.email
    var message = req.body.message
    var content = `name: ${name} \n email: ${email} \n message: ${message} `
  
    var mail = {
      from: name,
      to: 'karunakumari000532@gmail.com',  // Change to email address that you want to receive messages on
      subject: 'New Message from Contact Form',
      text: content
    }
  
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          status: 'fail'
        })
      } else {
        res.json({
         status: 'success'
        })
      }
    })
  })



app.use(cors())
app.use(express.json())
app.use('/', router)
app.get('/hii',(req,res)=>{
  res.send("hii")
})
// app.listen(3002)
// app.get('/', (req, res) => {
//     res.render('contact');
// });

app.listen(PORT, () => console.log('server is running....'))