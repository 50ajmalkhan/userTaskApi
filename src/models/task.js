const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const taskSchema = new mongoose.Schema({

    work: [{
        task: {
            type: String,
            required: true,
            trim: true,
            index: true,

        }
    }],

    parentId:
        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true, },




}, { timestamps: true });

taskSchema.plugin(uniqueValidator, {
    type: 'mongoose-unique-validator',
    message: 'Error, expected {PATH} to be unique.'
});
module.exports = mongoose.model('Task', taskSchema);


