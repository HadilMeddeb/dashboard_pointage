import React from 'react';
import { TiGroup} from "react-icons/ti";
import {Link} from 'react-router-dom';
import { MdDelete,MdEmail } from 'react-icons/md'
import { FaPen} from 'react-icons/fa'
import './Employees.css';

import axios from 'axios';
import Swal from 'sweetalert2';

class Employees extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state=
        {
            numberEmployees:0,
            numberAbscences:0,
            numberDepartements:0,
            employees:[],
            departements:[]
        }
    }    


async fetchData()
{
    await axios.get("http://localhost:4000/employees").then((res)=>{
          this.setState({employees:res.data.data});
          this.setState({numberEmployees:this.state.employees.length});  
          console.log(this.state.employees);
       })
}
async fetchDepartements()
{
    await axios.get("http://localhost:4000/departements").then((res)=>{
          this.setState({departements:res.data.data});
          this.setState({numberDepartements:this.state.departements.length});  
          console.log(this.state.departements);
       })
}

componentDidMount()
{
 this.fetchData();
 this.fetchDepartements();
} 

async deleteEmployee(id)
{
    
    await axios.delete("http://localhost:4000/employees/"+id).then((res)=>{   
          this.fetchData();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'employee deleted successfully',
            showConfirmButton: false,
            timer: 1500
          })
       })
}


render()
{
return(
    <div className="main-content-info">
        <div className="cards-container">
            <div className="card-box">
           <span>< TiGroup/></span>
           <div>
               <h2>{this.state.numberEmployees}</h2>
               <p>Number Employees</p>
           </div>
        </div>
        <div className="card-box">
           <span>< TiGroup/></span>
           <div>
               <h2>{this.state.numberAbscences}</h2>
               <p>Number Abscences</p>
           </div>
        </div>
        <div className="card-box">
           <span>< TiGroup/></span>
           <div>
               <h2>{this.state.numberDepartements}</h2>
               <p>Number Departements</p>
           </div>
        </div>
        <div className="card-box">
           <span>< TiGroup/></span>
           <div>
               <h2>{this.state.numberEmployees}</h2>
               <p>Number Employees</p>
           </div>
        </div>
        </div>
        <div className="content-pro-table">
          <div className="row-content"><h2>All Employees </h2><Link to="/EmployeesAdd" className="styled-btn">Add Employee</Link></div>
          <table>
             <thead>
             <tr>
                  <th>Fullname</th>
                  <th>email</th>
                  <th>Departement</th>
                  <th>status</th>
                  <th>Actions</th>
                  <th>view profile</th>
              </tr>
             </thead>
              <tbody>
              {
                
                     this.state.employees.map((row)=>{return <tr key={row._id}>
                    <td>{row.name}</td>
                    <td>{row.email}</td>
                    <td>{row.departement.name}</td>
                    <td>{row.status}</td>
                    <td>
                        <Link to={`/sendmail/${row.email}`}><MdEmail className="mg-rg icon"/></Link>
                        <Link to="#"><FaPen className="mg-rg icon "/></Link>
                         <MdDelete className="icon"onClick ={()=>{this.deleteEmployee(row._id)}}/>
                    </td>
                    <td ><Link to="profile:id">view profile</Link></td>
                </tr>})
            }
              </tbody>
 
 
          </table>
 
        </div>
        
    </div>
 );
}

} 
export default Employees;