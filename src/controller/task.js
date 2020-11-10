const User = require('../models/user');
const Task = require('../models/task')
const env = require('dotenv').config();

exports.createTask = (req, res) => {
    console.log(req.body)
    User.findOne({ "_id": req.body.parentId })
        .exec((error, user) => {

            if (user) {
                const { parentId, task } = req.body;
                const _user = new Task({ parentId, task });
                console.log(_user)
                _user.save((error, data) => {
                    if (error) {
                        return res.status(400).json({ message: error });
                    }
                    if (data) {
                        return res.status(201).json({ message: "Task Created Successfully..!" })
                    }
                });
            }
            if (error) {
                return res.status(400).json({ message: "parentDoesNotExist" });
            }

        })
};
exports.updateTask = (req, res) => {
    const { taskId, updatedParent, updatedTask } = req.body;
    const condition = { "_id": taskId };
    const update = {
        "$set":

        {
            parentId: updatedParent,
            task: updatedTask
        },


    }; bbb
    console.log(condition, update)
    Task.findOneAndUpdate(condition, update, { new: true })

        .exec((error, _users) => {
            if (error) { return res.status(400).json({ error }) }
            if (_users) {
                return res.status(201).json({ users: "updates Successfully" })
            }
        })



};
exports.getTask = (req, res) => {
    console.log(req.user)
    Task.find({ user: req.parent_id })
        .exec((error, user) => {
            if (error) { res.status(400).json({ message: error }) }
            if (user) {
                res.status(200).json({ message: user })

            }
        });
}

