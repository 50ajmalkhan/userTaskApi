const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({

    task: {
        type: String,
        required: true,
        trim: true,

    },

    parentId: {
        type: String,
        required: true,
        trim: true,

    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },



}, { timestamps: true });
module.exports = mongoose.model('Task', taskSchema);


