const User = require('../models/user');
const Task = require('../models/task');
const NodeRSA = require('node-rsa');

// const createCategory = async (userss) => {
//     console.log(userss)
//     let category = [userss]
//     let categoryList = []
//     for (let cate of category) {
//         console.log("this is cate id" + cate._id)
//         var ad = await children(cate._id);
//         console.log("come from function " + ad)
//         categoryList.push({
//             _id: cate._id,
//             firstName: cate.firstName,
//             lastName: cate.lastName,
//             email: cate.email,
//             password: cate.password,
//             userName: ad
//         })


//     }

//     console.log(JSON.stringify(categoryList))
//     return categoryList;

// }
// const children = async (parentid) => {

//     let taskDetail = await Task.findOne({ "parentId": parentid })

//     return (taskDetail.task)

// }

exports.detailTask = (req, res) => {



    Task.find({}).populate('parentId').populate('childId')
        .exec((error, user) => {
            if (user) {
                res.status(200).json({ message: user });

            }
            if (error) {
                return res.status(400).json({ message: "DoesNotExist" });
            }

        })
};

exports.countTask = (req, res) => {
    console.log(req.body.parentId)
    Task.findOne({ "parentId": req.body.parentId })
        .exec((error, user) => {
            if (error) { res.status(400).json({ message: error }) }
            console.log(user)
            if (user) {
                res.status(200).json({ message: user.work.length })

            }
            else { res.status(200).json({ message: "user have not work" }) }
        });
}

// exports.nodersa = () => {

//     const key = new NodeRSA({ b: 512 });
//     console.log(key)
//     const decrypted = key.decrypt("QNa9nwCj3ZdGPZNkIlvw/PQN/B1ZfRqRK1d3fv4ztZZUQSc4bYo0Li0QbKkQaWhhB14S92L6SNcaFyTp3L3t1Q==", 'utf8');
//     console.log('decrypted: ', decrypted);
// }