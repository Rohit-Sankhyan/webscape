require('dotenv').config()
const express = require("express")
const path = require("path")
const app = express()
const nodemailer = require("nodemailer")
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser")
const port = process.env.PORT || 8000
// const hbs = require("hbs")
require("./database/db")
const user = require("./models/users")
const contactData = require("./models/contact")
const hireData = require("./models/hire")
const userRoutes = require("./routes/userroutes")
const auth = require('./middlewares/auth');


//built Midlleware
const static_Path = path.join(__dirname, "/public/")
const template_Path = path.join(__dirname, "/public/templates/views")
const partial_Path = path.join(__dirname, "/public/templates/partials")
//to set views engine
app.set("view engine", "ejs")
app.set("views", template_Path)
app.use(express.static(static_Path));

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use("/",userRoutes)
// app.use(bodyparser.urlencoded({ extended: true }))
app.get("/secret",auth,(req,res)=>{
    const token = res.cookies.jwt;
    console.log(`cokies ${token}`)
    res.render("secret")
})
app.post("/contact", async (req, res) => {
    try {
        const cmessage = req.body.message
        const cname = req.body.name
        const cnumber = req.body.number
        const cemail = req.body.email
        console.log(cname)
        console.log(cnumber)
        console.log(cmessage)

        const contactdb = new contactData({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.number,
            message: req.body.message
        });
        const contactpageData = await contactdb.save();
        console.log("data sent to database")
        res.render("submit")


        var email = req.body.email;
        console.log(email)
        var transporter = nodemailer.createTransport({
            //    host:'smtp.gmail.com',
            service: 'gmail',
            auth: {
                user: 'webscapepvt@gmail.com',
                pass: 'aznzklpzwqdllptw'
            }
        });

        var mailOptions = {
            from: 'webscapepvt@gmail.com',
            to: `${req.body.email}`,
            subject: 'Thanks For Feedback',
            text: `Hello, ${req.body.name}`,
            html: '<h1 style="color:green">Thanks For submiting</h1>'
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log(`email send to ${req.body.email}`)
                console.log('Email sent: ' + info.response);
            }
        })
    } catch (error) {
        res.status(400).send(error)
    }


});
app.post("/hire", async (req, res) => {
    try {

        let data = req.body
        console.log(data)
        let hireDatabase = new hireData({
            name: req.body.username,
            email: req.body.useremail,
            phone: req.body.usernumber,
            project: req.body.projectname,
            projectTech: req.body.projecttech,
            projectDisc: req.body.dic
        });
        let hirepageData = await hireDatabase.save();
        let rendered = res.render("thanks")
         await console.log("sending mail....")        
        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            service: 'gmail',
            auth: {
                user: 'webscapepvt@gmail.com',
                pass: 'aznzklpzwqdllptw'
            }
        });

        var mailOptions = {
            from: 'webscapepvt@gmail.com',
            to: `${req.body.useremail}`,
            subject: 'Thanks For Choosing Us',
            text: `Hello, ${req.body.username}`,
            html: '<h1 style="color:green">Thanks For Showing Interest <br> Our Team Contact You Soon</h1>'
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log(`email send to ${req.body.useremail}`)
                console.log('Email sent: ' + info.response)
            }
        })
    }
    catch (error) {
        console.log(error)
    }


});
app.post("/signup", async (req, res) => {
    console.log(req.body)
    let usersdata = new user({
        username: req.body.username,
        password: req.body.password
    })
    const token = await usersdata.gentoken();
    console.log(token)
    res.cookie("jwt",token,{
        httpOnly:true,
        expires: new Date(Date.now()+600000)
    }); 
    // console.log(Cookie);
    let users = await usersdata.save();
    console.log(`the users data ${users}`)
    let rendered = res.redirect("/login")
})
app.post("/login", async function (req, res) {
    try {
        const usersname = req.body.username;
        const upassword = req.body.password;
      const userid =  await user.findOne({username:usersname});
      const ismatch = await bcrypt.compare(upassword,userid.password);
      const token = await userid.gentoken();
      console.log(`token is ${token}`)
      res.cookie("jwt",token,{
        httpOnly:true,
        expires: new Date(Date.now()+600000)

        // secure:true
    });

       if(ismatch){
        res.status(201).redirect("/")
       }else{
        res.send("Invaild Login Details!!")
       }

        // console.log(`${usersname} and passward is ${upassword}`)
    } catch (error) {
        res.status(400).send(error);
    }
});
app.get("*", (req, res) => {
    res.render("404")
})

// listening to port

app.listen(port, (err) => {
    if (err) {
        console.log(`->Enable to Start Server ${err}`);
    } else {
        console.log(`->Listening to the port ${port}`)
    }
})