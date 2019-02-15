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
    var jsonObject = {
        firstName: `${req.body.firstName}`,
        lastName: `${req.body.lastName}`
    };

    var childObject1 = new Child({
        fID : `56542`,//`${req.body.fID}`,
        firstName: `${req.body.childfirstName1}`,
        lastName: `${req.body.childlastName1}`,
        grade: `${req.body.childgrade1}`
    });

    var childObject2 = new Child({
        fID : `${req.body.fID}`,
        firstName: `${req.body.childfirstName2}`,
        lastName: `${req.body.childlastName2}`,
        grade: `${req.body.childgrade2}`
    });
    var childObject3 = new Child({
        fID : `${req.body.fID}`,
        firstName: `${req.body.childfirstName3}`,
        lastName: `${req.body.childlastName3}`,
        grade: `${req.body.childgrade3}`
    });
    var childObject4 = new Child({
        fID : `${req.body.fID}`,
        firstName: `${req.body.childfirstName4}`,
        lastName: `${req.body.childlastName4}`,
        grade: `${req.body.childgrade4}`
    });

    var paymentObject = new Payment({
            fID: `${req.body.fID}`,
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

    var realjsonObject = new Families({
        fID: `${req.body.fID}`,
        paymentType: `${req.body.paymentType}`,
        children: [childObject1, childObject2, childObject3, childObject4],
        motherFirstName: `${req.body.motherFirstName}`,
        motherLastName: `${req.body.motherLastName}`,
        fatherFirstName: `${req.body.fatherFirstName}`,
        fatherLastName: `${req.body.fatherLastName}`,
        email: `${req.body.email}`,
        phoneNumber: `${req.body.phoneNumber}`,
        payments: [paymentObject]
    });
    console.log('req body:',req.body);
    console.log('realjsonObject:',realjsonObject);
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