const express = require('express');
const app = express();
const port = 3001 || process.env.port;
const cors = require('cors');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const Userschema = require('./model/user_schema')
const Forgot_P_Token = require('./model/forgot_p_token')
const { emailtemp } = require('./utils/emailtemp');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mongoURI = "mongodb://localhost:27017/userdb";
//Mongoose Connection :-
mongoose.connect(mongoURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(() => console.log('mongoDB connected...')).catch((err) => console.log('mongoDB connection error...') + err);

app.get('/', (req, res) => {
    // console.log('Hey Home route');
    res.send('<h1>Hey Home route</h1')
});

app.post('/', (req, res) => {
    // console.log('Hey Home route');
    res.send('<h1>Hey Home route</h1')
});

app.post('/adddata', async (req, res) => {
    let bodydata = req.body;
    if (bodydata.id) {
        //Edit Data   
        // console.log('bodydata with id -> ',bodydata);
        const userfoundforedit = await Userschema.findOne({ _id: bodydata.id });
        // console.log('userfoundforedit ===  ', userfoundforedit);
        if (userfoundforedit !== undefined || userfoundforedit !== null) {
            const hashedPassword = await bcrypt.hash(bodydata.password, 8)
            userfoundforedit.firstname = bodydata.firstname;
            userfoundforedit.lastname = bodydata.lastname;
            userfoundforedit.email = bodydata.email;
            userfoundforedit.phone = bodydata.phone;
            userfoundforedit.password = hashedPassword;
            try {
                const result = await userfoundforedit.save();
                // console.log('User updated of id -> ', result.id);
                res.send({ status: true, message: `User's Info. is Updated !!!` });
            } catch (e) {
                // console.log('Error while saving user... ', e);
                res.send({ status: false, message: `Error while Updating user's Info.....` });
            }
        } else {
            res.send({ status: false, message: `User's info. not found....` });
        }

    } else {
        //Add data
        const userfound = await Userschema.findOne({ email: bodydata.email });
        // console.log('userfound ===  ', userfound);
        if (userfound === undefined || userfound === null) {

            const hashedPassword = await bcrypt.hash(bodydata.password, 8)
            let userdata = new Userschema({
                firstname: bodydata.firstname,
                lastname: bodydata.lastname,
                phone: bodydata.phone,
                email: bodydata.email,
                password: hashedPassword,
                admin: bodydata.adminoruser,
            });
            try {
                const result = await userdata.save();
                // console.log('User registered with ID ', result.id);
                res.send({ status: true, message: 'User is registered !!!' });
            } catch (e) {
                // console.log('Error while saving user... ', e);
                res.send({ status: false, message: 'Error while saving user....' });
            }
        } else {
            res.send({ status: false, message: 'User is already in system....' });
        }
    }

    // res.send('<h1>ok</h1>')
});

app.post('/loginuser', async (req, res) => {
    // console.log('Bodydata ==> ', req.body);
    let bodydata = req.body;

    const userfound = await Userschema.findOne({ email: bodydata.email });
    // console.log('userfound ===  ', userfound);
    if (userfound !== undefined && userfound !== null) {
        // console.log('User not undefined or null');
        const passwordmatch = await bcrypt.compare(bodydata.password, userfound.password);
        if (passwordmatch) {
            let userid = userfound._id;
            res.send({ status: true, message: 'Logged In !!!', userid: userid });
        } else {
            res.send({ status: false, message: 'Password is wrong !!!' });
        }
    } else {
        // console.log('User either undefined or null');
        res.send({ status: false, message: 'User is not in system, kindly register First !!!' });
    }

    // res.send('<h1>ok</h1>')
});

app.get('/logged-in-user-data', async (req, res) => {
    let params = req.query;
    if (params.userid !== undefined && params.userid !== null && params.userid !== '') {
        try {
            let userfound = await Userschema.findById(params.userid);
            let valueSend = {
                firstname: userfound.firstname,
                lastname: userfound.lastname,
                email: userfound.email,
                phone: userfound.phone,
                password: userfound.password,
                admin: userfound.admin,
            };
            // console.log('userfound = = = = = ', valueSend);
            res.send({ status: true, message: 'LoggedIn User found !!!', loggedinuser: valueSend });
        } catch (error) {
            res.send({ status: false, message: `Error while finding User's detail !!!` });
        }
    } else {
        res.send({ status: false, message: `User id isn't found from params !!!` });
    }
});

app.get('/all-user-data', async (req, res) => {
    try {
        let allusers = await Userschema.find();
        let alluserfound = [];
        allusers.map((val, index) => {
            let alluserobj = {};
            alluserobj.firstname = val.firstname;
            alluserobj.lastname = val.lastname;
            alluserobj.phone = val.phone;
            alluserobj.email = val.email;
            alluserobj.createdAt = val.createdAt;
            alluserfound.push(alluserobj);
        });
        // console.log('alluserfound = = = = = ', alluserfound);
        res.send({ status: true, message: 'All User found !!!', alluserfound });
    } catch (error) {
        res.send({ status: false, message: `Error while finding User's detail !!!` });
    }

});

app.post('/forgot-password', async (req, res) => {
    let bodydata = req.body;
    if (bodydata.email === '') {
        res.send({ status: false, message: `email required !!!` });
    }
    try {

        const userfound = await Userschema.findOne({ email: bodydata.email });
        if (!userfound)
            return res.send({ status: false, message: `User is not in system !!!` });


        let token = await Forgot_P_Token.findOne({ userId: userfound._id });

        if (!token) {
            token = await new Forgot_P_Token({
                userId: userfound._id,
                token: crypto.randomBytes(20).toString("hex"),
            }).save();
        }

        // Mail Sender Details :-
        const traspoter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'jay.bvminfotech@gmail.com',
                pass: 'bvm@12345',
            }
        })

        const mailOptions = {
            from: 'jay.bvminfotech@gmail.com',
            to: `${userfound.email}`,
            subject: 'Sending Email For Reset Password',
            html: emailtemp(userfound._id, token.token)
        };

        // console.log('Sending Emai ....');

        traspoter.sendMail(mailOptions, (err, data) => {
            if (err) {
                // console.log('Error while sending mail');
            } else {
                // console.log("Reset Pssword mail sent....")
                res.send({ status: true, message: `Reset password Link has been sent to your email, checkout the email` });
            }
        })
    } catch (error) {
        res.send({ status: false, message: `Error in Foegot password ` });

    }


})

app.post('/reset-password/:userId/:token', async (req, res) => {
    let bodydata = req.body;
    let parameter = req.query;
    // console.log('Reset pssword body -->  ',bodydata);
    // console.log('Reset pssword body -->  ',parameter);
    try {
        const userfound = await Userschema.findById(parameter.userId);
        if (!userfound) return res.send({ status: false, message: `invalid link or expired ` });

        const token = await Forgot_P_Token.findOne({
            userId: userfound._id,
            token: parameter.token,
        });

        if (!token) return res.send({ status: false, message: `invalid link or expired ` });

        if (bodydata.password === bodydata.confirmpassword) {
            userfound.password = bodydata.password;
            await userfound.save();
            await token.delete();
        }

        res.send({ status: true, message: "password reset sucessfully." });

    } catch (error) {
        res.send({ status: false, message: `Error in Reset password ` });

    }
})

app.post('/reset-password-admin', async (req, res) => {
    let bodydata = req.body;
    console.log('Reset pssword in admin body -->  ', bodydata);
    try {
        const userfound = await Userschema.findById(bodydata.userId);
        if (!userfound) return res.send({ status: false, message: `Invalid User` });

        // console.log('userfound -=-=-> ',userfound);

        const passwordmatch = await bcrypt.compare(bodydata.currentPassword, userfound.password);

        console.log('passwordmatch - - - ', passwordmatch);

        if (passwordmatch === false) return res.send({ status: false, message: "Current Password is wrong" });


        if (passwordmatch) {
            if (bodydata.newPassword === bodydata.confirmNewPassword) {
                const hashedPassword = await bcrypt.hash(bodydata.newPassword, 8)
                userfound.password = hashedPassword;
                await userfound.save();
                return res.send({ status: true, message: "password reset sucessfully." });
            }else{                
                return res.send({ status: false, message: "New Password and New Confirm Password is not matched" });
            }
        }


    } catch (error) {
        res.send({ status: false, message: `Error, While updating Admin panel Reset password ` });

    }
})




app.listen(port, () => {
    console.log(`Server connected at http://localhost:${port} `);
});
