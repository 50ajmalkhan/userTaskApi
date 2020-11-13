const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const statusSchema = new mongoose.Schema({

    status: {
        type: String,
        required: true,
        trim: true,
        index: true,

    }
    ,

    parentId:
        { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true, index: true, },

}, { timestamps: true });

statusSchema.plugin(uniqueValidator, {
    type: 'mongoose-unique-validator',
    message: 'Error, expected {PATH} to be unique.'
});
module.exports = mongoose.model('Status', statusSchema);


