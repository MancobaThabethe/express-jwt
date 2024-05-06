const User = require('../model/User')

const getAllUsers = async (req, res) => {
    const Users = await User.find()
    if(!Users) return res.status(204).json({msg: 'No users found'})
    res.json(Users);
}

const updateUser = async (req, res) => {
    if(req?.body.id) return res.status(400).json({ "message": `User ID parameter required` })
    
    const user = await User.findOne({_id: req.body._id}).exec()
    if (!user) {
        return res.status(400).json({ "message": `User ID ${req.body._id} not found` });
    }
    if (req.body.username) user.username = req.body.username;
    if (req.body.roles) user.roles = req.body.roles;
    if (req.body.password) user.password = req.body.password;
    await user.save()

    res.json({"message": `User ID ${req.body._id} details updated.` });
}

const deleteUser = async (req, res) => {
    if(req?.params.id) return res.status(400).json({ "message": `User ID parameter required` })
    const user = await User.findOne({'_id': req.params.id}).exec()
    if (!user) {
        return res.status(400).json({ "message": `User ID ${req.body.id} not found` });
    }
    
    await User.deleteOne({_id: req.params.id})
    const users = await User.find()

    res.json(users);
}

const getUser = async(req, res) => {
    if(req?.params.id) return res.status(400).json({ "message": `User ID parameter required` })
        const user = await User.findOne({_id: req.params.id}).exec()
    if (!user) {
        return res.status(400).json({ "message": `User ID ${req.params.id} not found` });
    }
    res.json(user);
}

module.exports = {
    getAllUsers,
    updateUser,
    deleteUser,
    getUser
}