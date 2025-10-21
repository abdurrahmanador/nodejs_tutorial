const express=require('express');
const router=express.Router();
const path=require('path');
const employeesController=require('../../controllers/employee_controller');
const data={};
data.employees=require(path.join(__dirname,'..','..','data','employees.json'));


router.route('/')
.get(employeesController.getAllEmployees)
.post(employeesController.addNewEmployee)


router.route('/:id').get(employeesController.getEmployeeById)
.put(employeesController.updateEmployee)
.delete(employeesController.deleteEmployee);;
module.exports=router;