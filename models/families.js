const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const childSchema = new Schema({
    fID : {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    grade: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const paymentSchema = new Schema({
    fID: {
        type: String,
        required: true
    },
    September: {
        type: String,
        required: true
    },
    October: {
        type: String,
        required: true
    },
    November: {
        type: String,
        required: true
    },
    December: {
        type: String,
        required: true
    },
    January: {
        type: String,
        required: true
    },
    February: {
        type: String,
        required: true
    },
    March: {
        type: String,
        required: true
    },
    April: {
        type: String,
        required: true
    },
    May: {
        type: String,
        required: true
    }
});


const familySchema = new Schema({
    fID : {
        type: String,
        required: true,
        unique: true
    },
    paymentType: {
        type: String,
        required: true
    },
    children: [{
        fID : {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        grade: {
            type: String,
            required: true
        }
    }],
    motherFirstName: {
        type: String,
        required: true
    },
    motherLastName: {
        type: String,
        required: true
    },
    fatherFirstName: {
        type: String,
        required: true
    },
    fatherLastName: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    phoneNumber: {
        type: String,
        required: true
    },
    payments: [{
        fID: {
            type: String,
            required: true
        },
        September: {
            type: String,
            required: true
        },
        October: {
            type: String,
            required: true
        },
        November: {
            type: String,
            required: true
        },
        December: {
            type: String,
            required: true
        },
        January: {
            type: String,
            required: true
        },
        February: {
            type: String,
            required: true
        },
        March: {
            type: String,
            required: true
        },
        April: {
            type: String,
            required: true
        },
        May: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
});


var Families = mongoose.model("Family", familySchema);
var Child = mongoose.model("Child", childSchema);
var Payment = mongoose.model("Payment", paymentSchema);

module.exports = {
    Families: Families,
    Child: Child,
    Payment: Payment
}
