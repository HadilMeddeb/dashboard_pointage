import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField'
import {TextareaAutosize,Button}  from '@material-ui/core'

import "./AddEmployee.css";

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
}));

function AddEmployee()
{
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return(<div className="AddEmployee-container">

<Typography variant="subtitle1" gutterBottom>
        personal info 
      </Typography>
      <div className={classes.container}>
        <div style={{ gridColumnEnd: 'span 12' }}>
        <input type="file" id="myfile" name="myfile"/>
        </div>
        <div style={{ gridColumnEnd: 'span 4' }}>
        <TextField  style={{width:"100%"}} id="outlined-basic" label="email" type="email"variant="outlined" />
        </div>
        <div style={{ gridColumnEnd: 'span 4' }}>
        <TextField  style={{width:"100%"}}  id="outlined-basic" label="password"  type="password" variant="outlined" />
        </div>
        <div style={{ gridColumnEnd: 'span 4' }}>
        <TextField  style={{width:"100%"}} id="Fullname" label="Fullname" variant="outlined" />
        </div>
        <div style={{ gridColumnEnd: 'span 4' }}>
        <TextField  style={{width:"100%"}} id="outlined-basic" label="email" type="email"variant="outlined" />
        </div>
        <div style={{ gridColumnEnd: 'span 4' }}>
        <TextField  style={{width:"100%"}}  id="outlined-basic" label="password"  type="password" variant="outlined" />
        </div>
        <div style={{ gridColumnEnd: 'span 4' }}>
        <TextField  style={{width:"100%"}} id="Fullname" label="Fullname" variant="outlined" />
        </div>
      </div>
      <br/>
      <Divider className={classes.divider} />
      <br/>
      <Typography variant="subtitle1" gutterBottom>
        contact info
      </Typography>

      <div className={classes.container}>
        <div style={{ gridColumnEnd: 'span 4' }}>
        <TextField  style={{width:"100%"}} id="outlined-basic" label="school" variant="outlined" />
        </div>
        <div style={{ gridColumnEnd: 'span 4' }}>
        <TextField  style={{width:"100%"}}  id="outlined-basic" label="field of study" variant="outlined" />
        </div>
        <div style={{ gridColumnEnd: 'span 4' }}>
        <TextField  style={{width:"100%"}} id="outlined-basic" label="degree" variant="outlined" />
        </div>
        <div style={{ gridColumnEnd: 'span 12' }}>
        <TextareaAutosize aria-label="Description" minRows={3} placeholder="Description "  style={{width:"100%",outline:"none",padding:"10px"}}/>
        </div>
        <div style={{ gridColumnEnd: 'span 3' }}>
        <TextField
        id="date"
        label="from"
        type="date"
        defaultValue="2017-05-24"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
        </div>
        <div style={{ gridColumnEnd: 'span 3' }}>
        <TextField
        id="date"
        label="to"
        type="date"
        defaultValue="2017-05-24"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
        </div>
        <div style={{ gridColumnEnd: 'span 12'}}>
        <Button variant="outlined">ADD</Button>
        </div>
      </div>

      <Divider className={classes.divider} />
      <Typography variant="subtitle1" gutterBottom>
        Education
      </Typography>

      <div className={classes.container}>
        <div style={{ gridColumnEnd: 'span 4' }}>
        <TextField  style={{width:"100%"}} id="outlined-basic" label="school" variant="outlined" />
        </div>
        <div style={{ gridColumnEnd: 'span 4' }}>
        <TextField  style={{width:"100%"}}  id="outlined-basic" label="field of study" variant="outlined" />
        </div>
        <div style={{ gridColumnEnd: 'span 4' }}>
        <TextField  style={{width:"100%"}} id="outlined-basic" label="degree" variant="outlined" />
        </div>
        <div style={{ gridColumnEnd: 'span 12' }}>
        <TextareaAutosize aria-label="Description" minRows={3} placeholder="Description "  style={{width:"100%",outline:"none",padding:"10px"}}/>
        </div>
        <div style={{ gridColumnEnd: 'span 3' }}>
        <TextField
        id="date"
        label="from"
        type="date"
        defaultValue="2017-05-24"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
        </div>
        <div style={{ gridColumnEnd: 'span 3' }}>
        <TextField
        id="date"
        label="to"
        type="date"
        defaultValue="2017-05-24"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
        </div>
        <div style={{ gridColumnEnd: 'span 12'}}>
        <Button variant="outlined">ADD</Button>
        </div>
      </div>


      <Divider className={classes.divider} />
      <Typography variant="subtitle1" gutterBottom>
        soft skills
      </Typography>




  </div>);
}
export default AddEmployee;
