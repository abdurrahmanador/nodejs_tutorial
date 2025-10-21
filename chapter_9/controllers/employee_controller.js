const express=require('express');
const router=express.Router();
const path=require('path');
const { param } = require('../routes/api/employees');
const data={
    employees:require(path.join(__dirname,'..','data','employees.json')),
    setEmployees: function(data){this.employees=data;}
};

const getAllEmployees=(req,res)=>{
    res.json(data.employees);
}
const addNewEmployee=(req,res)=>{
   const newEmployee={
    id:data.employees[data.employees.length-1].id+1||1,
    firstName:req.body.firstName,
    lastName:req.body.lastName,
   }
   if(!newEmployee.firstName || !newEmployee.lastName){
    return res.status(400).json({'message':"First,Last Name Required"})
   }
   data.setEmployees([...data.employees,newEmployee]);
   res.json(data.employees);
}

const deleteEmployee=(req,res)=>{
    const id=parseInt(req.params.id);
    const employee=data.employees.find(empl=>empl.id===id);
    if (!employee) {
        return res.status(404).json({ message: `Employee with ID ${id} not found.` });
    }
    const updateEmployee=data.employees.filter(emp=>emp.id!==id);
    data.setEmployees(updateEmployee);
  res.json({ message: `Employee with ID ${id} deleted successfully.` });
}

const updateEmployee = (req, res) => {
  const id = parseInt(req.params.id);
  const { firstName, lastName } = req.body;

  const employee = data.employees.find(emp => emp.id === id);
  
  if (!employee) {
    return res.status(404).json({ message: `Employee with ID ${id} not found.` });
  }

  // Update only fields that are provided
  if (firstName) employee.firstName = firstName;
  if (lastName) employee.lastName = lastName;

  // Update the in-memory employees array
  const updatedEmployees = data.employees.map(emp =>
    emp.id === id ? { ...emp, firstName: employee.firstName, lastName: employee.lastName } : emp
  );

  data.setEmployees(updatedEmployees.sort((a,b)=>a.id>b.id?1:a.id<b.id?-1:0));
  res.json({ message: "Employee updated successfully", employee });
};

const getEmployeeById = (req, res) => {
  const id = parseInt(req.params.id);
  const employee = data.employees.find(emp => emp.id === id);

  if (!employee) {
    return res.status(404).json({ message: `Employee with ID ${id} not found.` });
  }

  res.json(employee);
};

module.exports={
    getAllEmployees,
    addNewEmployee,
    deleteEmployee,
    updateEmployee,
    getEmployeeById
}