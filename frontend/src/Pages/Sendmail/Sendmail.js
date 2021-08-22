import React,{useState, useEffect} from 'react';
import axios from 'axios';
import {CardActions,Card,Button,CardContent,TextField,TextareaAutosize,Typography } from '@material-ui/core';
import Multiselect from 'multiselect-react-dropdown';
import './Sendmail.css';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function SendEmail() 
{
    const [employees,setEmployees]=useState([]);
    const [selectedemployees,setSelectedEmployees]=useState([]);
    const [mails,setmails]=useState([]);
    const [txt,setTxt]=useState("");
    const [sub,setSub]=useState("");
 
    

   

useEffect(()=>{
getemployees();
},[])
    

    async function  getemployees() 
    {
        const url = "http://localhost:4000/employees";
        await axios.get(url).then((res) => {  setEmployees(res.data.data) });
     
        console.log(employees);
    }



    async function send() 
    {
        
        try 
        {
            const data=
            {
                emails: mails,
                sub: sub,
                txt: txt
            }   

            console.log(data);
            await axios.post("http://localhost:4000/mail",data).then(res => { console.log(res.data) });
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `message sended to  ${mails}`,
                showConfirmButton: false,
                timer: 1500
              })

        }
        catch (err) 
        {
            console.error(err.message);
        }
    }

        return (
            <div>
                
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Card style={{ margin: "auto", padding: 20, justifyContent: "center", minWidth: 400, width: "100%", margin: 100 }} variant="outlined">
                        <Typography style={{ textAlign: "center", margin: 10 }} variant="h4" component="h2" gutterBottom> Send Mail </Typography>

                        <CardContent style={{ display: "flex", flexDirection: "column" }}>
                            <div style={{ display: "flex" }}>

                                <Multiselect
                                    className="multiSelect"
                                    options={ employees}
                                    onSelect={(lesemployees) => { setmails( lesemployees.map((user) => { return user.email }) ) }}
                                    onRemove={(lesemployees) => { setmails( lesemployees.map((user) => { return user.email }) ) }}
                                    displayValue="name"
                                    selectedValues={selectedemployees}
                                />
                            </div>

                                <TextField  style={{width:"100%",marginTop:"30px"
                                }} id="outlined-basic" label="Subject" variant="outlined"  
                                onChange={(event) => {
                                    console.log(event.target.value);
                                    setSub( event.target.value )
                                }} />

                            <TextareaAutosize aria-label="minimum height" minRows={5} className="text-message" placeholder="type text here .."
                                    onChange={(event) => {
                                    console.log(event.target.value);
                                    setTxt( event.target.value );
                                }} />
                        </CardContent>
                        <CardActions>
                            <Button onClick={send}>send</Button>
                        </CardActions>
                    </Card>
                </div>
               </div>

        );
}
