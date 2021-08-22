import React from 'react';
import { TiGroup} from "react-icons/ti";
import {Link} from 'react-router-dom';
import {MdDelete} from 'react-icons/md'
import { FaPen} from 'react-icons/fa'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import './Departements.css';
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
            departements:[],
            newDepartementName:"",
            newDepartementFunction:""


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

async deleteDepartement(id)
{
    
    await axios.delete("http://localhost:4000/departements/"+id).then((res)=>{   
          this.fetchDepartements();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'departement deleted successfully',
            showConfirmButton: false,
            timer: 1500
          })
       })
}
AddDepartement(newDepartement)
{
   console.log(newDepartement);
   axios.post("http://localhost:4000/departements",newDepartement).then((departement)=>{
   Swal.fire({
    position: 'center',
    icon: 'success',
    title: "departement of "+this.state.newDepartement.name+"is added ..",
    showConfirmButton: false,
    timer: 1500
  })})
   .catch((err)=>{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: "error departement can't be added .."+err,
      footer: '<a href="">Why do I have this issue?</a>'
    }) 
  });
   this.fetchDepartements();
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
          <div className="row-content"><h2>All Departements </h2><a href="#AddDepartement" className="styled-btn">Add Departement</a></div>
          <table>
             <thead>
             <tr>
                  <th>Departement</th>
                  <th>number Employees</th>
                  <th>Specialization</th>
                  <th>Actions</th>
               
              </tr>
             </thead>
              <tbody>
              {
                
                     this.state.departements.map((row)=>{return <tr key={row._id}>
                    <td>{row.name}</td>
                    <td>{row.employees.length}</td>
                    <td>{row.fonction}</td>
                    
                    <td>
                        <Link to={`/sendmail/${row.email}`}><FaPen className="mg-rg icon "/></Link>
                         <MdDelete className="icon"onClick ={()=>{this.deleteDepartement(row._id)}}/>
                    </td>
                  
                </tr>})
            }
              </tbody>
 
 
          </table>
 
        </div>
        <div id="AddDepartement">
       
      <Typography variant="h6" gutterBottom>
        Add New Departement
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField onChange={(event)=>{this.setState({newDepartementName:event.target.value})}} required id="cardName" label="Departement name" fullWidth autoComplete="cc-name" />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
          onChange={(event)=>{this.setState({newDepartementFunction:event.target.value})}}
            required
            id="cardNumber"
            label="specialization"
            fullWidth
            autoComplete="cc-number"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="expDate" label="number employees" disabled defaultValue="0" fullWidth autoComplete="cc-exp" />
        </Grid>
        
       <Button 
        onClick={
           ()=>{this.AddDepartement(
               { name:this.state.newDepartementName,
                 fonction:this.state.newDepartementFunction}
               )}}>Add</Button>
      </Grid>
 
        </div>
        
    </div>
 );
}

} 
export default Employees;