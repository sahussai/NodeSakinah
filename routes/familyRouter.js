const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const models = require('../models/families');
const Test = require("../models/child")


const Families = models.Families;
const Child = models.Child;
const Payment = models.Payment;



const familyRouter = express.Router();



familyRouter.use(bodyParser.json());
familyRouter.use(bodyParser.urlencoded({ extended: true }));


familyRouter.route("/")
.get((req,res,next) => {
    Families.find({})
    .then((families) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(families);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    //console.log(req.body);
    // Families.create(req.body)
    // .then((family) => {
    //     console.log('User Created ', family);
    //     res.statusCode = 200;
    //     res.setHeader('Content-Type', 'application/json');
    //     res.json(family);
    // }, (err) => next(err))
    // .catch((err) => next(err));
    var jsonObject = {
        firstName: `${req.body.firstName}`,
        lastName: `${req.body.lastName}`
    };

    var childObject = new Child({
        fID : `${req.body.childfID}`,
        firstName: `${req.body.childfirstName}`,
        lastName: `${req.body.childlastName}`,
        grade: `${req.body.childgrade}`
    });

    var paymentObject = new Payment({
            fID: `${req.body.paymentfID}`,
            September: `${req.body.september}`,
            October: `${req.body.october}`,
            November: `${req.body.november}`,
            December: `${req.body.december}`,
            January: `${req.body.january}`,
            February: `${req.body.february}`,
            March: `${req.body.march}`,
            April: `${req.body.april}`,
            May: `${req.body.may}`
    });

    // console.log('Child Object:',childObject);
    // console.log('Payment Object:',paymentObject);


    // childObject.save()
    // .then((test) => {
    //     console.log('Child Created ', test);
    //     res.statusCode = 200;
    //     res.setHeader('Content-Type', 'application/json');
    //     tempChild = test;
    //     //res.json(test);
    // }, (err) => next(err))
    // .catch((err) => next(err));


    // paymentObject.save()
    // .then((test) => {
    //     //console.log('Payment Created ', test);
    //     res.statusCode = 200;
    //     res.setHeader('Content-Type', 'application/json');
    //     //res.json(test);
    //     tempPayment = test; 
    // }, (err) => next(err))
    // .catch((err) => next(err));

    var realjsonObject = new Families({
        fID: `${req.body.fID}`,
        paymentType: `${req.body.paymentType}`,
        children: [childObject],
        motherFirstName: `${req.body.motherFirstName}`,
        motherLastName: `${req.body.motherLastName}`,
        fatherFirstName: `${req.body.fatherFirstName}`,
        fatherLastName: `${req.body.fatherLastName}`,
        email: `${req.body.email}`,
        phoneNumber: `${req.body.phoneNumber}`,
        payments: [paymentObject]
    });
    console.log('req body:',realjsonObject);
    realjsonObject.save()
    .then((test) => {
        console.log('realjsonObject Created ', test);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(test);
    }, (err) => next(err))
    .catch((err) => next(err));

})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /families");
})
.delete((req, res, next) => {
    Families.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

familyRouter.route("/:familyID")
.get((req,res,next) => {
    Families.findById(req.params.familyID)
    .then((family) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(family);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /families/'+ req.params.familyID);
})
.put((req, res, next) => {
    Families.findByIdAndUpdate(req.params.familyID, {
        $set: req.body
    }, { new: true })
    .then((family) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(family);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Families.findByIdAndRemove(req.params.familyID)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = familyRouter;