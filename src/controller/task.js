const User = require('../models/user');
const Task = require('../models/task');
const env = require('dotenv').config();

exports.addItemToCart = (req, res) => {

    User.findOne({ "_id": req.body.parentId })
        .exec((error, user) => {
            if (error) { return res.status(400).json({ error }) }
            if (user) {
                console.log(user)
                let condition, update

                condition = { "parentId": user._id };
                update = {
                    "$push": {
                        "parentID": user._id,
                        "work": req.body.work
                    }
                };
                console.log(update, condition)

                Task.findOneAndUpdate(condition, update)
                    .exec((error, user) => {
                        if (error) { return res.status(400).json({ error }) }
                        if (user) {
                            return res.status(201).json({ message: "Task Created Successfully..!" })
                        }
                        else {
                            const _task = new Task({ parentId: req.body.parentId, work: req.body.work })
                            _task.save((error, data) => {
                                if (error) {
                                    return res.status(400).json({ message: error });
                                }
                                if (data) {
                                    return res.status(201).json({ message: "Task Created Successfully..!" })
                                }
                            })
                        }
                    });



            }

        });

}


exports.updateTask = (req, res) => {
    const { taskId, updatedParent, updatedTask } = req.body;
    const condition = { "_id": taskId };
    const update = {
        "$set": {
            "parentId": updatedParent,
            "work":
            {
                ...req.body.work,
                task: updatedTask
            }
        }


    };
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

