const { response } = require("express");
const express = require("express");
const router = express.Router();
require('dotenv').config();
require('../db/conn');

const Customer = require('../model/customer');
router.get('/', (req, res) => {
    res.send("Home Page");
});
router.get('/Customers', async (req, res) => {
    try {
        const response = await Customer.find({});
        res.send(response);
    } catch (error) {
        console.log(error);
    }
})
router.post('/Customers', async (req, res) => {
    const { id, money_val } = req.body;
    const ownerresp = await Customer.findOne({ email: "parth@gmail.com" });
    const resp = await Customer.findOne({ email: id });
    if (!resp) {
        return res.status(409).json({ error: "Email already exist" });
    }
    else {
        try {
            const ownerval = (ownerresp.balance - money_val);
            const val = (resp.balance + Number(money_val));
            const updateOwner = await Customer.updateOne({ email: "parth@gmail.com" }, { $set: { balance: ownerval } });
            const update = await Customer.updateOne({ email: id }, { $set: { balance: val } });
            if (updateOwner && update) {
                return res.status(200).json({ error: "updated" });
            }
        } catch (error) {
            console.log(error);
        }
    }
})
/*router.get('/register', (req, res) => {
    res.send("REGISTER");
});
router.post('/register', (req, res) => {
    const { firstname, lastname, email, phonenumber } = req.body;
    const accounttype = "unverified";

    // GENERATE 6 DIGIT CODE FOR VERIFICATION PURPOSE
    let digits = '0123456789';
    let vcode = '';
    for (let i = 0; i < 6; i++) {
        vcode += digits[Math.floor(Math.random() * 10)];
    }

    if (!firstname || !lastname || !email || !phonenumber) {
        return res.status(422).json({ error: "All the fields are required" });
    }
    userRegistration.findOne({ email: email })
        .then((userExist) => {
            if (userExist) {
                return res.status(409).json({ error: "Email already exist" });
            }
            const registration = new userRegistration({ firstname, lastname, email, phonenumber, accounttype, vcode });

            registration.save().then(() => {
                res.status(201).json({ message: "Successful Registration" });

                let mailTransporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAILID,
                        pass: process.env.EMAILID_PASSWORD
                    }
                });

                const message = `${process.env.BASE_URL}/verifyregistration/${vcode}`;

                let mailDetails = {
                    from: process.env.EMAILID,
                    to: email,
                    subject: 'Account Verification Required',
                    text: `Welcome to Feelit ${firstname} ${lastname} below is your account verification link ${message}`,
                };
                mailTransporter.sendMail(mailDetails, function (err, data) {
                    if (err) {
                        console.log("An error accure");
                    } else {
                        return res.status("Email Sent");
                        console.log('Email sent successfully');
                    }
                });
            }).catch((err) => {
                res.status(500).json({ error: "Registration Failed" });
                console.log(err);
            });
        }).catch(err => { console.log(err) });
});
router.get('/verifyregistration/:vcode', async (req, res) => {
    try {
        const user = await userRegistration.findOne({ vcode: req.params.vcode });
        if (!user) {
            return res.status(400).send("please register");
        }
        if (user.accounttype == "verified") {
            res.send("Email Already Verified")
        }
        else {
            const resp = await userRegistration.updateOne({
                vcode: req.params.vcode
            },
                { $set: { accounttype: "verified" } });


            res.send("ACCOUNT VERIFIED SUCCESSFULLY");
        }
    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
});*/
module.exports = router;