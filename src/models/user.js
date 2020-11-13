const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const NodeRSA = require('node-rsa');
const UserSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    userName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true

    },

    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    hash_password: {
        type: String,
        require: true
    },



}, { timestamps: true });

UserSchema.virtual('password')
    .set(function (password) {

        const key = new NodeRSA({ b: 512 });
        this.hash_password = key.encrypt(password, 'base64');
    });
UserSchema.virtual('fullName')
    .get(function () {

        return `${this.firstName} ${this.lastName}`;
    });

UserSchema.methods = {
    authenticate: function (password) {
        const key = new NodeRSA({ b: 512 });
        return key.decrypt(password, 'utf8')
    }
};

UserSchema.plugin(uniqueValidator, {
    type: 'mongoose-unique-validator',
    message: 'Error, expected {PATH} to be unique.'
});
module.exports = mongoose.model('User', UserSchema); 