const User = require('../models/user');
const Task = require('../models/task')
const env = require('dotenv').config();

exports.signup = (req, res) => {
    console.log(req.body)
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (user) {
                return res.status(200).json({ message: "User Already Registered" });
            }
            const { firstName, lastName, email, password, task } = req.body;
            const _user = new User({ firstName, lastName, email, password, userName: Math.random().toString(), task });
            _user.save((error, data) => {
                if (error) {
                    return res.status(400).json({ message: "someThing Went Wrong" });
                }
                if (data) {
                    return res.status(201).json({ message: "User Created Successfully..!" })
                }
            });
        })
};

exports.getAllUser = (req, res) => {

    User.find({})
        .exec((error, user) => {
            if (error) { res.status(400).json({ message: error }) }
            if (user) {
                res.status(200).json({ message: user })

            }
        });
}

exports.updateUser = (req, res) => {
    const { email, updatedEmail, updatedPassword } = req.body;
    const condition = { "email": email };
    const update = {
        "$set":

        {
            email: updatedEmail,
            password: updatedPassword
        },


    };
    User.findOneAndUpdate(condition, update, { new: true })

        .exec((error, _users) => {
            if (error) { return res.status(400).json({ error }) }
            if (_users) {
                return res.status(201).json({ users: "updates Successfully" })
            }
        })



};
exports.deleteUser = (req, res) => {
    const _id = req.body;

    User.deleteOne({ _id })
        .exec((error, _users) => {
            if (error) { return res.status(400).json({ error }) }
            if (_users) {
                console.log(_id, _users)
                Task.findOne({ "parentId": _id })
                    .exec((error, user) => {
                        if (error) { res.status(400).json({ message: error }) }
                        if (user) {
                            console.log(user)
                            Task.deleteOne({ "_id": user._id })
                                .exec((error, users) => {
                                    if (error) { return res.status(400).json({ error }) }
                                    if (users) {
                                        console.log(users)
                                        return res.status(201).json({ users: "Deleted Successfully" })
                                    }
                                })
                        }
                        else { return res.status(201).json({ users: "Deleted Successfully" }) }
                    });

            }
        })

}

