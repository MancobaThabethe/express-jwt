const User = require('../model/User')

const getAllUsers = async (req, res) => {
    const Users = await User.find()
    if(!Users) return res.status(204).json({msg: 'No users found'})
    res.json(Users);
}

const updateUser = async (req, res) => {
    if(req?.body.id) return res.status(400).json({ "message": `Employee ID parameter required` })
    
    const employee = await Employee.findOne({_id: req.body._id}).exec()
    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.body._id} not found` });
    }
    if (req.body.firstname) employee.firstname = req.body.firstname;
    if (req.body.lastname) employee.lastname = req.body.lastname;
    await employee.save()

    res.json({"message": `Employee ID ${req.body._id} details updated.` });
}

const deleteEmployee = async (req, res) => {
    if(req?.body.id) return res.status(400).json({ "message": `Employee ID parameter required` })
    const employee = await Employee.findOne({'_id': req.body._id}).exec()
    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.body._id} not found` });
    }
    
    await Employee.deleteOne({_id: req.body._id})

    res.json(data.employees);
}

const getEmployee = async(req, res) => {
    if(req?.params.id) return res.status(400).json({ "message": `Employee ID parameter required` })
        const employee = await Employee.findOne({_id: req.params.id}).exec()
    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.params.id} not found` });
    }
    res.json(employee);
}

module.exports = {
    getAllUsers,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}