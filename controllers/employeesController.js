const Employee = require('../model/Employee')

const getAllEmployees = async (req, res) => {
    const Employees = await Employee.find()
    if(!Employees) return res.sendStatus(204).json({msg: 'No employees found'})
    res.json(Employees);
}

const createNewEmployee = async (req, res) => {
    const newEmployee = {
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }

    if (!newEmployee.firstname || !newEmployee.lastname) {
        return res.status(400).json({ 'message': 'First and last names are required.' });
    }

    await Employee.create(newEmployee)
    
    res.status(201).json({ 'success': `New employee ${newEmployee.firstname} created!` });
}

const updateEmployee = async (req, res) => {
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
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}