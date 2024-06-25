import mongoose from "mongoose";
const UserSchema  = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 100,
        },
        email: {
            type: String,
            required: true,
            max: 100,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 5,
        },
        gender: {
            type: String,
            enum: ['men', 'women'], 
            required: true
        },
        measurements: {
            type: Map,
            of: new mongoose.Schema({
                men: {
                    chest: Number,
                    neck: Number,
                    sleeve: Number,
                    waist: Number,
                    inseam: Number,
                    ring: Number
                },
                women: {
                    bust: Number,
                    waist: Number,
                    hip: Number,
                    ring: Number
                }
            }, { _id: false }) // _id: false prevents creating an _id for the subdocument
        }, 
        picturePath: {
            type: String,
            default: "",
        },
        following: {
            type: Array, 
            default: [],
        },
        seenHistory: {
            type: Array, 
            default: [],
        },
        wishlist: {
            type: Array, 
            default: [],
        },
        purchaseHistory: {
            type: Array, 
            default: [],
        },
        shoppingCart: {
            type: Array, 
            default: [],
        }, 
        address: String,
        occupation: String,
        viewedProfile: Number, 
        impressions: Number,
    }, {timestamps: true}
); 

const User = mongoose.model("User", UserSchema);
