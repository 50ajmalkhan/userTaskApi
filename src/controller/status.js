const status = require('../models/status');
const Task = require('../models/task');

exports.addStatus = (req, res) => {

    Task.findOne({ "_id": req.body.parentId })
        .exec((error, user) => {
            if (error) { return res.status(400).json({ error }) }
            if (user) {

                const _status = new status({ status: req.body.status, parentId: req.body.parentId })
                _status.save((error, data) => {
                    if (error) { return res.status(400).json({ error }) }
                    if (data) {
                        const condition = { "_id": req.body.parentId };
                        const update = {
                            "$set":

                            {
                                "childId": data._id
                            },


                        };
                        Task.findOneAndUpdate(condition, update, { new: true })

                            .exec((error, _users) => {
                                if (error) { return res.status(400).json({ error }) }
                                if (_users) {
                                    return res.status(201).json({ users: "status created Successfully" })
                                }
                            })


                    }

                });
            }
            else {
                return res.status(201).json({ message: "parent doesnot Exit!" })
            }

        });

}
