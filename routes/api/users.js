const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/usersController');
const ROLES_LIST = require('../../config/roles_list')
const verifyRoles = require('../../middleware/verifyRoles')

router.route('/')
    .get(verifyRoles(ROLES_LIST.admin) , usersController.getAllUsers)
    .post(verifyRoles(ROLES_LIST.admin) ,employeesController.createNewEmployee)
    .put(verifyRoles(ROLES_LIST.admin), employeesController.updateEmployee)
    .delete(verifyRoles(ROLES_LIST.admin), employeesController.deleteEmployee);

router.route('/:id')
    .get(employeesController.getEmployee);

module.exports = router;